import HeadingWithOverline from '@/components/ui/HeadingWithOverline';
import PackageBox from '@/components/ui/PackageBox';

const Details = ({
	name,
	overline,
	body,
	packageIncluded,
	packageNotIncluded,
	packageFootnote,
}) => {
	return (
		<div className='space-y-1.5 lg:space-y-3'>
			<HeadingWithOverline
				heading={`What's included in the ${name}`}
				overline={overline}
				body={body}
				flexed
				bodyAlign='end'
			/>

			{/* two-column wrapper — set grid/gap here */}
			<div className='grid lg:grid-cols-2 gap-1 lg:gap-2'>
				<PackageBox
					className='bg-white/10'
					title='Included in your package'
					items={packageIncluded}
					footnote={packageFootnote}
				/>
				<PackageBox
					className='bg-white/0'
					title='Not included (what you source locally)'
					items={packageNotIncluded}
				/>
			</div>
		</div>
	);
};

export default Details;
