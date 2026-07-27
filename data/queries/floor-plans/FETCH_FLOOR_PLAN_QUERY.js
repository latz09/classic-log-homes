export const FETCH_FLOOR_PLAN_QUERY = `*[_type == "floorPlan" && slug.current == $slug][0]{
  _id,
  name,
  "slug": slug.current,
  category,
  "startingPrice": select(
    startingPrice match "*[0-9a-zA-Z]*" => startingPrice,
    null
  ),
  shortDescription,
  heroIntro,
  specs{
    squareFeet,
    bedrooms,
    bathrooms,
    stories,
    dimensions,
    wallHeight
  },
  heroImage{
    asset->{url},
    hotspot
  },
  renderings[]{
    asset->{url},
    hotspot
  },
  blueprintImages[]{
    image{
      asset->{url},
      hotspot
    },
    caption
  },
  about,
  keyFeatures,
  packageIncluded,
  packageNotIncluded,
  packageFootnote,
  walkaroundUrl,
  "contact": *[_type == "homePage" && _id == "homePage"][0].contact{
    overline,
    heading,
    body,
    phone,
    availability,
    formHeading,
    formNote
  },
  seo{
    title,
    description,
    keywords,
    "ogImage": ogImage.asset->url,
    noIndex
  }
}`