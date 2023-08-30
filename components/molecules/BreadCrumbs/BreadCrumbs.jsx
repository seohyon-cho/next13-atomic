import { Text } from '@/components/atoms/text/Text';
import styles from './BreadCrumbs.module.scss';
import clsx from 'clsx';
import React from 'react';

function BreadCrumbs({ data }) {
	return (
		<nav className={clsx(styles.breadcrumbs)}>
			{data.map((name, idx) => {
				//문자값에 '-'있을때 처리
				const result = name.includes('-')
					? name
							.split('-')
							.map((txt) => txt.charAt(0).toUpperCase() + txt.slice(1))
							.join(' ')
					: name;

				//문자값에 '=' 있을때 처리
				const result2 = result.includes('=')
					? result.split('=')[1].replaceAll('%20', ' ')
					: result;

				//마지막 메뉴가 아닐때
				if (idx !== data.length - 1) {
					return (
						<React.Fragment key={idx}>
							<Text tag={'em'} url={`/${name}`}>
								{!result ? 'Home' : result}
							</Text>
							<span> / </span>
						</React.Fragment>
					);
					//마지막 메뉴일때
				} else {
					return (
						<Text key={idx} tag={'strong'}>
							{result2}
						</Text>
					);
				}
			})}
		</nav>
	);
}

export default BreadCrumbs;
