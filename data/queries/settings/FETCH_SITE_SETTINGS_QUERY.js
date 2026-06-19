export const FETCH_SITE_SETTINGS_QUERY = `*[_type == "siteSettings" && _id == "siteSettings"][0]{
  footer{
    tagline,
    copyright
  },
  contact{
    phone,
    email,
    address,
    showroomNote
  },
  freeGuides[]{
    title,
    "fileUrl": file.asset->url
  }
}`