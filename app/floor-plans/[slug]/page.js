import { notFound } from 'next/navigation';

import { fetchContent as fc } from '@/utils/cms/fetchContent';
import { buildPageMetadata as BPM } from '@/utils/seo/buildPageMetadata';
// import { FETCH_FLOOR_PLAN_QUERY as Q } from '@/data/queries/pages/FETCH_FLOOR_PLAN_QUERY'
import { FETCH_FLOOR_PLAN_QUERY as Q } from '@/data/queries/floor-plans/FETCH_FLOOR_PLAN_QUERY';
import { FETCH_FLOOR_PLAN_SLUGS_QUERY as SLUGS_Q } from '@/data/queries/floor-plans/FETCH_FLOOR_PLANS_SLUGS_QUERY';

import PageContainer from '@/components/animations/PageContainer';
import TopHeading from '@/components/sections/cabin-plans/TopHeading';
import NavigationContainer from '@/components/layout/navigation/NavigationContainer';
import Specs from '@/components/sections/cabin-plans/Specs';
import MainGallery from '@/components/sections/cabin-plans/MainGallery';
import AboutThePlan from '@/components/sections/cabin-plans/AboutThePlan';
import FeaturesAndPrintsContainer from '@/components/sections/cabin-plans/FeaturesAndPrintsContainer';
import Details from '@/components/sections/cabin-plans/Details';
import ContactSection from '@/components/sections/shared/ContactSection';

export async function generateStaticParams() {
	const slugs = await fc(SLUGS_Q);

	return (slugs || []).map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
	const { slug } = await params;

	return await BPM({
		slug: `/floor-plans/${slug}`,
		query: Q,
		params: { slug },
	});
}

const FloorPlan = async ({ params }) => {
	const { slug } = await params;

	const data = await fc(Q, { slug });

	if (!data) notFound();

	return (
		<PageContainer>
			<NavigationContainer />
			<div className='max-container pt-6 lg:pt-10 3xl:pt-12'>
				<TopHeading
					name={data.name}
					startingPrice={data.startingPrice}
					heroIntro={data.heroIntro}
				/>
				<Specs data={data.specs} />
				<MainGallery
					heroImage={data.heroImage}
					additionalImages={data.renderings}
				/>
			</div>
			<div className='max-container space-y-5 lg:space-y-10 mt-5 lg:mt-10'>
				<AboutThePlan data={data.about} walkAroundURL={data.walkaroundUrl} />
				<FeaturesAndPrintsContainer
					keyFeatures={data.keyFeatures}
					bluePrintImages={data.blueprintImages}
				/>
				<Details
					name={data.name}
					overline='Details'
					body={`The ${data.startingPrice} starting price covers the log package. Here's what's included and what you'll source locally.`}
					packageIncluded={data.packageIncluded}
					packageNotIncluded={data.packageNotIncluded}
					packageFootnote={data.packageFootnote}
				/>
				<ContactSection data={data.contact} currentPlanName={data.name} />
			</div>
		</PageContainer>
	);
};

export default FloorPlan;

export const revalidate = 10;
