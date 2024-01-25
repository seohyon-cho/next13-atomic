import Pic from '@/components/atoms/pic/Pic';
import { useRecipeById } from '@/hooks/useRecipe';
import { useRouter } from 'next/router';
import styles from './detail.module.scss';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { TableY } from '@/components/atoms/table/Table';
import List from '@/components/atoms/list/List';

export default function Detail() {
	const [TableData, setTableData] = useState([]);
	const [ListData, setListData] = useState([]);

	const router = useRouter();
	const { id } = router.query;
	const { data, isSuccess } = useRecipeById(id);

	useEffect(() => {
		if (data) {
			let keys = Object.keys(data);
			// strIngredient로 시작하는 key값만 뽑아내기
			keys = keys.filter(key => key.startsWith('strIngredient'));
			// 뽑아낸 key값 중, value값이 빈 문자 또는 null이 아닌 (value값이 비어있지 않은) key값만 다시 뽑아내기
			keys = keys.filter(key => data[key] !== '' && data[key] !== null);
			const ingredients = keys.map((key, idx) => {
				// 객체 형식으로 내보내야 하므로 () => { return {} } 형태
				return { no: idx + 1, ingredient: data[`strIngredient${idx + 1}`], measure: data[`strMeasure${idx + 1}`] };
			});
			setTableData(ingredients);

			const instructions = data.strInstructions
				.split('\r\n') // 기존 문자열에서, \r\n 을 구분자로 하여 문자열을 배열로 나눔.
				.map(txt => (txt.includes('\t') ? txt.split('.\t')[1] : txt)) // 나눈 문자 안에서, .\t 가 포함되어있다면 해당 기호를 구분자로 하여 뒷 부분만 가져옴.
				.filter(txt => txt !== ''); // 분리된 배열에서 혹시 빈 문자열이 있으면 배열에서 제거. (값이 없는 것은 제거)
			console.log(instructions);
			setListData(instructions);
		}
	}, [data]);

	return (
		<section className={clsx(styles.detail)}>
			{isSuccess && (
				<>
					<h1>{data.strMeal}</h1>
					<div className={clsx(styles.picFrame)}>
						<Pic imgSrc={data.strMealThumb} />
					</div>
					<TableY data={TableData} title={'Ingredient'} className={clsx(styles.detailTable)} />

					<List data={ListData} tagName={'ol'} className={clsx(styles.detailList)} />
				</>
			)}
		</section>
	);
}
