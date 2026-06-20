const PackageBox = ({ title, items = [], footnote, className = '' }) => {
	return (
		<div className={`space-y-0.75 lg:space-y-1.5 p-1.25 lg:p-2.5 rounded border ${className}`}>
			<h5 className='' /* title styles */>{title}</h5>

			<ul className='space-y-0.5 lg:space-y-0.75' /* list gap */>
				{items.map((item, i) => (
					<li key={i} className='flex items-center gap-0.5 lg:gap-1'>
						<span className='size-0.25 shrink-0 rounded-full bg-white' />
						<p className='text-paragraph'>{item}</p>
					</li>
				))}
			</ul>

			{footnote && (
				<p className='text-paragraph-sm' /* footnote styles */>{footnote}</p>
			)}
		</div>
	);
};

export default PackageBox;