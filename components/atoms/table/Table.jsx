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
						{Object.keys(data[0]).map(key => (
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

/*
	data = [
    { name: 'David', age: 20, address: 'Seoul' },
		{ name: 'Emily', age: 30, address: 'Busan' },
		{ name: 'Paul', age: 40, address: 'Daegu' },
		{ name: 'Andy', age: 50, address: 'Incheon' },
		{ name: 'Tom', age: 60, address: 'Mokpo' }
	];
*/

export function TableX({ data, title, className, reverse = false }) {
	// 키값만 배열로 추출
	const keys = Object.keys(data[0]); // ['name', 'age']

	return (
		<>
			{title && (
				<Text tagName={'h1'} styleType={'title1'}>
					{title}
				</Text>
			)}

			<table border='1' className={clsx(styles.table, className)}>
				<tbody>
					{/* 주의: key의 종류에 따라서 <tr>을 생성할 것이기 때문에, 전달된 data 배열의 갯수만큼 반복 도는 것이 아닌, 객체 안의 key의 갯수만큼 반복을 돌리면서 <tr>을 생성.  */}
					{keys.map((el, idx) => (
						// idx : key의 반복 순번
						<tr key={idx}>
							<th scope='row'>{keys[idx]}</th>
							{/* 내부적으로 반복을 돌 때에는, data 배열 자체의 갯수에 따라서 <td>가 생성되어야 하기 때문에 data로 반복처리.  */}
							{data.map((_, idx2) => (
								// idx2 : data 배열의 반복 순번
								// <td>는 data의 갯수만큼 반복을 돌면서, 상위에서 반복 돌고 있는 순번의 key값의 데이터만 출력.
								<td key={idx2}>{data[idx2][keys[idx]]}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}

/*


	[ 2차원 배열 = 배열의 요소 안에, 또 다시 배열이 들어가있는 경우 = 상위 배열의 반복을 돌 때, 다시 내부적으로 하위 요소도 또 다시 반복처리함. = 중첩 반복문 ]

	* 2차원 배열을 많이 사용하는 사례 
		- DB(table 형식의 DB) 에서, 자료를 순차적으로 뽑아야 할 때. 
		
		<tr>
			<td> 0-0 </td>  <td> 0-1 </td>  <td> 0-2 </td>
		</tr>

		<tr>
			<td> 1-0 </td>  <td> 1-1 </td>  <td> 1-2 </td>
		</tr>

		위 로직을 반복문으로 풀어서 쓸 때, 
		아래 로직은, <tr>이 한 번 반복 돌 때, 그와 동시에 내부적으로 <td> 세 번 반복 처리. 
		
			// <tr> 반복 처리 
		trArr.map((tr, idx0) => {
			console.log(idx0) // -> 0, 1

				// <td> 반복 처리
			tdArr.map((td, idx1) => {
				console.log(idx0 + '-' + idx1) // -> 0-0, 0-1, 0-2 (tr 반복 첫 번째 사이클)
																			 // -> 1-0, 1-1, 1-2 (tr 반복 두 번째 사이클)
			})
		})



*/
