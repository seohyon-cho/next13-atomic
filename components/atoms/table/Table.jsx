import clsx from 'clsx';
import styles from './table.module.scss';
import Text from '../text/Text';

export default function Table({ data, title, className }) {
	return (
		<>
			{title && (
				<Text tagName={'h1'} styleType={'title1'}>
					{title}
				</Text>
			)}

			<table className={clsx(styles.table, className)}></table>
		</>
	);
}
