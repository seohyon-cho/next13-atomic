import clsx from 'clsx';
import styles from './pic.module.scss';
import Image from 'next/image';

// 페이지 컴포넌트에서만 데이터 패칭이 가능하고, 일반 부분 컴포넌트에서는 데이터를 패칭할 수 없으므로, 데이터를 패칭하고 있는 부모로부터 props로 전달받아 데이터를 출력해야 함.
export default function Pic({ imgSrc, imgTxt }) {
	console.log(imgTxt);
	return (
		<div className={clsx(styles.pic, imgTxt && styles.picTxt)}>
			<Image src={imgSrc} alt={imgSrc} priority fill sizes='(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw' />
			{imgTxt && <h2>{imgTxt}</h2>}
		</div>
	);
}
