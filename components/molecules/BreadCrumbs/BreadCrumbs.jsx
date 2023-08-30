import { Text } from '@/components/atoms/text/Text';
import styles from './BreadCrumbs.module.scss';
import clsx from 'clsx';
import React from 'react';

function BreadCrumbs({ data }) {
	return (
		<nav className={clsx(styles.breadcrumbs)}>
			{data.map((name, idx) => {
				//현재 반복되는 메뉴 순번이 마지막이 아닐떄
				//뒤에 슬러시 붙이고 링크 추가
				if (idx !== data.length - 1) {
					return (
						<React.Fragment key={idx}>
							<Text tag={'em'} url={`/${name}`}>
								{name}
							</Text>
							<span> / </span>
						</React.Fragment>
					);
					//마지막 순번이면 글자만 생성
				} else {
					return (
						<Text key={idx} tag={'strong'}>
							{name}
						</Text>
					);
				}
			})}
		</nav>
	);
}

export default BreadCrumbs;
