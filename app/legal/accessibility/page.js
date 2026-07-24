import NavigationContainer from '@/components/layout/navigation/NavigationContainer';
import { fetchSeoSettings } from '@/utils/cms/fetchSeoSettings';

// Have counsel review before launch. This is a professional template, not legal advice.

// ---- Static config (edit here) ----
const effectiveDate = 'August 1, 2026'; // TODO: confirm actual launch / DNS cutover date
const contactPhone = '(715) 887-2550';
// -----------------------------------

const linkClass = 'font-semibold underline text-[#CFA240] hover:opacity-80';

export default async function AccessibilityStatement() {
	const seo = await fetchSeoSettings();
	const businessName = seo?.businessName ?? 'Company Name';
	const contactEmail = seo?.contactEmail ?? 'client@email.com';

	return (
		<>
			<NavigationContainer />

			<section className='pt-6 lg:pt-10 3xl:pt-12 px-[1.5rem]'>
				<article className='max-w-[64rem] mx-auto'>
					<h1 className='mb-[1rem]'>Accessibility Statement</h1>

					<p className='text-paragraph-sm mb-[2rem]'>
						Effective date: {effectiveDate}
					</p>

					<p className='text-paragraph mb-[3rem]'>
						{businessName} wants this website to work for everyone &mdash;
						including visitors who use screen readers, keyboard navigation,
						magnification, captions, or other assistive technology.
						Accessibility is something we work at continuously, not a box we
						check once.
					</p>

					<h4 className='mb-[0.75rem]'>
						1. Our Commitment &amp; Accessibility Standard
					</h4>
					<p className='text-paragraph mb-[1rem]'>
						We have made a voluntary, good-faith commitment to align this
						website with the{' '}
						<a
							href='https://www.w3.org/WAI/WCAG21/quickref/'
							className={linkClass}
							target='_blank'
							rel='noopener noreferrer'
						>
							Web Content Accessibility Guidelines (WCAG) 2.1, Level AA
						</a>
						, published by the World Wide Web Consortium (W3C). These guidelines
						are the widely recognized standard for making web content more
						accessible to people with visual, auditory, physical, speech,
						cognitive, and neurological disabilities.
					</p>
					<p className='text-paragraph mb-[2rem]'>
						In building this site we have worked toward clear text contrast,
						keyboard-accessible navigation, descriptive alternative text for
						meaningful images, logical heading structure, labeled form fields,
						and a layout that adapts to mobile screens and browser zoom.
					</p>

					<h4 className='mb-[0.75rem]'>2. Known Limitations</h4>
					<p className='text-paragraph mb-[1rem]'>
						{`We are honest about where the site falls short. Areas we are aware of:`}
					</p>
					<ul className='text-paragraph mb-[2rem] space-y-[0.5rem] list-disc pl-[1.25rem]'>
						<li>
							<strong>Downloadable PDFs.</strong> Floor plan sheets and free
							guides offered on this site are PDF documents. Some of these may
							not be fully tagged for screen readers. If you need the
							information in one of these documents in another format, contact
							us and we will provide it.
						</li>
						<li>
							<strong>Floor plan renderings and photography.</strong> Renderings
							and project photos carry descriptive alternative text, but visual
							detail in a drawing cannot always be fully conveyed in text. We
							are glad to walk you through any plan directly.
						</li>
						<li>
							<strong>External links.</strong> Some links lead to websites we do
							not control. We cannot guarantee the accessibility of third-party
							sites.
						</li>
						<li>
							<strong>Ongoing content updates.</strong> Content is added to this
							site over time. New material may occasionally miss an
							accessibility detail before we catch and correct it.
						</li>
					</ul>

					<h4 className='mb-[0.75rem]'>3. Alternative Ways to Reach Us</h4>
					<p className='text-paragraph mb-[1rem]'>
						{`If any part of this website is difficult to use, you do not have to work around it. We will give you the same information a different way — over the phone, by email, or in person at our showroom.`}
					</p>
					<p className='text-paragraph mb-[2rem]'>
						That includes floor plan details and specifications, pricing and
						package information, delivery questions, and anything else on the
						site. Ask and we will read it, send it, or walk you through it.
					</p>

					<h4 className='mb-[0.75rem]'>4. Report an Accessibility Issue</h4>
					<p className='text-paragraph mb-[1rem]'>
						If you run into a barrier on this site, we want to hear about it.
						Tell us the page you were on, what you were trying to do, and the
						assistive technology or browser you were using, if you know it. That
						helps us fix the right thing.
					</p>
					<p className='text-paragraph mb-[0.5rem]'>
						Email:{' '}
						<a href={`mailto:${contactEmail}`} className={linkClass}>
							{contactEmail}
						</a>
					</p>
					<p className='text-paragraph mb-[1rem]'>
						Phone:{' '}
						<a
							href={`tel:${contactPhone.replace(/[^0-9+]/g, '')}`}
							className={linkClass}
						>
							{contactPhone}
						</a>
					</p>
					<p className='text-paragraph mb-[2rem]'>
						We aim to respond as quickly as possible.
					</p>

					<h4 className='mb-[0.75rem]'>5. Ongoing Efforts</h4>
					<p className='text-paragraph'>
						Accessibility work on this site is ongoing. We review pages as
						content changes, correct issues as we find them or as they are
						reported to us, and take feedback from visitors seriously. As
						standards and tools improve, we intend to keep improving with them.
					</p>
				</article>
			</section>
		</>
	);
}
