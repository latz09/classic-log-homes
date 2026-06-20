'use client';

import Link from 'next/link';
import { track } from '@vercel/analytics';
import Logo from '@/components/lib/Logo';

const DesktopNavbar = ({ navLinks, logoUrl }) => {
    const mainLinks = navLinks.filter((link) => !link.isButton);
    const contactLink = navLinks.find((link) => link.isButton);

    const handleNavClick = (label, url) => {
        track(`CTA Click - Navbar - ${label}`, {
            destination: url,
            buttonText: label,
        });
    };

    return (
        <div className='hidden lg:flex items-center  w-full'>
            <Logo className="w-[13rem] h-auto" url={logoUrl} />
            <nav className='flex gap-1.75 items-center ml-auto'>
                {mainLinks.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url}
                        onClick={() => handleNavClick(link.label, link.url)}
                        className='block text-paragraph-lg font-[600] text-black transition-all duration-200 cursor-pointer'
                    >
                        {link.label}
                    </Link>
                ))}
                {contactLink && (
                    <Link
                        href={contactLink.url}
                        onClick={() => handleNavClick(contactLink.label, contactLink.url)}
                        className='block text-paragraph-lg font-[600] transition-all duration-200 cursor-pointer bg-black text-white hover:bg-white/75 hover:text-black border border-black/0  hover:border-black px-1.25 py-0.75 rounded'
                    >
                        {contactLink.label}
                    </Link>
                )}
            </nav>
        </div>
    );
};

export default DesktopNavbar;