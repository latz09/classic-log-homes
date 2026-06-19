import HeadingWithOverline from '@/components/ui/HeadingWithOverline';
import FloorPlanCard from '../shared/FloorPlanCard';

const FeaturedPlans = ({ data }) => {
	const { overline, heading, subheadline, plans } = data;

	// TEMP — preview only: repeat the single plan to 6 cards. Remove before ship.
	const previewPlans = plans?.length
		? Array.from({ length: 3 }, () => plans[0])
		: [];

	return (
		<div className='space-y-2 lg:space-y-4'>
			<HeadingWithOverline
				flexed
				overline={overline}
				heading={heading}
				body={subheadline}
			/>
			<div className='grid gap-x-1 gap-y-1.5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-1.5 lg:gap-y-3'>
				{previewPlans.map((plan, i) => (
					<FloorPlanCard key={`${plan._id}-${i}`} data={plan} />
				))}
			</div>
		</div>
	);
};

export default FeaturedPlans;