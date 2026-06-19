import ButtonLink from './ButtonLink'; // adjust path to wherever ButtonLink lives

/*
 * HeadingWithOverline
 * ───────────────────
 * Props:
 *   heading    - main heading text
 *   overline   - small label above the heading (e.g. "OVERVIEW")
 *   as         - heading tag: 'h1'–'h5' (default 'h2')
 *   secondary  - true = dark text on light bg, false = light text on dark bg
 *   body       - paragraph text from Sanity; a string OR an array of strings.
 *                Either is normalized to spaced paragraphs automatically.
 *   flexed     - true = heading left / body (+cta) right, stacks on mobile
 *   cta        - object: { label, href, variant?, external?, event? }
 *                Renders a <ButtonLink> under the body (flexed only).
 *                variant defaults based on `secondary` if omitted.
 *   centered   - true = center-aligned overline + heading (+body), centered block
 *
 * USAGE:
 *
 * // Image 1 — stacked (default)
 * <HeadingWithOverline
 *   overline="OVERVIEW"
 *   heading="We supply the log package. You build the home."
 *   body="Classic Log Homes supplies and delivers a complete log package..."
 * />
 *
 * // Image 2 — flexed (heading left, body right)
 * <HeadingWithOverline
 *   flexed
 *   overline="FLOOR PLANS"
 *   heading="Featured floor plans"
 *   body="Start with a proven package layout, then talk through the changes..."
 * />
 *
 * // Image 3 — flexed with a CTA under the body
 * <HeadingWithOverline
 *   flexed
 *   overline="POST-DELIVERY SUPPORT"
 *   heading="Support that starts at delivery"
 *   body="Jeff provides continued professional support after delivery..."
 *   cta={{ label: 'Contact for support', href: '/contact', event: 'Support - Contact' }}
 * />
 *
 * // Image 4 — centered (overline + heading only)
 * <HeadingWithOverline
 *   centered
 *   overline="THE PROCESS"
 *   heading="How it works"
 * />
 *
 * // Image 5 — flexed + secondary + multi-paragraph body (array)
 * <HeadingWithOverline
 *   flexed
 *   secondary
 *   overline="HOW WE'RE BUILT"
 *   heading="Wisconsin mills. Wisconsin craftsmen. One direct line."
 *   body={[
 *     'Classic Log Homes operates through a network of Wisconsin sawmill partners...',
 *     'The mill produces. Jeff coordinates. You get one direct line from quote to delivery.',
 *   ]}
 * />
 */

const HeadingWithOverline = ({
	heading,
	overline,
	as = 'h2',
	secondary = false,
	body,
	flexed = false,
	cta,
	centered = false,
	tightGap = false,
}) => {
	const valid = ['h1', 'h2', 'h3', 'h4', 'h5'];
	const Heading = valid.includes(as) ? as : 'h2';

	// Normalize body (string | string[] | null) into a clean array of paragraphs
	const paragraphs = (Array.isArray(body) ? body : [body]).filter(
		(p) => typeof p === 'string' && p.trim() !== '',
	);

	const overlineEl = overline && (
		<p
			className={`text-overline ${!secondary ? 'text-gold' : 'text-darkGold'}`}
		>
			{overline}
		</p>
	);

	const headingEl = heading && (
		<Heading className={`${!secondary ? 'text-white' : 'text-black'}`}>
			{heading}
		</Heading>
	);

	const bodyEl = paragraphs.length > 0 && (
		<div className='space-y-1 lg:space-y-2'>
			{paragraphs.map((para, i) => (
				<p
					key={i}
					className={`text-paragraph-lg ${!secondary ? 'text-white' : 'text-black'}`}
				>
					{para}
				</p>
			))}
		</div>
	);

	const ctaEl = cta?.href && (
		<ButtonLink
			href={cta.href}
			variant={
				cta.variant ?? (secondary ? 'primary-on-light' : 'primary-on-dark')
			}
			external={cta.external}
			event={cta.event}
		>
			{cta.label}
		</ButtonLink>
	);

	if (flexed) {
		return (
			<div
				className={`flex flex-col  lg:flex-row lg:items-start lg:justify-between ${
					tightGap ? 'gap-1 lg:gap-3' : 'gap-1.5 lg:gap-12'
				}`}
			>
				<div className='space-y-0.75 lg:flex-1 lg:space-y-1'>
					{overlineEl}
					{headingEl}
				</div>
				{(bodyEl || ctaEl) && (
					<div className='space-y-6 lg:flex-1'>
						{bodyEl}
						{ctaEl}
					</div>
				)}
			</div>
		);
	}

	return (
		<div
			className={`space-y-0.75 lg:space-y-1.25 ${centered ? 'text-center' : ''}`}
		>
			{overlineEl}
			{headingEl}
			{bodyEl}
		</div>
	);
};

export default HeadingWithOverline;
