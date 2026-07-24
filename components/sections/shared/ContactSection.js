
import { fetchContent as fc } from '@/utils/cms/fetchContent';
import { FETCH_FLOOR_PLAN_NAMES_QUERY as PLANS_Q } from '@/data/queries/floor-plans/FETCH_FLOOR_PLAN_NAMES_QUERY';

import HeadingWithOverline from '@/components/ui/HeadingWithOverline';
import SubmitContactForm from '../contact/SubmitContactForm';

const ContactSection = async ({ data, currentPlanName }) => {
	const {
		overline,
		heading,
		body,
		phone,
		availability,
		formHeading,
		formNote,
	} = data;

	const floorPlans = (await fc(PLANS_Q)) || [];
	const floorPlanOptions = [
		...floorPlans.map((plan) => plan.name),
		'Not sure yet',
	];

	return (
		<div
			id='contact'
			className='grid lg:grid-cols-2 gap-1.75 lg:gap-3.5 scroll-mt-5.5 lg:scroll-mt-[7rem] 3xl:scroll-mt-10'
		>
			<div>
				<HeadingWithOverline
					overline={overline}
					heading={heading}
					body={body}
				/>
				<div>
					<p className='text-paragraph-lg mt-1.25 lg:mt-2.5 mb-0.5 lg:mb-1'>
						<a href={`sms:${phone}`} className='text-gold hover:underline'>
							Text
						</a>
						{' or '}
						<a href={`tel:${phone}`} className='hover:underline'>
							call
						</a>
						{' at: '}
						<a href={`sms:${phone}`} className='text-gold hover:underline'>
							{phone}
						</a>
					</p>
					<p className='text-paragraph'>{availability}</p>
				</div>
			</div>
			<div className='bg-white p-1.25 lg:p-2.25 rounded-lg text-black'>
				<SubmitContactForm
					formHeading={formHeading}
					formNote={formNote}
					floorPlanOptions={floorPlanOptions}
					currentPlanName={currentPlanName}
				/>
			</div>
		</div>
	);
};

export default ContactSection;
