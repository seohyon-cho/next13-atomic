import clsx from 'clsx';
import styles from './find-recipe.module.scss';
import Breadcrumb from '@/components/molecules/breadcrumb/Breadcrumb';

export default function FindRecipe() {
	return (
		<section className={clsx(styles.findRecipe)}>
			<h1>Find-recipe</h1>
			<Breadcrumb divider={'>'} />
		</section>
	);
}
