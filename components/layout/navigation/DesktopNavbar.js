'use client';

import { track } from '@vercel/analytics';
import Logo from '@/components/lib/Logo';

const DesktopNavbar = ({ navLinks, logoUrl }) => {
	const mainLinks = navLinks.filter((link) => !link.isButton);
	const contactLink = navLinks.find((link) => link.isButton);

	const handleNavClick = (label, url) => {
		track(`CTA Click - Navbar - ${label}`, { destination: url, buttonText: label });
	};

	return (
		<div className='hidden lg:flex items-center w-full'>
			<Logo className='lg:w-[13rem] 2xl:w-[17rem] h-auto' url={logoUrl} />
			<nav className='flex gap-1.75 items-center ml-auto'>
				{mainLinks.map((link, index) => (
					<a
						key={index}
						href={link.url}
						onClick={() => handleNavClick(link.label, link.url)}
						className='block text-paragraph-lg font-[700] text-black transition-all duration-200 cursor-pointer'
					>
						{link.label}
					</a>
				))}
				{contactLink && (
					<a
						href={contactLink.url}
						onClick={() => handleNavClick(contactLink.label, contactLink.url)}
						className='block text-paragraph-lg font-[700] transition-all duration-200 cursor-pointer bg-black text-white hover:bg-white/75 hover:text-black border border-black/0 hover:border-black px-1.25 py-0.75 rounded'
					>
						{contactLink.label}
					</a>
				)}
			</nav>
		</div>
	);
};

export default DesktopNavbar;