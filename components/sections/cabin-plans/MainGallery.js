'use client';

import { useState } from 'react';
import SanityImage from '@/components/ui/SanityImage';
import { getSanityImageUrl, IMAGE_PRESETS } from '@/utils/cms/getSanityImageUrl';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

const HERO_SIZE = { width: 1200, height: 900, quality: 90 };
const TILE_SIZE = { width: 700, height: 525, quality: 85 };

// Lift to a shared file once you're reusing this across projects
const COLORS = {
	charcoal: '#1E1E1E',
	cream: '#CFA240',
	white: '#CFA240',
};
function rgba(hex, a) {
	const n = hex.replace('#', '');
	const r = parseInt(n.slice(0, 2), 16);
	const g = parseInt(n.slice(2, 4), 16);
	const b = parseInt(n.slice(4, 6), 16);
	return `rgba(${r}, ${g}, ${b}, ${a})`;
}

const HoverHint = () => (
	<span className='absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/60'>
		<svg
			className='size-2 text-white opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path d='M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7' />
		</svg>
	</span>
);

const MainGallery = ({ heroImage, additionalImages = [] }) => {
	const [activeIndex, setActiveIndex] = useState(-1); // -1 = closed

	const gridImages = additionalImages.slice(0, 4);
	const allImages = [heroImage, ...additionalImages].filter(Boolean);
	const totalCount = allImages.length;
	const hasMore = additionalImages.length > 4;

	// Full, uncropped URLs for the lightbox — fit:'max' overrides the
	// helper's default crop so we don't chop up the full-res view
	const slides = allImages.map((image) => ({
		src: getSanityImageUrl(image, { ...IMAGE_PRESETS.lightbox, fit: 'max' }),
		alt: image?.alt || '',
	}));

	return (
		<>
			<div className='grid lg:grid-cols-2 gap-0.75 lg:gap-1.25'>
				<button
					type='button'
					onClick={() => setActiveIndex(0)}
					className='group relative aspect-[4/3] rounded-lg overflow-hidden'
				>
					<SanityImage
						image={heroImage}
						fill
						priority
						customSize={HERO_SIZE}
						sizes='(min-width: 1024px) 50vw, 100vw'
						className='transition-transform duration-300 ease-out group-hover:scale-105'
					/>
					<HoverHint />
				</button>

				<div className='grid grid-cols-2 gap-0.75 lg:gap-1.25'>
					{gridImages.map((img, i) => {
						const showSeeAll = i === gridImages.length - 1 && hasMore;

						return (
							<button
								type='button'
								key={i}
								onClick={() => setActiveIndex(i + 1)}
								className='group relative aspect-[4/3] rounded-lg overflow-hidden'
							>
								<SanityImage
									image={img}
									fill
									customSize={TILE_SIZE}
									sizes='(min-width: 1024px) 25vw, 50vw'
									className='transition-transform duration-300 ease-out group-hover:scale-105'
								/>
								<HoverHint />

								{showSeeAll && (
									<span className='absolute bottom-0.5 right-0.75 lg:bottom-1 lg:right-1.25 px-0.75 lg:px-1.25 py-0.25 lg:py-0.5 bg-white/80 group-hover:bg-gold text-black rounded-sm font-[600] z-10'>
										See all {totalCount} images
									</span>
								)}
							</button>
						);
					})}
				</div>
			</div>

			<Lightbox
				open={activeIndex >= 0}
				close={() => setActiveIndex(-1)}
				index={activeIndex}
				slides={slides}
				plugins={[Zoom, Thumbnails]}
				animation={{ fade: 500, swipe: 600 }}
				styles={{
					root: {
						'--yarl__color_backdrop': rgba(COLORS.charcoal, 0.94),
						'--yarl__color_button': COLORS.white,
						'--yarl__color_button_hover': COLORS.cream,
						'--yarl__color_button_active': COLORS.cream,
						'--yarl__thumbnails_container_background_color': rgba(COLORS.charcoal, 0.94),
						'--yarl__thumbnails_track_background_color': 'transparent',
						'--yarl__thumbnails_thumbnail_background_color': 'transparent',
						'--yarl__thumbnails_thumbnail_border_color': 'transparent',
						'--yarl__thumbnails_thumbnail_border_color_active': 'transparent',
						'--yarl__thumbnails_thumbnail_border_radius': '0.25rem',
						'--yarl__thumbnails_thumbnail_padding': '0px',
						'--yarl__navigation_button_size': '40px',
						'--yarl__navigation_button_border_radius': '9999px',
						'--yarl__loading_indicator_color': COLORS.cream,
					},
					navigationButton: {
						backgroundColor: rgba(COLORS.charcoal, 0.18),
						backdropFilter: 'blur(3px)',
						border: `1px solid ${rgba(COLORS.white, 0.2)}`,
						boxShadow: 'none',
					},
					slide: { borderRadius: '0.25rem', overflow: 'hidden' },
					toolbar: { backgroundColor: 'transparent', backdropFilter: 'none' },
					thumbnail: { border: 'none', borderRadius: '0.25rem' },
				}}
			/>
		</>
	);
};

export default MainGallery;