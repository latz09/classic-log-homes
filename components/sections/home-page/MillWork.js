import HeadingWithOverline from '@/components/ui/HeadingWithOverline';
import SanityImage from '@/components/ui/SanityImage';

// Image fetch settings (what gets requested from Sanity)
const IMAGE = { width: 1360, height: 900, quality: 88 };

const MillWork = ({ image, overline, heading, body }) => {
	return (
		<div className='overflow-hidden rounded-lg bg-white'>
			{image?.asset && (
				<div className='relative w-full aspect-[5.5/3] sm:aspect-[16/9] lg:aspect-[1360/372]'>
					<SanityImage
						image={image}
						fill
						customSize={IMAGE}
						className='object-cover'
						sizes='(min-width: 1024px) 1360px, 100vw'
						alt={image.alt || heading || ''}
					/>
				</div>
			)}
			<div className='py-1.5 lg:py-3 px-1.75 lg:px-3.75'>
				<HeadingWithOverline
					overline={overline}
					heading={heading}
					body={body}
					secondary
					flexed
					tightGap
				/>
			</div>
		</div>
	);
};

export default MillWork;