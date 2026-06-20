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


export async function generateMetadata() {
	return await BPM({ slug: '/', query: Q });
}

export default async function Home() {
	const data = await fc(Q);
	const {
		hero,
		pillars,
		whatYoureBuying,
		featuredPlans,
		process,
		support,
		reviews,
		contact,
	} = data;
	return (
		<PageContainer>
		
			<div className='hidden lg:block'>
				<LandingHero data={hero}>
					<NavigationContainer />
				</LandingHero>
			</div>

			{/* below lg — stacked 50/50 hero */}
			<div className='lg:hidden'>
				<LandingHeroMobile data={hero}>
					<NavigationContainer />
				</LandingHeroMobile>
			</div>

			{/* Pull the pillars up onto the hero's bottom apron */}
			<div className='max-container relative z-20 -mt-[5vh] 3xl:-mt-[5vh] space-y-5 lg:space-y-10'>
				<Pillars data={pillars} />
				<WhatYourBuying data={whatYoureBuying} />
				<FeaturedPlans data={featuredPlans} />
				<Process
					overline={process.overline}
					heading={process.heading}
					steps={process.steps}
				/>
				<MillWork
					image={process.millImage}
					overline={process.builtOverline}
					heading={process.builtHeading}
					body={process.builtBody}
				/>
				<Support data={support} />
				<Reviews data={reviews} />
				<ContactSection data={contact} />
			</div>
		</PageContainer>
	);
}

export const revalidate = 10;
