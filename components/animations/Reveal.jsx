'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { EASE, DURATION, DISTANCE } from '@/lib/motion';

/**
 * Scroll-triggered reveal for a single element or whole section.
 *
 * Wrap server components freely — children are passed through untouched,
 * so <Reveal><Pillars data={...} /></Reveal> keeps Pillars server-rendered.
 *
 * @param {string} as        - 'div' | 'section' | 'h2' | ...
 * @param {number} y         - travel distance in px (0 for fade-only)
 * @param {number} delay     - seconds
 * @param {number} amount    - 0–1, how much must be visible before firing
 * @param {boolean} once     - replay on re-entry if false
 */
export default function Reveal({
	children,
	as = 'div',
	y = DISTANCE,
	delay = 0,
	duration = DURATION.base,
	amount = 0.2,
	once = true,
	className = '',
	...rest
}) {
	const reduce = useReducedMotion();
	const Tag = motion[as] || motion.div;

	if (reduce) {
		const Plain = as;
		return (
			<Plain className={className} {...rest}>
				{children}
			</Plain>
		);
	}

	return (
		<Tag
			className={className}
			initial={{ opacity: 0, y }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once, amount }}
			transition={{ duration, ease: EASE, delay }}
			{...rest}
		>
			{children}
		</Tag>
	);
}
