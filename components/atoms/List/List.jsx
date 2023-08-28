import styles from './List.module.scss';
import clsx from 'clsx';
import React from 'react';

//React.createElement(요소명, {className, style, href}, React.createElemet():map으로 반복처리 가능)

function List({ style, className, data }) {
	return React.createElement(
		'ul',
		{ className: clsx(styles.list, className), style: style },
		data.map((el, idx) => React.createElement('li', { key: idx }, el))
	);
}

export default List;
