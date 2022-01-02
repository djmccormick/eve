import Head from 'next/head';
import PropTypes from 'prop-types';
import { ApolloProvider } from "@apollo/client";

import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import createCache from '@emotion/cache';

import theme from '../theme';
import apolloClient from '../apollo-client';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createCache({ key: 'css', prepend: true });

export default function CustomApp(props) {
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

	return (
		<ApolloProvider client={apolloClient}>
			<CacheProvider value={emotionCache}>
				<Head>
					<meta name="viewport" content="initial-scale=1, width=device-width" />
				</Head>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Component {...pageProps} />
				</ThemeProvider>
			</CacheProvider>
		</ApolloProvider>
	);
};

CustomApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	emotionCache: PropTypes.object,
	pageProps: PropTypes.object.isRequired
};
