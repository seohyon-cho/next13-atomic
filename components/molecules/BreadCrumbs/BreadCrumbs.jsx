import { Text } from '@/components/atoms/text/Text';
import styles from './BreadCrumbs.module.scss';
import clsx from 'clsx';
import React from 'react';

function BreadCrumbs({ data }) {
	return (
		<nav className={clsx(styles.breadcrumbs)}>
			{data.map((name, idx) => {
				//result = -로 연결되어 있는 문자값을 빈칸으로 치환하고 각 단어의 앞글자만 대문자로 리턴
				//find-recipe = Find Recipe
				const result = name.includes('-')
					? name
							// -으로 문자열 분리
							.split('-')
							//분리된 문자열을 다시 첫번째만 잘라서 대문자 변경 + 첫문자만 제외한 나머지 문자값 반환해서 하나로 붙이기
							.map((txt) => txt.charAt(0).toUpperCase() + txt.slice(1))
							.join(' ')
					: name;

				//마지막 배열 문자값이 아닐때
				if (idx !== data.length - 1) {
					return (
						<React.Fragment key={idx}>
							{/* 텍스트가 없을떄 home으로 치환 있으면 위에서 가공한 result적용 */}
							<Text tag={'em'} url={`/${name}`}>
								{!name ? 'Home' : result}
							</Text>
							<span> / </span>
						</React.Fragment>
					);
					//현재 배열 마지막 문자값이면
				} else {
					return (
						<Text key={idx} tag={'strong'}>
							{/* 가공된 result을 바로 활용해서 해당 result값에서 =있으면 가공처리 없으면 그냥 result값 활용 */}
							{result.includes('=')
								? result.split('=')[1].replaceAll('%20', ' ')
								: result}
						</Text>
					);
				}
			})}
		</nav>
	);
}

export default BreadCrumbs;
