'use client';

import { useState } from 'react';
import HeadingWithOverline from '@/components/ui/HeadingWithOverline';
import SanityImage from '@/components/ui/SanityImage'; // adjust path if needed

// Down chevron — rotates 180° to become the "up" version when open
function Chevron() {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='28'
			height='16'
			viewBox='0 0 28 16'
			fill='none'
			aria-hidden='true'
			className='shrink-0'
		>
			<path
				d='M26.0607 1.06067L13.5607 13.5607L1.06067 1.06067'
				stroke='currentColor'
				strokeWidth='3'
			/>
		</svg>
	);
}

const AccordionItem = ({ label, items = [], isOpen, onToggle }) => {
	return (
		<div className='border-t border-white/15'>
			<button
				type='button'
				onClick={onToggle}
				aria-expanded={isOpen}
				className='group flex w-full items-center justify-between gap-4 py-2 text-left'
			>
				<h4 className='text-white transition-colors duration-300 group-hover:text-gold'>
					{label}
				</h4>
				<span
					className={`text-white transition-all duration-400 group-hover:text-gold ${
						isOpen ? 'rotate-180' : ''
					}`}
				>
					<Chevron />
				</span>
			</button>

			{/* Animated panel: grid-rows trick for smooth height (same pattern as ButtonLink) */}
			<div
				className={`grid transition-all duration-400 ease-out ${
					isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
				}`}
			>
				<div className='overflow-hidden'>
					<ul className='grid grid-cols-1 gap-0.75  pb-1.5 text-white sm:grid-cols-2'>
						{items.map((item, i) => (
							<li key={i} className='flex gap-0.5  text-paragraph'>
								<span aria-hidden='true' className='select-none'>
									•
								</span>
								<span>{item}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

const Accordion = ({ sections = [] }) => {
	const [openIndex, setOpenIndex] = useState(0); // first one open per design

	return (
		<div className=''>
			{sections.map((section, i) => (
				<AccordionItem
					key={i}
					label={section.label}
					items={section.items}
					isOpen={openIndex === i}
					onToggle={() => setOpenIndex(openIndex === i ? null : i)}
				/>
			))}
		</div>
	);
};

const WhatYourBuying = ({ data }) => {
	const {
		overline,
		heading,
		body,
		image,
		provideHeading,
		provideItems,
		sourceHeading,
		sourceItems,
	} = data;

	const sections = [
		{ label: provideHeading, items: provideItems },
		{ label: sourceHeading, items: sourceItems },
	];

	return (
		<div className='space-y-2 lg:space-y-4'>
			<div className='grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8'>
				<div className='lg:sticky lg:top-4 lg:self-start'>
					<HeadingWithOverline
						overline={overline}
						heading={heading}
						body={body}
					/>
				</div>
				<Accordion sections={sections} />
			</div>

			{image?.asset && (
				<div
					className='relative w-full overflow-hidden rounded-lg'
					style={{ aspectRatio: '2.16 / 1' }}
				>
					<SanityImage
						image={image}
						fill
						preset='whatYourBuying'
						sizes='(min-width: 1024px) 80rem, 100vw'
						alt={image.alt || heading || ''}
					/>
				</div>
			)}
		</div>
	);
};

export default WhatYourBuying;
