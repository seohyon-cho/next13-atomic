import clsx from 'clsx';
import styles from './table.module.scss';
import Text from '../text/Text';

export function TableY({ data, title, className, isCount = false, reverse = false }) {
	data = reverse ? [...data].reverse() : [...data];
	return (
		<>
			{title && (
				<Text tagName={'h1'} styleType={'title1'}>
					{title}
				</Text>
			)}

			<table className={clsx(styles.table, className)} border='1'>
				<thead>
					<tr>
						{isCount && <th scope='col'>No</th>}
						{Object.keys(data[0]).map((key) => (
							<th key={key}>{key}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map((el, idx) => (
						<tr key={idx}>
							{isCount && <td>{reverse ? data.length - idx : idx + 1}</td>}
							{Object.values(el).map((val, idx) => (
								<td key={idx}>{val}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}

export function TableX({ data, title, className, reverse = false }) {
	const keys = Object.keys(data[0]);

	return (
		<>
			{title && (
				<Text tagName={'h1'} styleType={'title1'}>
					{title}
				</Text>
			)}

			<table border='1' className={clsx(styles.table, className)}>
				<tbody>
					{data.map((el, idx) => (
						<tr key={idx}>
							<th scope='row'>{keys[idx]}</th>
							{Object.values(el).map((_, idx2) => (
								<td key={idx2}>{data[idx2][keys[idx]]}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
