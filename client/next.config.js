module.exports = {
	reactStrictMode: true,
	async rewrites() {
		return [
			{
				source: '/graphql/:slug*',
				destination: `http://graphql:5433/graphql/:slug*`
			},
			{
				source: '/graphiql/:slug*',
				destination: `http://graphql:5433/:slug*`
			}
		]
	}
};
