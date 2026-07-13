'use client';

import { track } from '@vercel/analytics';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import MenuIcon from '../layout/navigation/MenuIcon';
import Logo from '../lib/Logo';

const MobileNavbar = ({ navLinks = [], variant, logoUrl }) => {
	const [isNavOpen, setIsNavOpen] = useState(false);
	const [mounted, setMounted] = useState(false);
	const isNavigatingRef = useRef(false);

	useEffect(() => setMounted(true), []);

	const toggleNav = () => setIsNavOpen(!isNavOpen);

	const handleNavClick = (label, url) => {
		track(`CTA Click - Mobile Nav - ${label}`, {
			destination: url,
			buttonText: label,
		});
		// We're navigating to a new page — don't restore the old scroll
		// position once this component (or its replacement) re-evaluates.
		isNavigatingRef.current = true;
		toggleNav();
	};

	const mainLinks = navLinks.filter((link) => !link.isButton);
	const contactLink = navLinks.find((link) => link.isButton);

	useEffect(() => {
		if (isNavOpen) {
			const scrollY = window.scrollY;
			document.body.style.position = 'fixed';
			document.body.style.top = `-${scrollY}px`;
			document.body.style.left = '0';
			document.body.style.right = '0';
			document.body.style.overflow = 'hidden';
			document.body.dataset.scrollY = scrollY;
		} else if (document.body.style.position === 'fixed') {
			// Guard: only run restoration if the body is actually locked.
			// Without this, a freshly-mounted MobileNavbar on a NEW page
			// (isNavOpen starts false) would read a leftover scrollY value
			// left on document.body by the previous page's instance and
			// jump the new page down to it. That's the mobile nav bug.
			const scrollY = document.body.dataset.scrollY || '0';
			document.body.style.position = '';
			document.body.style.top = '';
			document.body.style.left = '';
			document.body.style.right = '';
			document.body.style.overflow = '';
			delete document.body.dataset.scrollY;

			if (!isNavigatingRef.current) {
				window.scrollTo(0, parseInt(scrollY));
			}
			isNavigatingRef.current = false;
		}
	}, [isNavOpen]);

	const overlayVariants = {
		closed: { opacity: 0 },
		open: { opacity: 1 },
	};

	const menuVariants = {
		closed: { x: '100%' },
		open: { x: '0%' },
	};

	const linkContainerVariants = {
		closed: { opacity: 0 },
		open: {
			opacity: 1,
			transition: {
				staggerChildren: 0.05,
				delayChildren: 0.2,
			},
		},
	};

	const linkVariants = {
		closed: { x: 30, opacity: 0 },
		open: { x: 0, opacity: 1 },
	};

	return (
		<div className='lg:hidden relative z-20'>
			<header className='flex items-center justify-between'>
				<Logo className='w-[10rem] h-auto' variant={variant} url={logoUrl} />
				<MenuIcon
					isNavOpen={isNavOpen}
					toggleNav={toggleNav}
					variant={isNavOpen ? 'light' : variant}
				/>
			</header>

			{mounted &&
				createPortal(
					<AnimatePresence>
						{isNavOpen && (
							<>
								<motion.div
									className='fixed inset-0 bg-darkGold/30 backdrop-blur-sm z-[100]'
									variants={overlayVariants}
									initial='closed'
									animate='open'
									exit='closed'
									transition={{ duration: 0.3 }}
									onClick={toggleNav}
								/>

								<motion.nav
									className='fixed top-0 right-0 h-full w-[83%] max-w-[400px] bg-black z-[100] shadow-lifted'
									variants={menuVariants}
									initial='closed'
									animate='open'
									exit='closed'
									transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
									onClick={(e) => e.stopPropagation()}
									role='dialog'
									aria-modal='true'
								>
									<div className='flex flex-col h-full px-xs py-xs'>
										<div className='flex items-center justify-between mb-xl'>
											<Logo className='w-[10rem] h-auto' white url={logoUrl} />
										</div>

										<motion.ul
											className='flex-1 space-y-1'
											variants={linkContainerVariants}
											initial='closed'
											animate='open'
										>
											{mainLinks.map((link, index) => (
												<motion.li key={index} variants={linkVariants}>
													<Link
														href={link.url}
														onClick={() => handleNavClick(link.label, link.url)}
														className='block py-0.5 text-dark text-paragraph-lg font-[500] border-b border-darkGold transition-colors duration-300 hover:text-primary'
													>
														{link.label}
													</Link>
												</motion.li>
											))}
										</motion.ul>

										{contactLink && (
											<motion.div
												initial={{ y: 20, opacity: 0 }}
												animate={{ y: 0, opacity: 1 }}
												transition={{ delay: 0.5, duration: 0.4 }}
												className='pt-xs border-t border-primary/50'
											>
												<Link
													href={contactLink.url}
													onClick={() =>
														handleNavClick(contactLink.label, contactLink.url)
													}
													className='block w-full py-0.75 text-center text-button bg-darkGold text-snow text-button rounded-sm transition-all duration-300 hover:bg-primary/75'
												>
													{contactLink.label}
												</Link>
											</motion.div>
										)}
									</div>
								</motion.nav>
								<motion.div
									className='fixed inset-x-0 top-0 z-[110] max-container pointer-events-none'
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.2 }}
								>
									<div className='flex justify-end px-1 py-0.5 mt-0.25'>
										<div className='pointer-events-auto'>
											<MenuIcon isNavOpen={isNavOpen} toggleNav={toggleNav} />
										</div>
									</div>
								</motion.div>
							</>
						)}
					</AnimatePresence>,
					document.body,
				)}
		</div>
	);
};

export default MobileNavbar;
