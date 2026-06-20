'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToHash() {
	const pathname = usePathname();

	useEffect(() => {
		const { hash } = window.location;
		console.log('ScrollToHash arrival hash:', hash); // temporary
		if (!hash) return;

		const id = decodeURIComponent(hash.slice(1));
		let frame;
		let tries = 0;

		const tryScroll = () => {
			const el = document.getElementById(id);
			if (el) {
				el.scrollIntoView({ block: 'start' });
			} else if (tries++ < 40) {
				frame = requestAnimationFrame(tryScroll);
			}
		};

		frame = requestAnimationFrame(tryScroll);
		return () => cancelAnimationFrame(frame);
	}, [pathname]);

	return null;
}