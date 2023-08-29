import { Pic } from '@/components/atoms/pic/Pic';
import { Title } from '@/components/atoms/text/Title';
import { useRecipeById } from '@/hooks/useRecipe';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { BounceLoader } from 'react-spinners';
import { Table } from '@/components/atoms/Table/Table';
import { useState, useEffect } from 'react';
import List from '@/components/atoms/List/List';

function Detail() {
	//정규표현식에서 해당 조건이 포함이 아닌 딱 조건에 부합될때만 처리 ^조건$
	//표현식뒤에 + : 해당 조건의 값이 반복되는 경우에도 true로 인지
	const result = /^\d+[.]+[' ']$/.test('2. ');
	console.log(result);
	const router = useRouter();
	const { id } = router.query;
	const { data } = useRecipeById(id);
	const [TableData, setTableData] = useState([]);
	const [ListData, setListData] = useState([]);

	useEffect(() => {
		if (data) {
			//console.log(data.strInstructions);
			const keys = Object.keys(data);
			const filterKeys1 = keys.filter((key) => key.startsWith('strIngredient'));
			const filterKeys2 = filterKeys1.filter(
				(key) => data[key] !== '' && data[key] !== null
			);
			const ingredients = filterKeys2.map((key, idx) => ({
				index: idx + 1,
				ingredient: data[key],
				measuer: data[`strMeasure${idx + 1}`],
			}));
			setTableData(ingredients);

			let instructions = data.strInstructions.split('.');
			//.map((text) => text.trim().replace('\r\n', '').trim() + '.')

			//setListData(instructions);
			console.log(instructions);
		}
	}, [data]);

	return (
		<section className='detail'>
			<BounceLoader
				loading={!data}
				cssOverride={{
					position: 'absolute',
					top: 300,
					left: '50%',
					transform: 'translateX(-50%)',
				}}
				color={'orange'}
				size={100}
			/>
			{data && (
				<>
					<Title type={'slogan'}>{data.strMeal}</Title>

					<div className='picFrame'>
						<Pic imgSrc={data.strMealThumb} />
					</div>
					<Table data={TableData} title={data.strMeal} />

					{/* <List data={ListData} tag={'ol'} /> */}
				</>
			)}
		</section>
	);
}

export default Detail;
