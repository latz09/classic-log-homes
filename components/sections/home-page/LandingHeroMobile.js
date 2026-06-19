import ButtonLink from '@/components/ui/ButtonLink';
import HeroCarousel from '@/components/ui/HeroCarousel';

const LandingHeroMobile = ({ data, children }) => {
	const { headline, subheadline, images, ctaPrimary, ctaSecondary } = data;

	const headlineLines = headline
		.split('.')
		.map((line) => line.trim())
		.filter(Boolean)
		.map((line) => `${line}.`);

	return (
		<section className='relative flex h-[100vh] w-full flex-col overflow-hidden'>
			{/* Nav — floats over the top of the image */}
			<div className='absolute inset-x-0 top-0 z-30'>{children}</div>

			{/* TOP 50% — carousel */}
			<div className='relative z-0 h-[50vh] w-full'>
				<HeroCarousel images={images} alt={headline} />

				{/* Soft seam so the image melts into the black content (optional) */}
				<div
					aria-hidden
					className='absolute inset-x-0 bottom-0 z-10 h-1/4 bg-gradient-to-b from-transparent  to-black'
				/>
			</div>

			{/* BOTTOM 50% — content on solid black */}
			<div className='max-container relative z-10 flex h-[50vh] flex-col justify-center bg-black pb-4 pt-0 text-white'>
				<div className='space-y-1'>
					<h1>
						{headlineLines.map((line, i) => (
							<span key={i} className='block'>
								{line}
							</span>
						))}
					</h1>

					<p className='text-paragraph-lg'>{subheadline}</p>

					<div className='space-x-0.5'>
						<ButtonLink
							href={'/#floor-plans'}
							variant='primary-on-dark'
							event='Hero - Floor Plans CTA'
						>
							{ctaPrimary?.label || 'Learn More'}
						</ButtonLink>

						<ButtonLink
							href={'/#contact'}
							variant='secondary-on-dark'
							event='Hero - Contact CTA'
						>
							{ctaSecondary?.label || 'Contact Us'}
						</ButtonLink>
					</div>
				</div>
			</div>
		</section>
	);
};

export default LandingHeroMobile;