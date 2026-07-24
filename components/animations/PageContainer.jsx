'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';

import { EASE, DURATION } from '@/lib/motion';

/**
 * Page-level transition.
 *
 * Deliberately opacity-only — no translate. A transform on this wrapper
 * creates a containing block that breaks `position: fixed` and `sticky`
 * for every descendant, and it shifts your -mt-[5vh] hero overlap.
 *
 * `key={pathname}` forces a remount on navigation so the fade replays
 * when someone goes home -> /floor-plans/[slug].
 */
export default function PageContainer({ children, className = '' }) {
	const reduce = useReducedMotion();
	const pathname = usePathname();

	return (
		<motion.main
			key={pathname}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{
				duration: reduce ? 0 : DURATION.fast,
				ease: EASE,
			}}
			className={className}
		>
			{children}
		</motion.main>
	);
}
