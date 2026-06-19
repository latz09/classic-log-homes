import HeadingWithOverline from '@/components/ui/HeadingWithOverline';
import SanityImage from '@/components/ui/SanityImage';

// Tweak the image size/ratio right here
const IMAGE = { width: 1360, height: 372, quality: 92 };

const MillWork = ({ image, overline, heading, body }) => {
	return (
		<div className='overflow-hidden rounded bg-white'>
			{image?.asset && (
				<div
					className='relative w-full'
					style={{ aspectRatio: `${IMAGE.width} / ${IMAGE.height}` }}
				>
					<SanityImage
						image={image}
						fill
						customSize={IMAGE}
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