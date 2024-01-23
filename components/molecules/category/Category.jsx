import clsx from 'clsx';
import styles from './category.module.scss';
import Text from '@/components/atoms/text/Text';

export default function Category({ fetchDataArr, onClick, isOn, className, nameArr }) {
	return (
		<nav className={clsx(styles.category, className)}>
			{fetchDataArr.map((_, idx) => (
				<Text key={idx} isOn={isOn} onClick={onClick} data={fetchDataArr} idx={idx}>
					{nameArr[idx]}
				</Text>
			))}
		</nav>
	);
}
