import { Text } from '@/components/atoms/text/Text';
import styles from './BreadCrumbs.module.scss';
import clsx from 'clsx';
import React from 'react';

function BreadCrumbs({ data }) {
	return (
		<nav className={clsx(styles.breadcrumbs)}>
			{data.map((name, idx) => {
				return (
					<React.Fragment key={idx}>
						<Text tag={'em'}>{name}</Text>
						<span>/</span>
					</React.Fragment>
				);
			})}
		</nav>
	);
}

export default BreadCrumbs;
