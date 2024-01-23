import clsx from 'clsx';
import styles from './list.module.scss';
import React from 'react';
import Link from 'next/link';

export default function List({ tagName = 'ul', data, isOn, className, url, children, divider = ':' }) {
	return React.createElement(
		tagName,
		{ className: clsx(styles.list, className) },
		data.map((el, idx) => {
			const child = tagName === 'ol' ? `${idx + 1} ${divider} ${el}` : el;
			return React.createElement('li', { key: idx }, url ? React.createElement(Link, { href: url[idx] }, child) : child);
		})
	);
}
