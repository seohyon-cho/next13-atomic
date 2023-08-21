import { Pic } from '@/components/atoms/pic/Pic';
import styles from './Slider.module.scss';
import clsx from 'clsx';

function Slider({ data }) {
	return (
		<article className={clsx(styles.slider)}>
			{data.map((el) => (
				<Pic key={el.idMeal} imgSrc={el.strMealThumb} />
			))}
		</article>
	);
}

export default Slider;
