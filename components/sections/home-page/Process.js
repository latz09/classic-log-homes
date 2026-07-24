import Stagger, { StaggerItem } from '@/components/animations/Stagger';
import HeadingWithOverline from '@/components/ui/HeadingWithOverline';

const Process = ({ overline, heading, steps }) => {
	return (
		<div
			id='how-it-works'
			className='space-y-2 lg:space-y-4 scroll-mt-5.5 lg:scroll-mt-[7rem] 3xl:scroll-mt-10'
		>
			<HeadingWithOverline centered overline={overline} heading={heading} />
			<Stagger
				className='grid sm:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-2.25'
				stagger={0.1}
				amount={0.15}
			>
				{steps.map((step, index) => (
					<StaggerItem key={index}>
						<p className='text-overline text-gold normal-case'>
							{`Step 0${index + 1}`}
						</p>
						<h4 className='mt-0.75 lg:mt-1 mb-0.75 lg:mb-1.25'>{step.title}</h4>
						<p className='text-paragraph'>{step.description}</p>
					</StaggerItem>
				))}
			</Stagger>
		</div>
	);
};

export default Process;
