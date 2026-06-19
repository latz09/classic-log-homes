'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { track } from '@vercel/analytics';
import { useEffect, useRef } from 'react';

const VARIANTS = {
	// On light backgrounds
	'primary-on-light': 'px-1.25 py-0.75 bg-darkGold text-white hover:bg-black',
	'secondary-on-light':
		'px-1.25 py-0.75 bg-white border border-black text-black hover:bg-black hover:text-white',
	'tertiary-on-light': 'py-0.75 px-0 hover:px-1.25 text-darkGold hover:text-white',
	// On dark backgrounds
	'primary-on-dark': 'px-1.25 py-0.75 bg-gold text-black hover:bg-darkGold hover:text-white',
	'secondary-on-dark':
		'px-1.25 py-0.75 bg-black/0 border border-white text-white hover:bg-white hover:text-black',
	'tertiary-on-dark':  'py-0.75 px-0 hover:px-1.25 text-gold hover:text-black',
};

// Color that wipes in from the left on tertiary hover
const TERTIARY_FILL = {
	'tertiary-on-light': 'bg-darkGold',
	'tertiary-on-dark': 'bg-gold',
};

function Arrow() {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='17'
			viewBox='0 0 24 17'
			fill='none'
			aria-hidden='true'
		>
			<path
				d='M15 15.4138L22.36 8.41382L15 1.41382M22.36 8.41382H1'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='square'
				strokeLinejoin='round'
			/>
		</svg>
	);
}

/**
 * Reusable button link component.
 * @param {string} href - The destination link.
 * @param {string} variant - One of: 'primary-on-light', 'secondary-on-light', 'tertiary-on-light', 'primary-on-dark', 'secondary-on-dark', 'tertiary-on-dark'.
 * @param {boolean} external - Whether to use target="_blank".
 * @param {string} className - Additional classes.
 * @param {string} event - Optional event name for Vercel Analytics tracking (automatically prefixed with "CTA Click - ").
 * @param {ReactNode} children - The button label.
 */
export default function ButtonLink({
	href = '/',
	variant = 'primary-on-light',
	external = false,
	className = '',
	event, // Pass short name like "Hero - Free Consultation", component adds "CTA Click - " prefix
	children,
	...props
}) {
	// Track when component mounts (page load time)
	const pageLoadTime = useRef(null);
	useEffect(() => {
		pageLoadTime.current = Date.now();
	}, []);

	const isTertiary = variant.startsWith('tertiary');

	const baseStyles =
		'group relative overflow-hidden text-button inline-flex items-center justify-center rounded-sm transition-all duration-400 ';

	const combined = clsx(baseStyles, VARIANTS[variant], className);

	// Track button clicks in Vercel Analytics when event is provided
	const handleClick = () => {
		if (event) {
			const timeOnPage = pageLoadTime.current
				? Math.round((Date.now() - pageLoadTime.current) / 1000)
				: 0;

			track(`CTA Click - ${event}`, {
				destination: href,
				buttonText: typeof children === 'string' ? children : 'button',
				timeOnPage: `${timeOnPage}s`,
			});
		}
	};

	const content = isTertiary ? (
		<>
			{/* Background wipes in from the left on hover */}
			<span
				aria-hidden='true'
				className={clsx(
					'absolute inset-0 origin-left scale-x-0 transition-transform duration-400 ease-out group-hover:scale-x-100',
					TERTIARY_FILL[variant],
				)}
			/>
			{/* Arrow always visible */}
			<span className='relative z-10 inline-flex items-center gap-0.5 lg:gap-0.75'>
				{children}
				<Arrow />
			</span>
		</>
	) : (
		<span className='relative z-10 inline-flex items-center'>
			<span>{children}</span>
			{/* Arrow expands in from zero width on hover */}
			<span className='grid grid-cols-[0fr] transition-all duration-400 ease-out group-hover:grid-cols-[1fr]'>
				<span className='min-w-0 overflow-hidden'>
					<span className='flex items-center pl-[0.62rem] opacity-0 transition-opacity duration-400 group-hover:opacity-100'>
						<Arrow />
					</span>
				</span>
			</span>
		</span>
	);

	if (external) {
		return (
			<a
				href={href}
				className={combined}
				target='_blank'
				rel='noopener noreferrer'
				onClick={handleClick}
				{...props}
			>
				{content}
			</a>
		);
	}

	return (
		<Link href={href} onClick={handleClick} className={combined} {...props}>
			{content}
		</Link>
	);
}
