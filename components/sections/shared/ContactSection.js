import HeadingWithOverline from '@/components/ui/HeadingWithOverline';

const ContactSection = ({ data }) => {
	const {
		overline,
		heading,
		body,
		phone,
		availability,
		formHeading,
		formNote,
	} = data;

	return (
		<div id='contact' className='grid lg:grid-cols-2 gap-1.75 lg:gap-3.5 scroll-mt-1.5 lg:scroll-mt-3'>
			<div>
				<HeadingWithOverline
					overline={overline}
					heading={heading}
					body={body}
				/>
				<div>
					<p className='text-paragraph-lg mt-1.25 lg:mt-2.5 mb-0.5 lg:mb-1'>
						Call Jeff at:
						<span className='text-gold'> {phone}</span>
					</p>
					<p className="text-paragraph">{availability}</p>
				</div>
			</div>
			<div className='bg-white p-1.25 lg:p-2.5 rounded-lg py-8 text-black grid place-items-center h-[32rem]'>
				Contact form
			</div>
		</div>
	);
};

export default ContactSection;
