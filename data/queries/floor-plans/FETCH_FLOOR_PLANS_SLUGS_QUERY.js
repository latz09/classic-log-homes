export const FETCH_FLOOR_PLAN_SLUGS_QUERY = `*[_type == "floorPlan" && defined(slug.current)]{
  "slug": slug.current
}`