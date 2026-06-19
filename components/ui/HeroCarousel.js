'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SanityImage from '@/components/ui/SanityImage';

const SLIDE_DURATION = 5200; // how long each image holds (ms)
const FADE_DURATION = 6.5; // crossfade length (s)

const HeroCarousel = ({ images, alt = '', className = '' }) => {
	const slides = images?.length ? images : [];
	const [active, setActive] = useState(0);
	const reduceMotion = useReducedMotion();

	// Auto-advance — only when there's more than one image
	useEffect(() => {
		if (slides.length <= 1 || reduceMotion) return;

		const id = setInterval(() => {
			setActive((prev) => (prev + 1) % slides.length);
		}, SLIDE_DURATION);

		return () => clearInterval(id);
	}, [slides.length, reduceMotion]);

	if (!slides.length) return null;

	return (
		<div className={`absolute inset-0 ${className}`}>
			{slides.map((image, i) => (
				<motion.div
					key={i}
					className='absolute inset-0'
					style={{ zIndex: i === active ? 1 : 0 }}
					initial={false}
					animate={{ opacity: i === active ? 1 : 0 }}
					transition={{
						duration: reduceMotion ? 0 : FADE_DURATION,
						ease: [0.4, 0, 0.2, 1],
					}}
				>
					<SanityImage
						image={image}
						alt={alt}
						preset='hero'
						fill
						priority={i === 0}
						sizes='100vw'
					/>
				</motion.div>
			))}
		</div>
	);
};

export default HeroCarousel;