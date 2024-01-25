import clsx from 'clsx';
import styles from './breadcrumb.module.scss';
import Text from '@/components/atoms/text/Text';
import React from 'react';
import { useRouter } from 'next/router';

export default function Breadcrumb({ divider = '/' }) {
	const router = useRouter();
	const pathArr = router.asPath.split('/');
	// path 값에서 만약 쿼리스트링 값이 있으면, 해당 쿼리의 name값만 따로 추출하여, 이 name값을 recipeName에 담아줌.
	const { name: recipeName } = router.query;

	// 변환할 문자원본 (txt) 과 제거할 특수문자 (spc)를 인수로 받아서, 특수문자를 제거한 뒤 Capitalize하여 반환하는 함수 (화면에 출력될 메뉴 카테고리명에 활용)

	// 기존에 만들어뒀던 useText 커스텀 훅을 사용하지 않는 이유 : atomic pattern에서는 커스텀 훅을 사용해야 할 경우 부분 컴포넌트가 아닌, 페이지 컴포넌트에서만 활용하는 것이 바람직함.
	const customText = (txt, spc) => {
		txt = txt.includes(spc)
			? txt
					.split(spc)
					.map(el => el.charAt(0).toUpperCase() + el.slice(1))
					.join(' ')
			: txt;
		return txt;
	};

	return (
		<nav className={clsx(styles.breadcrumb)}>
			{pathArr.map((name, idx) => {
				// name 자체를 바꿔버리면 라우터 경로에도 문제가 생겨서, name값 자체는 변화를 주지 않고
				// 화면에 출력될 이름 글자 자체만 displayName으로 따로 정의해서 디스플레이용으로 사용.
				// (해당 값은 디스플레이 출력 용도로만 활용하고, 값이 바뀌는 것이므로 연산하는 로직에는 활용하면 안 됨.)
				const displayName = customText(name, '-');
				if (idx === pathArr.length - 1) {
					return (
						<Text key={idx} tagName={'strong'} isOn>
							{/* 마지막 path 경로일 때, recipeName 이라는 값이 query 값이 있으면 해당 값을 breancrumb에 출력. 없으면 그냥 마지막 path 경로명 출력. */}
							{recipeName ? recipeName : displayName}
						</Text>
					);
				} else {
					return (
						<React.Fragment key={idx}>
							<Text tagName={'em'} url={'/' + name}>
								{name === '' ? 'Home' : displayName}
							</Text>
							<span> {divider} </span>
						</React.Fragment>
					);
				}
			})}
		</nav>
	);
}
