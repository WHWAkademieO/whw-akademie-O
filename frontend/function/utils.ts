const SITE_URL = process.env.SITE_URL
const replacedDomain = "https://whw-development.netlify.app/"

export const urlTransform = (url: string): string => {
    return url.replace(replacedDomain, "/")
}