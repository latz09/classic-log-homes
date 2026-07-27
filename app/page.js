import { fetchContent as fc } from '@/utils/cms/fetchContent';
import { buildPageMetadata as BPM } from '@/utils/seo/buildPageMetadata';
import { FETCH_HOME_PAGE_QUERY as Q } from '@/data/queries/pages/FETCH_HOME_PAGE_QUERY';

import PageContainer from '@/components/animations/PageContainer';

import NavigationContainer from '@/components/layout/navigation/NavigationContainer';
import LandingHero from '@/components/sections/home-page/LandingHero';
import Pillars from '@/components/sections/home-page/Pillars';
import WhatYourBuying from '@/components/sections/home-page/WhatYourBuying';
import FeaturedPlans from '@/components/sections/home-page/FeaturedPlans';
import Process from '@/components/sections/home-page/Process';
import Support from '@/components/sections/home-page/Support';
import Reviews from '@/components/sections/shared/Reviews';
import ContactSection from '@/components/sections/shared/ContactSection';
import MillWork from '@/components/sections/home-page/MillWork';
import LandingHeroMobile from '@/components/sections/home-page/LandingHeroMobile';
import Reveal from '@/components/animations/Reveal';

export async function generateMetadata() {
	return await BPM({ slug: '/', query: Q });
}

export default async function Home() {
	const data = await fc(Q);
	const {
		hero,
		pillars,
		whatYoureBuying,
		process,
		support,
		reviews,
		contact,
	} = data;

	const featuredPlans = {
		...data.featuredPlans,
		plans: (data.featuredPlans?.plans || []).map((plan) => ({
			...plan,
			startingPrice: plan.startingPrice?.trim() || null,
		})),
	};

	return (
		<>
			<NavigationContainer />

			<PageContainer>
				{/* Hero stays unwrapped — it's your LCP element. */}
				<div className='hidden lg:block'>
					<LandingHero data={hero} />
				</div>

				<div className='lg:hidden'>
					<LandingHeroMobile data={hero} />
				</div>

				<div className='max-container relative z-20 -mt-[5vh] 3xl:-mt-[5vh] space-y-5 lg:space-y-10'>
					<Reveal>
						<Pillars data={pillars} />
					</Reveal>

					<Reveal>
						<WhatYourBuying data={whatYoureBuying} />
					</Reveal>

					<div>
						<FeaturedPlans data={featuredPlans} />
					</div>

					<div >
						<Process
							overline={process.overline}
							heading={process.heading}
							steps={process.steps}
						/>
					</div>

					<Reveal amount={0.1} y={28} duration={0.7}>
						<MillWork
							image={process.millImage}
							overline={process.builtOverline}
							heading={process.builtHeading}
							body={process.builtBody}
						/>
					</Reveal>

					<Reveal>
						<Support data={support} />
					</Reveal>

					<Reveal amount={0.1}>
						<Reviews data={reviews} />
					</Reveal>

					<Reveal amount={0.1}>
						<ContactSection data={contact} />
					</Reveal>
				</div>
			</PageContainer>
		</>
	);
}

export const revalidate = 10;
