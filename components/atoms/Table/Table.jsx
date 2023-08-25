import { Title } from '../text/Title';
import styles from './Table.module.scss';
import clsx from 'clsx';

/* 
  thead
    (순번, 재료명, 재료량)
  tbody 
    tr(반복)
    td()

*/

export function Table({ data }) {
	if (data.length === 0) return;
	console.log(data[0]);
	return (
		<>
			<Title>Title</Title>

			<table className={clsx(styles.table)}>
				<thead>
					<tr>
						{/* 첫번째 배열의 키값만 반복을 돌면서 제목줄 출력 */}
						{Object.keys(data[0]).map((key) => (
							<th key={key}>{key}</th>
						))}
					</tr>
				</thead>
			</table>
		</>
	);
}
