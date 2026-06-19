import { notFound } from 'next/navigation'

import { fetchContent as fc } from '@/utils/cms/fetchContent'
import { buildPageMetadata as BPM } from '@/utils/seo/buildPageMetadata'
// import { FETCH_FLOOR_PLAN_QUERY as Q } from '@/data/queries/pages/FETCH_FLOOR_PLAN_QUERY'
import { FETCH_FLOOR_PLAN_QUERY as Q } from '@/data/queries/floor-plans/FETCH_FLOOR_PLAN_QUERY'
import { FETCH_FLOOR_PLAN_SLUGS_QUERY as SLUGS_Q } from '@/data/queries/floor-plans/FETCH_FLOOR_PLANS_SLUGS_QUERY'

import PageContainer from '@/components/animations/PageContainer'

export async function generateStaticParams() {
	const slugs = await fc(SLUGS_Q)

	return (slugs || []).map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }) {
	const { slug } = await params

	return await BPM({ slug: `/floor-plans/${slug}`, query: Q, params: { slug } })
}

const FloorPlan = async ({ params }) => {
	const { slug } = await params

	const data = await fc(Q, { slug })

	if (!data) notFound()

	return (
		<PageContainer>
			<div className="h-[80vh] grid place-items-center">
				<div>{data?.name}</div>
			</div>
		</PageContainer>
	)
}

export default FloorPlan

export const revalidate = 10