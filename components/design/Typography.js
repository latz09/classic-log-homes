export const Typography = () => {
	return (
		<div className='max-w-5xl mx-auto px-2 py-4 space-y-3'>
			<div className='border-b border-dark/20 pb-2'>
				<p className='text-[0.75rem] font-semibold uppercase tracking-[0.05em] text-dark/50 mb-1'>
					H1
				</p>
				<h1>Wisconsin-made</h1>
			</div>

			<div className='border-b border-dark/20 pb-2'>
				<p className='text-[0.75rem] font-semibold uppercase tracking-[0.05em] text-dark/50 mb-1'>
					H2
				</p>
				<h2>Heading 2</h2>
			</div>

			<div className='border-b border-dark/20 pb-2'>
				<p className='text-[0.75rem] font-semibold uppercase tracking-[0.05em] text-dark/50 mb-1'>
					H3
				</p>
				<h3>Heading 3</h3>
			</div>

			<div className='border-b border-dark/20 pb-2'>
				<p className='text-[0.75rem] font-semibold uppercase tracking-[0.05em] text-dark/50 mb-1'>
					H4
				</p>
				<h4>Heading 4</h4>
			</div>

			<div className='border-b border-dark/20 pb-2'>
				<p className='text-[0.75rem] font-semibold uppercase tracking-[0.05em] text-dark/50 mb-1'>
					H5
				</p>
				<h5>Heading 5</h5>
			</div>

			<div className='border-b border-dark/20 pb-2'>
				<p className='text-[0.75rem] font-semibold uppercase tracking-[0.05em] text-dark/50 mb-1'>
					H6
				</p>
				<h6>Heading 6</h6>
			</div>

			<div className='border-b border-dark/20 pb-2'>
				<p className='text-[0.75rem] font-semibold uppercase tracking-[0.05em] text-dark/50 mb-1'>
					Overline
				</p>
				<p className='text-overline'>OVERLINE TEXT</p>
			</div>

			<div className='border-b border-dark/20 pb-2'>
				<p className='text-[0.75rem] font-semibold uppercase tracking-[0.05em] text-dark/50 mb-1'>
					Caption / paragraph -sm
				</p>
				<p className='text-paragraph-sm'>
					This is caption text for small details
				</p>
			</div>

			<div className='border-b border-dark/20 pb-2'>
				<p className='text-[0.75rem] font-semibold uppercase tracking-[0.05em] text-dark/50 mb-1'>
					Paragraph Default
				</p>
				<p className='text-paragraph'>
					This is body text for longer paragraphs and general content. It is
					designed for readability and comfortable reading at various screen
					sizes.
				</p>
			</div>

			<div className='border-b border-dark/20 pb-2'>
				<p className='text-[0.75rem] font-semibold uppercase tracking-[0.05em] text-dark/50 mb-1'>
					Subheading / paragraph -lg
				</p>
				<p className='text-paragraph-lg'>
					This is subheading text for larger details
				</p>
			</div>

			<div className='pb-2'>
				<p className='text-[0.75rem] font-semibold uppercase tracking-[0.05em] text-dark/50 mb-1'>
					Button Text
				</p>
				<p className='text-button'>BUTTON TEXT</p>
			</div>
		</div>
	);
};
