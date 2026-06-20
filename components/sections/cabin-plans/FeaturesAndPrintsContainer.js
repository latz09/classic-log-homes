'use client';

import { useState } from 'react';
import SanityImage from '@/components/ui/SanityImage';
import HeadingWithOverline from '@/components/ui/HeadingWithOverline';

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

const BLUEPRINT_SIZE = { width: 800, height: 600, quality: 90 };
const VISIBLE_COUNT = 3; // one row in the 3-col grid — bump to 6 for two rows

const BluePrints = ({ data = [] }) => {
	const [activeIndex, setActiveIndex] = useState(null);

	const visible = data.slice(0, VISIBLE_COUNT);
	const totalCount = data.length;
	const hasMore = data.length > VISIBLE_COUNT;

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

							{/* Hover affordance */}
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

			{/* <Lightbox
				images={data}
				startIndex={activeIndex}
				isOpen={activeIndex !== null}
				onClose={() => setActiveIndex(null)}
			/> */}
		</>
	);
};
