import clsx from 'clsx';
import styles from './find-recipe.module.scss';
import Navbar from '@/components/molecules/navbar/Navbar';

export default function FindRecipe() {
	return (
		<section className={clsx(styles.findRecipe)}>
			{/* Navbar 호출 시, 화면에 출력할 메뉴명 전달 */}
			<Navbar data={['Find Recipe', 'Gallery', 'About']} />
		</section>
	);
}
