// /pages/api/submitContactForm.js
import { Resend } from 'resend';
import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from '@/utils/cms/sanityConnection';
import { clientConfig } from '@/utils/email-configuration/client-config/clientConfig';
import ClientNotificationEmail from '@/components/lib/emails/ClientNotificationEmail';
import AutoResponseEmail from '@/components/lib/emails/AutoResponseEmail';

const resend = new Resend(process.env.RESEND_API_KEY);
const builder = imageUrlBuilder(sanityClient);

async function getBranding() {
	try {
		const settings = await sanityClient.fetch(
			`*[_type == "siteSettings"][0]{ emailLogo }`,
		);

		if (settings?.emailLogo) {
			return {
				...clientConfig.branding,
				logoUrl: builder.image(settings.emailLogo).width(180).url(),
			};
		}
	} catch (err) {
		console.error('Error fetching email logo from Sanity:', err);
	}

	// No emailLogo set in the CMS, or the fetch failed — use the hardcoded default
	return clientConfig.branding;
}

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		res.setHeader('Allow', ['POST']);
		return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	// Honeypot check — real visitors never see or fill this field.
	if (req.body.website) {
		try {
			await sanityClient.create({
				_type: 'contactForm',
				name: req.body.name || 'Not provided',
				email: req.body.email || 'Not provided',
				phoneNumber: req.body.phoneNumber || 'Not provided',
				floorPlan: req.body.floorPlan || 'Not provided',
				description: req.body.description || 'Not provided',
				projectType: req.body.projectType || 'Not provided',
				isSpam: true,
				sentAt: new Date().toISOString(),
			});
		} catch (sanityError) {
			console.error('Error logging spam submission:', sanityError);
		}

		// Return a normal success so bots don't learn they were caught and adapt.
		return res
			.status(200)
			.json({ success: true, message: 'Form submitted successfully' });
	}

	const requiredFields = clientConfig.formFields.filter((f) => f.required);
	const missingFields = requiredFields.filter((f) => !req.body[f.name]);

	if (missingFields.length > 0) {
		return res.status(400).json({
			success: false,
			message: `Missing required fields: ${missingFields.map((f) => f.label).join(', ')}`,
		});
	}

	const formData = {};
	clientConfig.formFields.forEach((field) => {
		formData[field.name] = req.body[field.name] || 'Not provided';
	});

	const timestamp = new Intl.DateTimeFormat('en-US', {
		timeZone: 'America/Chicago',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: true,
	}).format(new Date());

	const branding = await getBranding();

	const emailsToSend = [
		resend.emails.send({
			from: `${clientConfig.branding.name} Website <forms@mail.latzwebdesign.com>`,
			to: process.env.CLIENT_EMAIL,
			replyTo: formData.email,
			subject: clientConfig.messaging.clientEmailSubject(formData.name),
			react: (
				<ClientNotificationEmail
					branding={branding}
					fields={clientConfig.formFields}
					formData={formData}
					timestamp={timestamp}
				/>
			),
		}),
	];

	if (clientConfig.features?.autoResponseEmail) {
		emailsToSend.push(
			resend.emails.send({
				from: `${clientConfig.branding.name} <forms@mail.latzwebdesign.com>`,
				to: formData.email,
				replyTo: clientConfig.branding.contactInfo.email,
				subject: clientConfig.messaging.autoResponseSubject(formData.name),
				react: (
					<AutoResponseEmail
						branding={branding}
						fields={clientConfig.formFields}
						formData={formData}
						messaging={clientConfig.messaging}
						timestamp={timestamp}
					/>
				),
			}),
		);
	}

	const emailPromise = Promise.all(emailsToSend)
		.then((results) => {
			results.forEach((result, i) => {
				if (result.error) {
					console.error(`Email ${i} failed to send:`, result.error);
				}
			});
		})
		.catch((error) => {
			console.error('Error sending emails:', error);
		});

	let sanityResult = null;
	try {
		sanityResult = await sanityClient.create({
			_type: 'contactForm',
			...formData,
			sentAt: new Date().toISOString(),
		});
	} catch (sanityError) {
		console.error('Error storing data in Sanity:', sanityError);
	}

	await emailPromise;

	return res.status(200).json({
		success: true,
		message: sanityResult
			? 'Form submitted successfully'
			: 'Form submitted successfully, but encountered an error storing data.',
		data: sanityResult,
	});
}