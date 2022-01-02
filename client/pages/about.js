import * as React from 'react';
import Head from 'next/head';
import { useQuery, gql } from '@apollo/client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import NoSsr from '@mui/base/NoSsr';
import Typography from '@mui/material/Typography';

import Link from '../components/link';

const QUERY = gql`
	query listAllWidgets {
		widgets {
			nodes {
				nodeId
				id
				name
				description
			}
		}
	}
`;

export default function Index() {
	const { data, loading, error } = useQuery(QUERY);
	const widgets = data?.widgets?.nodes || [];

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
					{loading && <Typography>Loading widgets...</Typography>}
					{error && <Typography>Error loading wigets.</Typography>}
					{!loading && !error && (
						<>
							<Typography>Widgets loaded from GraphQL API:</Typography>
							<List>
								{widgets.map(widget => (
									<ListItem key={widget.nodeId}>
										<ListItemText primary={widget.name} secondary={widget.description}/>
									</ListItem>
								))}
							</List>
						</>
					)}
					<Link href="/" color="secondary">
						Go to the home page
					</Link>
				</Box>
			</Container>
		</>
	);
};
