export const FETCH_FLOOR_PLAN_NAMES_QUERY = `
  *[_type == "floorPlan"] | order(sortOrder asc) {
    name
  }
`;