import Head from 'next/head'

export default function Home() {
	return (
		<div>
			<Head>
				<title>Client</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<h1>
					Welcome to <a href="https://nextjs.org">Next.js</a> on Docker!
				</h1>
			</main>
		</div>
	);
};
