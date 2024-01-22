import clsx from 'clsx';
import styles from './text.module.scss';
import React from 'react';

export default function Text({ tagName = 'p', children }) {
	/*
    [ JSX를 반환하는 리액트 내장 메서드 ]
      React.createElement(elementType: string, props: object, children: JSX Node)
  */
	// return <h1 className={clsx(styles.text)}>{children}</h1>;
	return React.createElement(tagName, { className: clsx(styles.text) }, children);
}
