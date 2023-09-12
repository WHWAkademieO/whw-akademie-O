module.exports = {
    siteUrl: process.env.SITE_URL,
    trailingSlash: true,
    generateRobotsTxt: true,
    exclude: ["/server-sitemap.xml"],
    // outDir: ".next",
    robotsTxtOptions: {
        policies: [
            {
                userAgent: "*",
                disallow: ["/404"],
            },
            {userAgent: "*", allow: "/"},
        ],

        additionalSitemaps: [`${process.env.SITE_URL}/server-sitemap.xml`],
    },
};
