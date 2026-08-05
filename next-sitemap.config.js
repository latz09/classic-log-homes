// next-sitemap.config.js
module.exports = {
	siteUrl: 'https://www.classicloghomes.biz/',
	generateRobotsTxt: true,
	exclude: ['/opengraph-image.jpg', '/page-4'],
	robotsTxtOptions: {
		policies: [
			{
				userAgent: '*',
				allow: '/',
				disallow: ['/opengraph-image.jpg', '/page-4'],
			},
		],
	},
};
