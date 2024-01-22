import clsx from 'clsx';
import styles from './text.module.scss';
import React from 'react';
import Link from 'next/link';

export default function Text({ tagName = 'p', children, url }) {
	/*
    [ JSX를 반환하는 리액트 내장 메서드 ]
      React.createElement(elementType: string, props: object, children: JSX Node)
  */
	// return <h1 className={clsx(styles.text)}>{children}</h1>;

	// url props가 있으면, React.createElement로 Link 컴포넌트로 props 값 설정한 뒤에 children을 감싸서 리턴하도록 하고, 없으면 그냥 children 값만 그대로 리턴.
	return React.createElement(tagName, { className: clsx(styles.text) }, url ? React.createElement(Link, { href: url }, children) : children);
}
