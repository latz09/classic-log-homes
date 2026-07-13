import ButtonLink from '@/components/ui/ButtonLink';
import HeroCarousel from '@/components/ui/HeroCarousel';

const LandingHero = ({ data, children }) => {
	const { headline, subheadline, images, ctaPrimary, ctaSecondary } = data;

	const headlineLines = headline
		.split('.')
		.map((line) => line.trim())
		.filter(Boolean)
		.map((line) => `${line}.`);

	return (
		<section className='relative flex h-[100vh] sm:h-[105vh] xl:h-[110vh] w-full flex-col  overflow-hidden'>
			{/* Background carousel — crossfades between images */}
			<HeroCarousel images={images} alt={headline} className='z-0' />

			{/* Overlay for legibility */}
			<div className='absolute inset-0 z-10 bg-gradient-to-b from-transparent from-[42.29%] to-black/90 to-[74.87%]' />

			{/* Nav slot — floats over the image at the top */}
			<div className='relative z-20'>{children}</div>

			{/* Hero content — fills down to the fold (100vh), bottom-aligned */}
			<div className='max-container relative z-10 flex flex-1 flex-col justify-end text-white pb-4 xl:pb-5.5 3xl:pb-[9rem]'>
				<div className='grid gap-1.5 xl:gap-0 xl:grid-cols-2 items-end'>
					<h1 className=''>
						{headlineLines.map((line, i) => (
							<span key={i} className='block'>
								{line}
							</span>
						))}
					</h1>
					<div className='space-y-1.25 xl:space-y-2.5 xl:w-2/3 ml-auto'>
						<p className='text-paragraph-lg'>{subheadline}</p>

						<div className='space-x-0.5 lg:space-x-1'>
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
			</div>

			{/* Apron — 10vh of image-only space below the fold for the pillars to overlap */}
			<div aria-hidden className='h-[5vh] shrink-0' />
		</section>
	);
};

export default LandingHero;