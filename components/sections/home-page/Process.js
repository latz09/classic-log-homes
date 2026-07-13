import HeadingWithOverline from '@/components/ui/HeadingWithOverline';

const Process = ({ overline, heading, steps }) => {
	return (
		<div id='how-it-works' className="space-y-2 lg:space-y-4 scroll-mt-5.5 lg:scroll-mt-[7rem] 3xl:scroll-mt-10">
			<HeadingWithOverline centered overline={overline} heading={heading} />
			<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-2.25">
				{steps.map((step, index) => (
					<div key={index}>
						<p className="text-overline text-gold normal-case">
							{`Step 0${index + 1}`}
						</p>
						<h4 className="mt-0.75 lg:mt-1 mb-0.75 lg:mb-1.25">{step.title}</h4>
						<p className="text-paragraph">{step.description}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Process;
