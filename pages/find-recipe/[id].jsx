import clsx from 'clsx';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { TableX, TableY } from '@/components/atoms/table/Table';

export default function Detail() {
	const [Recipe, setRecipe] = useState(null);
	console.log(Recipe);
	const recipe = {
		member: [
			{ name: 'David', age: 20, address: 'Seoul' },
			{ name: 'Emily', age: 30, address: 'Busan' },
			{ name: 'Michael', age: 40, address: 'Daegu' },
		],
	};

	const title = Object.keys(recipe)[0];
	const data = Object.values(recipe)[0];
	console.log('title', title);
	console.log('data', data);

	useEffect(() => {
		const res = axios.get('/search.php?s=Arrabiata').then((json) => {
			setRecipe(json.data);
		});

		console.log(res);
	}, []);

	return (
		<section>
			<TableX title={title} data={data} isCount />
			<TableY title={title} data={data} isCount />
		</section>
	);
}
