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
	const result = /^\d+[.][' ']$/.test('2. ');
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

			let instructions = data.strInstructions
				//\r\n이 강제 줄바꿈하는 정규표현식이므로 해당 정규표현식을 구분점으로 문장을 나누는게 효율적
				.split('\r\n')
				//분리된 문장중에서 .\t라는 탭띄우기 정규표현식을 제거하기위해서 일단은 공통화할 수 있는 숫자를 제외한 특수기호만 +로 치환
				//이후 치환된 +기준으로 뒤에값만 map으로 리턴
				//특정 레시피에는 .\t가 없는 문장도 있기 때문에 해당 구분점이 없을떄는 기존 text를 리턴 그렇지 않으면 치환해서 리턴
				.map((text) =>
					text.includes('.\t') ? text.replace('.\t', '+').split('+')[1] : text
				)
				//원본 문자열에 줄바꿈 정규표현식이 여러번 들어가 있는 문장의 경우는 빈문장을 배열로 반환하기 때문에 해당 해당 배열값을 제거
				.filter((text) => text !== '');

			setListData(instructions);
			//console.log(instructions);
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

					<List data={ListData} tag={'ol'} />
				</>
			)}
		</section>
	);
}

export default Detail;
