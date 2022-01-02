module.exports = {
	reactStrictMode: true,
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
		]
	}
};
