import ButtonLink from '@/components/ui/ButtonLink';

const AboutThePlan = ({ data, walkAroundURL }) => {
	const {} = data;
	console.log(walkAroundURL);
	return (
		<div className='grid lg:grid-cols-2 gap-1.75 lg:gap-3.5'>
			<div>
				<p className='text-overline text-gold pb-0.5 lg:pb-1'>About</p>
				<h2 className=''>About this plan</h2>
                {walkAroundURL && (
				<ButtonLink external href={walkAroundURL} variant='primary-on-dark' className="mt-1.25 lg:mt-2.5">
					Open 3D walkaround
				</ButtonLink>
                )}
			</div>
            <div className="space-y-0.5 lg:space-y-1.25">
                {data.map((paragraph, i) => (
                    <p key={i} className='text-paragraph-lg'>
                        {paragraph}
                    </p>
                ))}
            </div>
		</div>
	);
};

export default AboutThePlan;
