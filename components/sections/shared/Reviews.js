'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import HeadingWithOverline from '@/components/ui/HeadingWithOverline';
import ButtonLink from '@/components/ui/ButtonLink';

const Reviews = ({ data }) => {
	const { overline, heading, testimonials, googleReviewsUrl } = data || {};
	if (!testimonials?.length) return null;

	return (
		<div id='reviews' className='scroll-mt-5.5 lg:scroll-mt-[7rem] 3xl:scroll-mt-10'>
			<ReviewCarousel
				overline={overline}
				heading={heading}
				items={testimonials}
				googleReviewsUrl={googleReviewsUrl}
			/>
		</div>
	);
};

export default Reviews;

const ReviewCarousel = ({ overline, heading, items, googleReviewsUrl }) => {
	const containerRef = useRef(null);
	const trackRef = useRef(null);
	const [offset, setOffset] = useState(0);
	const [step, setStep] = useState(0);
	const [maxOffset, setMaxOffset] = useState(0);

	const measure = useCallback(() => {
		const container = containerRef.current;
		const track = trackRef.current;
		if (!container || !track || track.children.length === 0) return;

		const card = track.children[0];
		const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
		const cardWidth = card.getBoundingClientRect().width + gap;
		const max = Math.max(0, track.scrollWidth - container.clientWidth);

		setStep(cardWidth);
		setMaxOffset(max);
		setOffset((o) => Math.min(o, max)); // clamp on resize
	}, []);

	useEffect(() => {
		measure();
		const ro = new ResizeObserver(measure);
		if (containerRef.current) ro.observe(containerRef.current);
		return () => ro.disconnect();
	}, [measure, items.length]);

	const canPrev = offset > 1;
	const canNext = offset < maxOffset - 1;

	const prev = () => setOffset((o) => Math.max(0, o - step));
	const next = () => setOffset((o) => Math.min(maxOffset, o + step));

	const onDragEnd = (_, info) => {
		if (step === 0) return;
		const projected = offset - info.offset.x - info.velocity.x * 0.2;
		const snapped = Math.max(
			0,
			Math.min(maxOffset, Math.round(projected / step) * step),
		);
		setOffset(snapped);
	};

	return (
		<div className='space-y-2'>
			<div className='flex items-end justify-between gap-1 lg:gap-2'>
				<HeadingWithOverline overline={overline} heading={heading} />
				<Arrows
					onPrev={prev}
					onNext={next}
					canPrev={canPrev}
					canNext={canNext}
				/>
			</div>

			<div ref={containerRef} className='overflow-hidden'>
				<motion.div
					ref={trackRef}
					className='flex gap-0.75 lg:gap-1.25'
					drag={maxOffset > 0 ? 'x' : false}
					dragConstraints={{ left: -maxOffset, right: 0 }}
					dragElastic={0.1}
					dragMomentum={false}
					onDragEnd={onDragEnd}
					animate={{ x: -offset }}
					transition={{ type: 'spring', stiffness: 300, damping: 40 }}
				>
					{items.map((item, index) => (
						<ReviewCard key={index} data={item} />
					))}
				</motion.div>
			</div>

			{googleReviewsUrl && (
				<div className='flex justify-center pt-0.5 lg:pt-1'>
					<ButtonLink
						href={googleReviewsUrl}
						variant='tertiary-on-dark'
						external
						event='Reviews - Read More Google Reviews'
					>
						Read more Google reviews
					</ButtonLink>
				</div>
			)}
		</div>
	);
};

const ReviewCard = ({ data }) => {
	const { quote, customerName, projectLocation, rating, audienceType } =
		data || {};

	return (
		<div className='shrink-0 basis-[87%] sm:basis-[47%] lg:basis-[30%] p-1 lg:p-1.25 bg-white/10 border rounded select-none space-y-2'>
			{rating ? <Stars rating={rating} /> : null}

			<p className='text-subheading'>{quote}</p>

			<div>
				<p className='font-semibold'>{customerName}</p>
				<p className='text-sm opacity-70'>
					{[projectLocation, audienceType].filter(Boolean).join(' · ')}
				</p>
			</div>
		</div>
	);
};

const Stars = ({ rating }) => {
	const count = Math.max(0, Math.min(5, Math.round(rating)));

	return (
		<div className='flex gap-0.5' aria-label={`${count} out of 5 stars`}>
			{Array.from({ length: 5 }).map((_, i) => (
				<svg
					key={i}
					width='18'
					height='18'
					viewBox='0 0 24 24'
					fill={i < count ? '#C9A84C' : 'none'}
					stroke='#C9A84C'
					strokeWidth='2'
					draggable={false}
				>
					<path d='M12 2l2.9 6.26L21.5 9l-5 4.87L17.8 21 12 17.5 6.2 21l1.3-7.13-5-4.87 6.6-.74L12 2z' />
				</svg>
			))}
		</div>
	);
};

const Arrows = ({ onPrev, onNext, canPrev, canNext }) => {
	return (
		<div className='flex gap-1 lg:gap-2'>
			<button
				type='button'
				onClick={onPrev}
				disabled={!canPrev}
				aria-label='Previous'
				className='transition disabled:opacity-30'
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='size-2 lg:size-3.5'
					viewBox='0 0 56 56'
					fill='none'
					draggable={false}
				>
					<circle
						cx='28'
						cy='28'
						r='28'
						transform='rotate(-180 28 28)'
						fill='#FFF8E3'
					/>
					<path
						d='M26 18L15.5 28.5L26 39M15.5 28.5L40 28.5'
						stroke='#1E1E1E'
						strokeWidth='3'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			</button>

			<button
				type='button'
				onClick={onNext}
				disabled={!canNext}
				aria-label='Next'
				className='transition disabled:opacity-30'
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='size-2 lg:size-3.5'
					viewBox='0 0 56 56'
					fill='none'
					draggable={false}
				>
					<circle cx='28' cy='28' r='28' fill='#FFF8E3' />
					<path
						d='M30 38L40.5 27.5L30 17M40.5 27.5H16'
						stroke='#1E1E1E'
						strokeWidth='3'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			</button>
		</div>
	);
};