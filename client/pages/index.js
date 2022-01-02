import Head from 'next/head';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Link from 'components/link';

export default function Index() {
	return (
		<>
			<Head>
				<title>Home - eve</title>
			</Head>
			<Container maxWidth="sm">
				<Box sx={{ my: 4 }}>
					<Typography variant="h4" component="h1" gutterBottom>
						Next.js example: Home
					</Typography>
					<Link href="/about" color="secondary">
						Go to the about page
					</Link>
				</Box>
			</Container>
		</>
	);
}
