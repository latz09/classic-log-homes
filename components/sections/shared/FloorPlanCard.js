import Link from 'next/link';
import { SqFtIcon, BedIcon, BathIcon } from '@/components/ui/PlanSpecIcons';
import SanityImage from '@/components/ui/SanityImage';
import ButtonLink from '@/components/ui/ButtonLink';

// Card image size/shape — tweak here
// Card image — fetch size; crops to fill the box (default behavior)
const IMAGE = { width: 800, height: 600, quality: 85 };

const SpecItem = ({ icon, value }) => (
	<div className='flex gap-0.5 items-center'>
		{icon}
		<span className='text-paragraph'>{value}</span>
	</div>
);

const FloorPlanCard = ({ data }) => {
	const {
		name,
		slug,
		cardImage,
		category,
		startingPrice,
		shortDescription,
		specs,
	} = data;

	const specItems = [
		{ icon: <SqFtIcon />, value: `${specs?.squareFeet} sq ft` },
		{ icon: <BedIcon />, value: `${specs?.bedrooms} bed` },
		{ icon: <BathIcon />, value: `${specs?.bathrooms} bath` },
	];

	return (
		<div className='space-y-0.75 lg:space-y-1.25'>
			{cardImage?.asset && (
				<div className='relative w-full aspect-[4/3] overflow-hidden rounded'>
					<SanityImage
						image={cardImage}
						fill
						customSize={IMAGE}
						sizes='(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'
						alt={cardImage.alt || name || ''}
					/>
				</div>
			)}

			<div className='space-y-0.5 lg:space-y-1 mr-1'>
				<p className='text-overline text-gold'>{category}</p>
				<h4>{name}</h4>
				<p className='text-paragraph-lg uppercase'>{startingPrice}</p>

				<div className='flex items-end gap-2'>
					{specItems.map((spec, i) => (
						<SpecItem key={i} icon={spec.icon} value={spec.value} />
					))}
				</div>
			</div>

			<p className='text-paragraph pt-0.5 lg:pt-0.75 mr-1'>
				{shortDescription}
			</p>

			
			<ButtonLink
				href={`/floor-plans/${slug}`}
				variant='tertiary-on-dark'
				event={`Floor Plan Card - ${name} CTA`}
			>
				{`View ${name} details`}
			</ButtonLink>
		</div>
	);
};

export default FloorPlanCard;
