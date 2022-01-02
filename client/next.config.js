module.exports = {
	reactStrictMode: true,
	eslint: {
		// We run eslint from the root of the project instead
		ignoreDuringBuilds: true
	},
	async rewrites() {
		return [
			{
				source: '/graphql/:slug*',
				destination: `${process.env.GRAPHQL_URL}/graphql/:slug*`
			},
			{
				source: '/graphiql/:slug*',
				destination: `${process.env.GRAPHQL_URL}/:slug*`
			}
		];
	}
};
