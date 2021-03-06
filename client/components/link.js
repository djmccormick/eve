import NextLink from 'next/link';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { forwardRef } from 'react';
import { useRouter } from 'next/router';
import { omit } from 'lodash';

import MuiLink from '@mui/material/Link';
import { styled } from '@mui/material/styles';

// Add support for the sx prop for consistency with the other branches.
const Anchor = styled('a')({});

export const NextLinkComposed = forwardRef(function NextLinkComposed(props, ref) {
	const { to, linkAs, replace, scroll, shallow, prefetch, locale, ...remainingProps } = props;
	const other = omit(remainingProps, ['href']);

	return (
		<NextLink
			href={to}
			prefetch={prefetch}
			as={linkAs}
			replace={replace}
			scroll={scroll}
			shallow={shallow}
			passHref
			locale={locale}
		>
			<Anchor ref={ref} {...other} />
		</NextLink>
	);
});

NextLinkComposed.propTypes = {
	href: PropTypes.any,
	linkAs: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	locale: PropTypes.string,
	passHref: PropTypes.bool,
	prefetch: PropTypes.bool,
	replace: PropTypes.bool,
	scroll: PropTypes.bool,
	shallow: PropTypes.bool,
	to: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired
};

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/api-reference/next/link
const Link = forwardRef(function Link(props, ref) {
	const {
		activeClassName = 'active',
		as: linkAs,
		className: classNameProps,
		href,
		noLinkStyle,
		...remainingProps
	} = props;

	// Link don't have roles.
	const other = omit(remainingProps, ['role']);

	const router = useRouter();
	const pathname = typeof href === 'string' ? href : href.pathname;
	const className = clsx(classNameProps, {
		[activeClassName]: router.pathname === pathname && activeClassName
	});

	const isExternal =
		typeof href === 'string' && (href.indexOf('http') === 0 || href.indexOf('mailto:') === 0);

	if (isExternal) {
		if (noLinkStyle) {
			return <Anchor className={className} href={href} ref={ref} {...other} />;
		}

		return <MuiLink className={className} href={href} ref={ref} {...other} />;
	}

	if (noLinkStyle) {
		return <NextLinkComposed className={className} ref={ref} to={href} {...other} />;
	}

	return (
		<MuiLink
			component={NextLinkComposed}
			linkAs={linkAs}
			className={className}
			ref={ref}
			to={href}
			{...other}
		/>
	);
});

Link.propTypes = {
	activeClassName: PropTypes.string,
	as: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	className: PropTypes.string,
	href: PropTypes.any,
	linkAs: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	noLinkStyle: PropTypes.bool,
	role: PropTypes.string
};

export default Link;
