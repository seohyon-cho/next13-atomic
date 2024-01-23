import clsx from 'clsx';
import styles from './text.module.scss';
import React from 'react';
import Link from 'next/link';
import { Nanum_Myeongjo, Orbitron } from 'next/font/google';

const nanum = Nanum_Myeongjo({
	subsets: ['latin'],
	weight: ['400', '700'],
	preload: true,
	variable: '--font-nanum'
});

const orbitron = Orbitron({
	subsets: ['latin'],
	weight: ['400', '600'],
	preload: true,
	variable: '--font-orbitron'
});

//Text컴포넌트 입장에서 부모로부터 이벤트핸들러 전달시 (순서, fetchingData, e)
//위의 값3가지를 비구조할당을 전달 (없으면 그만, 있으면 활용)
export default function Text({ children, url, tagName = 'p', styleType, className, isOn = false, onClick, data, idx }) {
	return React.createElement(
		tagName,
		{
			className: clsx(styles.text, nanum.variable, orbitron.variable, styles[styleType], className, isOn && styles.on),
			//onClick props로 전달되는 핸들러함수에 어떤 값이 쓰일지 모르니 일단 다 연결
			//주의점: 객체로 인수를 묶는 이유- 특정 인수가 전달되지 않았을때 파라미터 순서가 변경되는 걸 방지하기 위함
			onClick: e => onClick({ e, idx, data })
		},
		url ? React.createElement(Link, { href: url }, children) : children
	);
}
