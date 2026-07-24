'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { EASE, DURATION } from '@/lib/motion';

/**
 * Rule — the one signature move.
 *
 * A gold hairline that draws left to right as it enters view. Reads like a
 * measurement being struck on a board. Use it above section overlines
 * (Pillars, Process, Details) and nowhere else — the moment it's on every
 * element it stops being signature and starts being decoration.
 */
export default function Rule({
	className = 'h-px w-full bg-[#d4af5a]/40',
	duration = DURATION.slow,
	delay = 0,
	origin = 'left',
}) {
	const reduce = useReducedMotion();

	if (reduce) return <div className={className} />;

	return (
		<motion.div
			className={className}
			style={{ transformOrigin: origin, willChange: 'transform' }}
			initial={{ scaleX: 0 }}
			whileInView={{ scaleX: 1 }}
			viewport={{ once: true, amount: 1 }}
			transition={{ duration, ease: EASE, delay }}
		/>
	);
}
