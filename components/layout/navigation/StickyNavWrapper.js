'use client';

import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

/**
 * Wraps the fixed nav bar and hides it on scroll-down, reveals it on scroll-up.
 * Always visible near the top of the page regardless of direction.
 */
export default function StickyNavWrapper({ children }) {
	const [visible, setVisible] = useState(true);
	const lastScrollY = useRef(0);

	useEffect(() => {
		lastScrollY.current = window.scrollY;

		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			const scrollingDown = currentScrollY > lastScrollY.current;
			const pastThreshold = currentScrollY > 80; // stay visible near the very top

			if (scrollingDown && pastThreshold) {
				setVisible(false);
			} else {
				setVisible(true);
			}

			lastScrollY.current = currentScrollY;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<div
			className={clsx(
				'fixed top-0 inset-x-0 z-50 max-container transition-all duration-300 ease-out',
				visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none',
			)}
		>
			{children}
		</div>
	);
}