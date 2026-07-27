const TopHeading = ({ name, startingPrice, heroIntro }) => {
	const hasPrice = startingPrice?.trim();

	return (
		<div className='grid lg:grid-cols-2 gap-1.5 lg:gap-6 xl:gap-8'>
			<h1>{name}</h1>
			<div className="space-y-0.75 lg:space-y-1">
				<p className='text-paragraph-lg'>{heroIntro}</p>
				{hasPrice && (
					<p className='text-paragraph-lg text-gold'>Starting at {startingPrice}</p>
				)}
			</div>
		</div>
	);
};

export default TopHeading;