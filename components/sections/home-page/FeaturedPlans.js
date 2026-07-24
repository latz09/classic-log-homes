import HeadingWithOverline from '@/components/ui/HeadingWithOverline';
import FloorPlanCard from '../shared/FloorPlanCard';
import Link from 'next/link';
import Stagger, { StaggerItem } from '@/components/animations/Stagger';

const FeaturedPlans = ({ data }) => {
	const { overline, heading, subheadline, plans } = data;

	// TEMP — preview only: repeat the single plan to 6 cards. Remove before ship.
	const previewPlans = plans?.length
		? Array.from({ length: 3 }, () => plans[0])
		: [];

	return (
		<div
			id='floor-plans'
			className='space-y-2 lg:space-y-4 scroll-mt-5.5 lg:scroll-mt-[7rem] 3xl:scroll-mt-10'
		>
			<HeadingWithOverline
				flexed
				overline={overline}
				heading={heading}
				body={subheadline}
			/>
			<Stagger
				className='grid gap-x-1 gap-y-1.5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-1.5 lg:gap-y-3'
				amount={0.1}
			>
				{plans.map((plan, i) => (
					<StaggerItem key={`${plan._id}-${i}`}>
						<Link
							href={`/floor-plans/${plan.slug}`}
							className='block'
							data-event={`Floor Plan Card - ${plan.name} CTA`}
						>
							<FloorPlanCard data={plan} />
						</Link>
					</StaggerItem>
				))}
			</Stagger>
		</div>
	);
};

export default FeaturedPlans;
