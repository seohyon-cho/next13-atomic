import { Pic } from '@/components/atoms/pic/Pic';
import { Title } from '@/components/atoms/text/Title';
import { useRecipeById } from '@/hooks/useRecipe';
import { useRouter } from 'next/router';
import styles from './detail.module.scss';
import clsx from 'clsx';

function Detail() {
	const router = useRouter();
	const { id } = router.query;
	const { data, isSuccess } = useRecipeById(id);
	console.log(isSuccess && data);

	return (
		<section className={clsx(styles.detail)}>
			<Title type={'slogan'}>{data?.strMeal}</Title>

			<div className={clsx(styles.picFrame)}>
				<Pic imgSrc={data?.strMealThumb} />
			</div>
		</section>
	);
}

export default Detail;
