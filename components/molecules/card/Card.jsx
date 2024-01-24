import clsx from 'clsx';
import styles from './card.module.scss';
import Pic from '@/components/atoms/pic/Pic';
import Text from '@/components/atoms/text/Text';

export default function Card({ imgSrc, txt, url, styleType, className }) {
	return (
		<article className={clsx(styles.card, className, styles[styleType])}>
			<Pic imgSrc={imgSrc} url={url} />
			{/* txt 값이 전달될 때만 <Text /> 컴포넌트 만들도록 처리. */}
			{txt && <Text>{txt}</Text>}
		</article>
	);
}
