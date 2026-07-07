'use client';

import { useState } from 'react';
import SanityImage from '@/components/ui/SanityImage';
import HeadingWithOverline from '@/components/ui/HeadingWithOverline';
import {
	getSanityImageUrl,
	IMAGE_PRESETS,
} from '@/utils/cms/getSanityImageUrl';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/plugins/captions.css';

const FeaturesAndPrintsContainer = ({ keyFeatures, bluePrintImages }) => {
	return (
		<div className='bg-[#131313] space-y-2 lg:space-y-4 p-1.75 lg:p-3.75 rounded-lg'>
			<Features data={keyFeatures} />
			<BluePrints data={bluePrintImages} />
		</div>
	);
};

export default FeaturesAndPrintsContainer;

const Features = ({ data }) => {
	return (
		<div className='grid gap-2 lg:gap-0 lg:grid-cols-2'>
			<HeadingWithOverline overline='Features' heading='Key Features' />
			<div className='grid grid-cols-2 gap-x-1 lg:gap-x-5 gap-y-0.75 lg:gap-y-1.25'>
				{data.map((feature, i) => (
					<div key={i} className='flex items-center gap-0.5 lg:gap-1'>
						<span className='size-0.25 shrink-0 rounded-full bg-white' />
						<p className='text-paragraph lg:text-paragraph-lg'>{feature}</p>
					</div>
				))}
			</div>
		</div>
	);
};

// Lightbox theme — same as MainGallery. Worth lifting both into a
// shared @/lib/lightboxTheme.js once you're copy-pasting this a 3rd time
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

const BLUEPRINT_SIZE = { width: 800, height: 600, quality: 90 };
const VISIBLE_COUNT = 3; // one row in the 3-col grid — bump to 6 for two rows

const BluePrints = ({ data = [] }) => {
	const [activeIndex, setActiveIndex] = useState(-1); // -1 = closed

	const visible = data.slice(0, VISIBLE_COUNT);
	const totalCount = data.length;
	const hasMore = data.length > VISIBLE_COUNT;

	// Full, uncropped URLs for the lightbox — pull from item.image,
	// fit:'max' overrides the helper's default crop
	// slides — add `description` from item.caption (sibling of image, per your query)
	const slides = data.map((item) => ({
		src: getSanityImageUrl(item.image, {
			...IMAGE_PRESETS.lightbox,
			fit: 'max',
		}),
		alt: item.image?.alt || item.caption || '',
		description: item.caption || undefined, // Captions plugin reads this
	}));

	return (
		<>
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-0.75 lg:gap-1.25'>
				{visible.map((item, i) => {
					const showSeeAll = i === visible.length - 1 && hasMore;

					return (
						<button
							type='button'
							key={i}
							onClick={() => setActiveIndex(i)}
							className='group relative aspect-[4/3] rounded-lg overflow-hidden'
						>
							<SanityImage
								image={item.image}
								fill
								customSize={BLUEPRINT_SIZE}
								sizes='(min-width: 1024px) 33vw, 100vw'
								className='transition-transform duration-300 ease-out group-hover:scale-105'
							/>

							<span className='absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-darkGold/60'>
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

							{showSeeAll && (
								<span className='absolute bottom-0.5 right-0.75 lg:bottom-1 lg:right-1.25 px-0.75 lg:px-1.25 py-0.25 lg:py-0.5 bg-gold text-black group-hover:bg-white rounded-sm font-[600] z-10'>
									See all {totalCount} plans
								</span>
							)}
						</button>
					);
				})}
			</div>

			<Lightbox
				open={activeIndex >= 0}
				close={() => setActiveIndex(-1)}
				index={activeIndex}
				slides={slides}
				plugins={[Zoom, Thumbnails, Captions]}
				animation={{ fade: 500, swipe: 600 }}
				captions={{ showToggle: true, descriptionTextAlign: 'center' }}
				styles={{
					root: {
						'--yarl__color_backdrop': rgba(COLORS.charcoal, 0.94),
						'--yarl__color_button': COLORS.white,
						'--yarl__color_button_hover': COLORS.cream,
						'--yarl__color_button_active': COLORS.cream,
						'--yarl__thumbnails_container_background_color': rgba(
							COLORS.charcoal,
							0.94,
						),
						'--yarl__thumbnails_track_background_color': 'transparent',
						'--yarl__thumbnails_thumbnail_background_color': 'transparent',
						'--yarl__thumbnails_thumbnail_border_color': 'transparent',
						'--yarl__thumbnails_thumbnail_border_color_active': 'transparent',
						'--yarl__thumbnails_thumbnail_border_radius': '0.25rem',
						'--yarl__thumbnails_thumbnail_padding': '0px',
						'--yarl__navigation_button_size': '40px',
						'--yarl__navigation_button_border_radius': '9999px',
						'--yarl__loading_indicator_color': COLORS.cream,
							'--yarl__slide_captions_container_background': rgba(COLORS.charcoal, 0.0),
		'--yarl__slide_description_color': COLORS.cream,
		'--yarl__slide_title_color': COLORS.white,
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
