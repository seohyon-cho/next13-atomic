import clsx from 'clsx';
import styles from './table.module.scss';
import Text from '../text/Text';

export default function Table({ data, title, className, isCount = false, reverse = false }) {
	console.log(data);
	// data를 받을 때, 역순으로 바꾸더라도 불변성을 유지하면서 바꿔야 하므로, 역순 적용을 하려면 원본을 복사해서 reverse() 처리하거나, 적용을 안 할 거면 기존 데이터 그대로 복사해서 가져오기만 하면 됨.
	data = reverse ? [...data].reverse() : [...data];
	return (
		<>
			{title && (
				<Text tagName={'h1'} styleType={'title1'}>
					{title}
				</Text>
			)}

			<table className={clsx(styles.table, className)} border={1}>
				<thead>
					<tr>
						{isCount && <th scope='column'>No</th>}
						{Object.keys(data[0]).map((key) => (
							<th key={key}>{key}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map((el, idx) => (
						<tr key={idx}>
							{isCount && <td>{reverse ? data.length - idx : idx + 1}</td>}
							{Object.values(el).map((val) => (
								<td key={idx}>{val}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
