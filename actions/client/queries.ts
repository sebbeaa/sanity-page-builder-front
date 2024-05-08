export const homePageQuery = `*[_type == "home"][0]`;
export const pagesBySlugQuery = `*[_type == "page" && slug.current == $slug][0]`;
export const settingsQuery = `*[_type == "settings"][0]`;
