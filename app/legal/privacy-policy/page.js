import NavigationContainer from '@/components/layout/navigation/NavigationContainer';
import { fetchSeoSettings } from '@/utils/cms/fetchSeoSettings';

// Have counsel review before launch. This is a professional template, not legal advice.

// ---- Static config (edit here) ----
const effectiveDate = 'August 1, 2026'; // TODO: confirm actual launch / DNS cutover date
const businessLocation = 'Wisconsin, United States';
const contactPhone = '(715) 887-2550';
// -----------------------------------

const linkClass = 'font-semibold underline text-[#CFA240] hover:opacity-80';

export default async function PrivacyPolicy() {
	const seo = await fetchSeoSettings();
	const businessName = seo?.businessName ?? 'Classic Log Homes, Inc.';
	const contactEmail = seo?.contactEmail ?? 'classicloghomes@gmail.com';

	return (
		<>
			<NavigationContainer />

			<section className='pt-6 lg:pt-10 3xl:pt-12 px-[1.5rem]'>
				<article className='max-w-[64rem] mx-auto'>
					<h1 className='mb-[1rem]'>Privacy Policy</h1>

					<p className='text-paragraph-sm mb-[2rem]'>
						Effective date: {effectiveDate}
					</p>

					<p className='text-paragraph mb-[1rem]'>
						{businessName} respects your privacy. This policy explains what
						information we collect when you use our website, why we collect it,
						how we handle it, and the choices you have. We keep this simple on
						purpose &mdash; we collect only what we need to answer your
						questions and quote log home packages.
					</p>

					<p className='text-paragraph-sm mb-[3rem]'>
						NOTE: This policy covers this website only. It does not cover
						information you share with us in person at our showroom, by phone,
						or by text message outside of the site.
					</p>

					<h4 className='mb-[0.75rem]'>1. Information We Collect</h4>
					<ul className='text-paragraph mb-[2rem] space-y-[0.5rem] list-disc pl-[1.25rem]'>
						<li>
							<strong>Contact form information.</strong> When you submit our
							contact form, we collect the details you provide &mdash; typically
							your name, email address, phone number, and whatever you tell us
							about your project.
						</li>
						<li>
							<strong>Information you send us directly.</strong> If you email,
							call, or text us using the contact details on this site, we keep
							that correspondence so we can follow up.
						</li>
						<li>
							<strong>Device and usage information.</strong> Like most websites,
							we collect basic technical data automatically &mdash; IP address,
							browser type, device type, pages viewed, referring site, and time
							spent on the site &mdash; through analytics tools.
						</li>
						<li>
							<strong>Interaction events.</strong> We record non-identifying
							events such as contact form submissions and taps on our
							click-to-call phone link so we know which parts of the site are
							useful.
						</li>
					</ul>

					<h4 className='mb-[0.75rem]'>2. Legal Bases for Processing (GDPR)</h4>
					<p className='text-paragraph mb-[1rem]'>
						If you are located in the European Economic Area or the United
						Kingdom, we process your personal information under one or more of
						the following legal bases:
					</p>
					<ul className='text-paragraph mb-[2rem] space-y-[0.5rem] list-disc pl-[1.25rem]'>
						<li>
							<strong>Consent</strong> &mdash; where you have voluntarily given
							us your information, such as by submitting a contact form.
						</li>
						<li>
							<strong>Legitimate interests</strong> &mdash; to operate, secure,
							and improve our website and to respond to inquiries about our
							products and services.
						</li>
						<li>
							<strong>Performance of a contract</strong> &mdash; where
							processing is necessary to provide a quote, fulfill an order, or
							deliver a log home package.
						</li>
						<li>
							<strong>Legal obligation</strong> &mdash; where we are required to
							retain records under applicable law.
						</li>
					</ul>

					<h4 className='mb-[0.75rem]'>3. How We Use Information</h4>
					<ul className='text-paragraph mb-[2rem] space-y-[0.5rem] list-disc pl-[1.25rem]'>
						<li>
							To respond to inquiries about log home packages, floor plans, and
							pricing.
						</li>
						<li>
							To prepare quotes and coordinate delivery for owner-builders and
							contractors.
						</li>
						<li>
							To send you information, plans, or documents you have requested.
						</li>
						<li>
							To understand how visitors use the site so we can improve it.
						</li>
						<li>
							To maintain the security and proper functioning of the website.
						</li>
						<li>
							To comply with legal obligations and to establish or defend legal
							claims.
						</li>
					</ul>

					<h4 className='mb-[0.75rem]'>
						4. Cookies &amp; Similar Technologies
					</h4>
					<p className='text-paragraph mb-[1rem]'>
						We use cookies and similar technologies to keep the site working
						correctly and to understand how it is used. These fall into two
						categories: essential cookies, which are required for basic site
						functionality, and analytics cookies, which help us measure traffic
						and page performance in aggregate.
					</p>
					<p className='text-paragraph-sm mb-[2rem]'>
						You can control or delete cookies through your browser settings.
						Blocking cookies may affect how parts of the site behave.
					</p>

					<h4 className='mb-[0.75rem]'>5. Sharing of Information</h4>
					<p className='text-paragraph mb-[1rem]'>
						{`We do not sell or rent your personal information. We share information only with service providers who help us operate this website, and only as needed for them to do that work:`}
					</p>
					<ul className='text-paragraph mb-[1rem] space-y-[0.5rem] list-disc pl-[1.25rem]'>
						<li>
							<strong>Vercel</strong> &mdash; website hosting and delivery.
						</li>
						<li>
							<strong>Google Analytics</strong> &mdash; website traffic and
							usage measurement.
						</li>
						<li>
							<strong>Google (Gmail)</strong> &mdash; delivery and storage of
							contact form submissions and email correspondence.
						</li>
						<li>
							<strong>Our content management system</strong> &mdash; a custom
							system used to publish and maintain the content on this site.
						</li>
					</ul>
					<p className='text-paragraph mb-[2rem]'>
						We may also disclose information if required by law, subpoena, or
						other legal process, or where we believe disclosure is necessary to
						protect our rights, your safety, or the safety of others.
					</p>

					<h4 className='mb-[0.75rem]'>6. Data Retention</h4>
					<p className='text-paragraph mb-[2rem]'>
						We keep inquiry and correspondence records for as long as needed to
						serve you and to keep accurate business records &mdash; buying or
						building a log home is a long decision, and a conversation may pick
						back up months later. Analytics data is retained according to the
						retention settings of our analytics provider. When information is no
						longer needed, we delete it or remove identifying details.
					</p>

					<h4 className='mb-[0.75rem]'>7. International Transfers</h4>
					<p className='text-paragraph mb-[2rem]'>
						We operate in {businessLocation}, and our service providers may
						store or process information in the United States or other
						countries. If you access this site from outside the United States,
						you understand that your information will be transferred to and
						processed in the United States, where data protection laws may
						differ from those in your country. We take reasonable steps to
						protect your information wherever it is processed.
					</p>

					<h4 className='mb-[0.75rem]'>8. Your Privacy Rights</h4>
					<p className='text-paragraph mb-[1rem]'>
						Depending on where you live, you may have the right to request
						access to the personal information we hold about you, to request
						correction or deletion of that information, to object to or restrict
						certain processing, to request a copy of your information in a
						portable format, and to withdraw consent you previously gave.
					</p>
					<p className='text-paragraph mb-[1rem]'>
						{`California residents have the right to know what personal information is collected, to request deletion, and to opt out of the "sale" or "sharing" of personal information. We do not sell or share personal information as those terms are defined under the California Consumer Privacy Act, and we will not discriminate against you for exercising any privacy right.`}
					</p>
					<p className='text-paragraph-sm mb-[2rem]'>
						To make a request, email us at{' '}
						<a href={`mailto:${contactEmail}`} className={linkClass}>
							{contactEmail}
						</a>
						. We may need to verify your identity before acting on a request.
					</p>

					<h4 className='mb-[0.75rem]'>9. Children&rsquo;s Privacy</h4>
					<p className='text-paragraph mb-[2rem]'>
						This website is intended for adults. We do not knowingly collect
						personal information from children under 13. If you believe a child
						has provided us information, contact us and we will delete it.
					</p>

					<h4 className='mb-[0.75rem]'>10. Security</h4>
					<p className='text-paragraph mb-[2rem]'>
						We use reasonable technical and organizational safeguards to protect
						the information we collect, including encrypted connections (HTTPS)
						across the site and limited access to inquiry records. No method of
						transmission or storage is completely secure, so we cannot guarantee
						absolute security.
					</p>

					<h4 className='mb-[0.75rem]'>11. Changes to This Policy</h4>
					<p className='text-paragraph mb-[2rem]'>
						We may update this policy from time to time to reflect changes in
						our practices or legal requirements. When we do, we will revise the
						effective date at the top of this page. Continued use of the site
						after an update means you accept the revised policy.
					</p>

					<h4 className='mb-[0.75rem]'>12. Contact Us</h4>
					<p className='text-paragraph mb-[1rem]'>
						Questions about this policy or about the information we hold? Reach
						out directly:
					</p>
					<p className='text-paragraph mb-[0.5rem]'>
						Email:{' '}
						<a href={`mailto:${contactEmail}`} className={linkClass}>
							{contactEmail}
						</a>
					</p>
					<p className='text-paragraph'>
						Phone:{' '}
						<a
							href={`tel:${contactPhone.replace(/[^0-9+]/g, '')}`}
							className={linkClass}
						>
							{contactPhone}
						</a>
					</p>
				</article>
			</section>
		</>
	);
}
