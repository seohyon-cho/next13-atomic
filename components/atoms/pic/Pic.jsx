import clsx from 'clsx';
import styles from './pic.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { PulseLoader } from 'react-spinners';
import { useState } from 'react';
// import { useThemeColor } from '@/hooks/useThemeColor'; // 방법2
// npm i react-spinners

// 페이지 컴포넌트에서만 데이터 패칭이 가능하고, 일반 부분 컴포넌트에서는 데이터를 패칭할 수 없으므로, 데이터를 패칭하고 있는 부모로부터 props로 전달받아 데이터를 출력해야 함.
export default function Pic({ imgSrc, imgTxt, url }) {
	// const { point } = useThemeColor(); // 방법2
	const [IsLoaded, setIsLoaded] = useState(false);

	return (
		<div className={clsx(styles.pic, imgTxt && styles.picTxt)}>
			<Image
				src={imgSrc}
				alt={imgSrc}
				priority
				fill
				sizes='(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw'
				onLoadingComplete={() => setIsLoaded(true)}
			/>
			{imgTxt && <h2>{imgTxt}</h2>}
			{url && <Link href={url}></Link>}
			<PulseLoader
				loading={!IsLoaded}
				size={50}
				// color={point} // 방법2
				color={'var(--point)'}
				cssOverride={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
			/>
		</div>
	);
}
