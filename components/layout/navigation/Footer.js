import Link from 'next/link';
import Logo from '../../lib/Logo';
import { fetchContent as fc } from '@/utils/cms/fetchContent';
import { FETCH_SITE_SETTINGS_QUERY as Q } from '@/data/queries/settings/FETCH_SITE_SETTINGS_QUERY';
import LogGraphic from '@/components/ui/graphics/LogGraphic';
import ButtonLink from '@/components/ui/ButtonLink';

const currentYear = new Date().getFullYear();

const Footer = async () => {
	const data = await fc(Q);
	const { footer, contact, freeGuides } = data || {};

	const footerGuides = (freeGuides || []).filter(
		(g) => g.showInFooter && g.fileUrl,
	);

	return (
		<footer className='relative overflow-hidden bg-[#131313] mt-5 lg:mt-10 pt-2.5 lg:pt-5'>
			<LogGraphic
				variant='large'
				className='inset-0 w-full h-full z-0 opacity-10'
			/>
			<div className='max-container space-y-1 lg:space-y-1.5'>
				<div className=' grid place-items-center lg:place-items-start '>
					<Logo className='w-[16rem] lg:w-[20rem] h-auto' white />
				</div>

				<div className='lg:flex lg:gap-[25rem] pb-2 lg:pb-4 pt-1 lg:pt-0'>
					<div className='ml-0 lg:ml-6 space-y-0.75 text-center lg:text-left  '>
						{contact?.phone && (
							<p>
								<a href={`tel:${contact.phone}`}>{contact.phone}</a>
							</p>
						)}
						{/* {contact?.email && (
							<p>
								<a href={`mailto:${contact.email}`}>{contact.email}</a>
							</p>
						)} */}
						{/* {contact?.address && (
							<p className='whitespace-pre-line'>{contact.address}</p>
						)} */}
						{contact?.showroomNote && (
							<p className='whitespace-nowrap'>{contact.showroomNote}</p>
						)}
					</div>
					<div className='flex flex-col justify-between items-center lg:items-start text-center lg:text-left'>
						<div className='flex gap-2 lg:gap-4 text-paragraph-lg font-[600] text-gold py-2 lg:py-0'>
							<Link href='/#how-it-works'>About</Link>
							<Link href='/#floor-plans'>Floor Plans</Link>
							<Link href='/#contact'>Contact</Link>
						</div>

						{footerGuides.length > 0 && (
							<div className='flex flex-col gap-0.75 pb-1 lg:pt-1 '>
								{footerGuides.map((guide, i) => (
									<ButtonLink
										key={i}
										href={guide.fileUrl}
										variant='tertiary-on-dark'
										external
										download
										event={`Footer - Download ${guide.title}`}
									>
										Download {guide.title}
									</ButtonLink>
								))}
							</div>
						)}

						<p>{footer?.tagline}</p>
					</div>

					{/* <p>{footer?.copyright}</p> */}
				</div>
				<CopyRight content={footer?.copyright} />
			</div>
		</footer>
	);
};

export default Footer;

const CopyRight = ({ content }) => {
	return (
		<div className='py-0.75 border-t border-darkGold text-dark'>
			<div className='flex flex-col-reverse gap-1 items-center text-center lg:flex-row lg:justify-between lg:text-left'>
				<p>{`© ${currentYear} by ${content}`}</p>

				<div className='flex gap-1 lg:gap-2'>
					<Link href='/legal/privacy-policy'>Privacy Policy</Link>
					<Link href='/legal/accessibility'>Accessibility</Link>
				</div>
			</div>
		</div>
	);
};

const PoweredBy = () => {
	return (
		<div>
			<a
				href='https://www.latzwebdesign.com'
				target='_blank'
				rel='noopener noreferrer'
				className='grid place-items-center  text-dark '
			>
				<p>
					{`Powered by `}
					<span className='font-bold '>LatzWebDesign</span>
				</p>
				<p className='text-sm font-semibold'>© LatzWebDesign.com</p>
			</a>
		</div>
	);
};
