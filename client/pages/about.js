import * as React from 'react';
import Head from 'next/head';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Link from '../components/link';

export default function Index() {
	return (
		<>
			<Head>
				<title>About - eve</title>
			</Head>
			<Container maxWidth="sm">
				<Box sx={{ my: 4 }}>
					<Typography variant="h4" component="h1" gutterBottom>
						Next.js example: About
					</Typography>
					<Link href="/" color="secondary">
						Go to the home page
					</Link>
				</Box>
			</Container>
		</>
	);
};
