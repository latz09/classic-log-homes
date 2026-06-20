'use client';

import { useState } from 'react';
import SanityImage from '@/components/ui/SanityImage';

// One-off sizes for this gallery — skipping the leftover template presets
const HERO_SIZE = { width: 1200, height: 900, quality: 90 };
const TILE_SIZE = { width: 700, height: 525, quality: 85 };

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
	const [activeIndex, setActiveIndex] = useState(null);

	const gridImages = additionalImages.slice(0, 4);
	const allImages = [heroImage, ...additionalImages].filter(Boolean);
	const totalCount = allImages.length;
	const hasMore = additionalImages.length > 4;

	// Shared lightbox shape: [{ image }] — hero is index 0, tiles are i + 1
	const lightboxImages = allImages.map((image) => ({ image }));

	return (
		<>
			<div className='grid lg:grid-cols-2 gap-0.75 lg:gap-1.25'>
				{/* Hero — fills the left column */}
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

				{/* First 4 additional — 2x2, each tile carries its own height */}
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

								{/* Chip only on the 4th tile, only if there are hidden images */}
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

			{/* <Lightbox
				images={lightboxImages}
				startIndex={activeIndex}
				isOpen={activeIndex !== null}
				onClose={() => setActiveIndex(null)}
			/> */}
		</>
	);
};

export default MainGallery;