import clsx from 'clsx';
import styles from './text.module.scss';
import React, { useState } from 'react';
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

export default function Text({ children, url, tagName = 'p', styleType, className, isOn = false, onClick, data, idx }) {
	console.log(isOn);
	return React.createElement(
		tagName,
		{
			onClick: e => onClick({ e, idx, data }), //props로 전달받은 호출(이때만들어진 e객체를 함수 전달)
			className: clsx(styles.text, nanum.variable, orbitron.variable, styles[styleType], className, isOn && styles.on)
		},
		url ? React.createElement(Link, { href: url }, children) : children
	);
}
