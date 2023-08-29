import { Pic } from '@/components/atoms/pic/Pic';
import { Title } from '@/components/atoms/text/Title';
import { useRecipeById } from '@/hooks/useRecipe';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { BounceLoader } from 'react-spinners';
import { Table } from '@/components/atoms/Table/Table';
import { useState, useEffect } from 'react';
import List from '@/components/atoms/List/List';
import Btn from '@/components/atoms/Button/Btn';

function Detail() {
	const router = useRouter();
	const { id } = router.query;
	const { data } = useRecipeById(id);
	const [TableData, setTableData] = useState([]);
	const [ListData, setListData] = useState([]);
	const [Saved, setSaved] = useState(false);

	//router로 들어오는 id값이 변경될때마다 실행되는 useEffect
	useEffect(() => {
		//로컬저장소에 savedRecipe이름으로 특정 값이 있기만 하면실행
		if (localStorage.getItem('savedRecipe')) {
			//해당 데이터를 배열로 파싱해서 가져옴
			const savedRecipe = JSON.parse(localStorage.getItem('savedRecipe'));

			//가져온배열값에서 router들어온 id값이 있는 확인
			if (savedRecipe.includes(id)) {
				setSaved(true);
				//로컬저장소에 값은 있지만 현재 라우터로 받은 레시피 정보값은 없는 경우
			} else {
				setSaved(false);
			}
			//아예 로컬저장소 자체가 없으면 그냥 빈배열값으로 저장소 생성
		} else {
			localStorage.setItem('savedRecipe', JSON.stringify([]));
		}
	}, [id]);

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
					<Btn>Add to My Favoraite</Btn>
					<Table data={TableData} title={data.strMeal} />

					<List data={ListData} tag={'ol'} />
				</>
			)}
		</section>
	);
}

export default Detail;
