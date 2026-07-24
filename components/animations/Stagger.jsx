'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { EASE, DURATION, DISTANCE, STAGGER } from '@/lib/motion';

/**
 * Stagger.
 *
 * Use for grids and lists — pillars, featured plans, process steps,
 * spec tiles, review cards. One orchestrated cascade per section, max.
 * Two competing staggers in one viewport looks nervous.
 *
 * <Stagger className="grid grid-cols-3 gap-6">
 *   {items.map((i) => <Stagger.Item key={i.id}>...</Stagger.Item>)}
 * </Stagger>
 */

const parentVariants = (stagger, delayChildren) => ({
	hidden: {},
	show: {
		transition: { staggerChildren: stagger, delayChildren },
	},
});

const itemVariants = (y, duration) => ({
	hidden: { opacity: 0, y },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration, ease: EASE },
	},
});

export default function Stagger({
	children,
	as = 'div',
	stagger = STAGGER,
	delayChildren = 0,
	amount = 0.15,
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
			variants={parentVariants(stagger, delayChildren)}
			initial='hidden'
			whileInView='show'
			viewport={{ once, amount }}
			{...rest}
		>
			{children}
		</Tag>
	);
}

function Item({
	children,
	as = 'div',
	y = DISTANCE,
	duration = DURATION.base,
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
		<Tag className={className} variants={itemVariants(y, duration)} {...rest}>
			{children}
		</Tag>
	);
}

Stagger.Item = Item;
export { Item as StaggerItem };
