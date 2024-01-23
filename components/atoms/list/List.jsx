import clsx from 'clsx';
import styles from './list.module.scss';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function List({ tagName = 'ul', data, className, url, children, divider = ':', currentPath }) {
	// List 컴포넌트가 출력되고 있는 마지막 라우터명 추출
	const router = useRouter();

	return React.createElement(
		tagName,
		{ className: clsx(styles.list, className) },
		data.map((el, idx) => {
			const child = tagName === 'ol' ? `${idx + 1} ${divider} ${el}` : el;
			return React.createElement(
				'li',
				{
					key: idx,
					// 만약, 해당 li의 url명과, 현재 보고있는 페이지의 라우터명이 동일하면, 해당 li 활성화.
					className: clsx(router.pathname === url[idx] && styles.on),
				},
				// url값이 전달되는 것뿐만 아니라, 현재 활성화된 라우터명과 url값이 다를 경우에만 <Link> 설정 (현재 보고 있는 페이지 메뉴에 대해서는 굳이 클릭 기능을 활성화할 필요가 없기 때문에, 불필요한 prefetching을 방지하기 위함임.)
				url && currentPath !== url[idx].split('/')[1] ? React.createElement(Link, { href: url[idx] }, child) : child
			);
		})
	);
}
