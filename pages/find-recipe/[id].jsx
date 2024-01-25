import Pic from '@/components/atoms/pic/Pic';
import { useRecipeById } from '@/hooks/useRecipe';
import { useRouter } from 'next/router';
import styles from './detail.module.scss';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { TableY } from '@/components/atoms/table/Table';
import List from '@/components/atoms/list/List';
import Text from '@/components/atoms/text/Text';

export default function Detail() {
	const [TableData, setTableData] = useState([]);
	const [ListData, setListData] = useState([]);

	const router = useRouter();
	const { id } = router.query;
	const { data, isSuccess } = useRecipeById(id);

	useEffect(() => {
		if (data) {
			let keys = Object.keys(data);
			keys = keys.filter(key => key.startsWith('strIngredient'));
			keys = keys.filter(key => data[key] !== '' && data[key] !== null);
			const ingredients = keys.map((_, idx) => {
				return { no: idx + 1, ingredient: data[`strIngredient${idx + 1}`], measure: data[`strMeasure${idx + 1}`] };
			});
			setTableData(ingredients);

			const instructions = data.strInstructions
				.split('\r\n')
				.map(txt => (txt.includes('\t') ? txt.split('.\t')[1] : txt))
				.filter(txt => txt !== '');
			setListData(instructions);
		}
	}, [data]);

	return (
		<section className={clsx(styles.detail)}>
			{isSuccess && (
				<>
					<div className={clsx(styles.upper)}>
						<h1>{data.strMeal}</h1>
						<Text className={clsx(styles.btnFavorite)} styleType={'button'}>
							Add to My Favorite
						</Text>
					</div>
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
