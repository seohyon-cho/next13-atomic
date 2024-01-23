import { TableX, TableY } from '@/components/atoms/table/Table';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Detail() {
	const [Recipe, setRecipe] = useState(null);

	const recipe = {
		member: [
			{ name: 'David', age: 20, address: 'Seoul' },
			{ name: 'Emily', age: 30, address: 'Busan' },
			{ name: 'Michael', age: 40, address: 'Daegu' },
		],
	};
	const title = Object.keys(recipe)[0];
	const data = Object.values(recipe)[0];

	useEffect(() => {
		axios.get('/search.php?s=Arrabiata').then((json) => {
			setRecipe(json.data);
		});
	}, []);

	return (
		<section>
			<TableX data={data} title={title} isCount />

			<TableY data={data} title={title} isCount reverse />
		</section>
	);
}
