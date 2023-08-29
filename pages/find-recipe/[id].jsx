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
	const router = useRouter();
	const { id } = router.query;
	const { data } = useRecipeById(id);
	const [TableData, setTableData] = useState([]);
	const [ListData, setListData] = useState([]);

	useEffect(() => {
		if (data) {
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

			let instructions = data.strInstructions
				.split('\r\n')
				.map((text) =>
					text.includes('.\t') ? text.replace('.\t', '+').split('+')[1] : text
				)
				.filter((text) => text !== '');

			setListData(instructions);
		}
	}, [data]);

	return (
		<section className='detail'>
			<BounceLoader
				//기본적으로 next는 라우터명이 변경될떄마다 언마운트되는 페이지 컴포넌트의 csr방식으로 가져온 데이터와 스타일 노드를 제거
				//page transition이 적용되어 있기 때문에 상세페이지에서 다른페이지로 넘어갈때 데이터는 이미 사라졌음에도 불구하고 데이터를 활용하는 컴포넌트가 계속 있으면 prop오류 발생
				//해결방법: csr방식으로 가져오는 데이터 자체를 컴포넌트 렌더링의 조건설정
				//데이터없으면 로딩바 출력, 데이터가 있으면 그 데이터를 활용하는 컴포넌트 출력
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

					<List data={ListData} tag={'ol'} />
				</>
			)}
		</section>
	);
}

export default Detail;
