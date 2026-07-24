'use client';

import Stagger, { StaggerItem } from '@/components/animations/Stagger';

import {
	SqFtIcon,
	BedIcon,
	BathIcon,
	StoriesIcon,
	DimensionsIcon,
} from '@/components/ui/PlanSpecIcons';

const SpecItem = ({ icon, value }) => (
	<div className='grid gap-0.75 border-l pl-0.75 lg:pl-1.5'>
		{icon}
		<span className='text-paragraph-lg'>{value}</span>
	</div>
);

const Specs = ({ data }) => {
	const { squareFeet, bedrooms, bathrooms, stories, dimensions } = data;

	const specItems = [
		{ icon: <SqFtIcon />, value: `${squareFeet} sq ft` },
		{ icon: <BedIcon />, value: `${bedrooms} bed` },
		{ icon: <BathIcon />, value: `${bathrooms} bath` },
		{
			icon: <StoriesIcon />,
			value: `${stories} ${Number(stories) === 1 ? 'story' : 'stories'}`,
		},
		{ icon: <DimensionsIcon />, value: dimensions },
	];

	return (
		<Stagger
			className='grid grid-cols-3 lg:grid-cols-5 gap-1.5 lg:gap-x-3 gap-y-0.75 lg:gap-y-1.5 mt-2.5 lg:mt-3 mb-2 lg:mb-4 lg:pr-1.5'
			stagger={0.03}
			delayChildren={0.12}
		>
			{specItems.map((spec, i) => (
				<StaggerItem key={i} y={12}>
					<SpecItem icon={spec.icon} value={spec.value} />
				</StaggerItem>
			))}
		</Stagger>
	);
};

export default Specs;
