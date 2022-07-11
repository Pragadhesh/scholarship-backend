export const Options = {
	routePrefix: '/docs',
	exposeRoute: true,
	swagger: {
		info: {
			title: 'Course Planner API',
			description: 'Backend for Course Planner',
			version: '1.0.0',
		},
		externalDocs: {
			url: 'https://swagger.io',
			description: 'Find more info here',
		},
		host: 'localhost:3000',
		schemes: ['http'],
		consumes: ['application/json'],
		produces: ['application/json'],
	},
};
