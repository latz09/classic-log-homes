// /pages/api/submitContactForm.js
import { Resend } from 'resend';
import { sanityClient } from '@/utils/cms/sanityConnection';
import { clientConfig } from '@/utils/email-configuration/client-config/clientConfig';
import ClientNotificationEmail from '@/components/lib/emails/ClientNotificationEmail';
import AutoResponseEmail from '@/components/lib/emails/AutoResponseEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		res.setHeader('Allow', ['POST']);
		return res.status(405).end(`Method ${req.method} Not Allowed`);
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

	const emailsToSend = [
		resend.emails.send({
			from: `${clientConfig.branding.name} Website <forms@mail.latzwebdesign.com>`,
			to: process.env.CLIENT_EMAIL,
			replyTo: formData.email,
			subject: clientConfig.messaging.clientEmailSubject(formData.name),
			react: (
				<ClientNotificationEmail
					branding={clientConfig.branding}
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
						branding={clientConfig.branding}
						fields={clientConfig.formFields}
						formData={formData}
						messaging={clientConfig.messaging}
						timestamp={timestamp}
					/>
				),
			}),
		);
	}

	const emailPromise = Promise.all(emailsToSend).catch((error) => {
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
