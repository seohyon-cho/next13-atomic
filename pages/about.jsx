import Card from '@/components/molecules/card/Card';
import styles from './about.module.scss';
import clsx from 'clsx';

/*
	atomic design pattern 개발에서 스타일링 시 주의점. 

	1. 원자단위, 분자단위 컴포넌트 자체의 scss 파일에는, 가장 보편적으로 쓰일만한 베이직한 스타일만 기본적으로 적용해둠. 

	2. 만약, 특정 스타일로 자주 쓰이는 디자인 패턴이 있다면, styleType으로 연동처리 해놓음. 

	3. 페이지별로 상세한 디자인은, 가급적 호출하는 페이지 컴포넌트 레벨에서 className을 상속함으로서 스타일 지정하면 됨. 
*/
export default function Pages() {
	return (
		<section className={clsx(styles.about)}>
			<Card
				styleType={'horizontal'}
				className={clsx(styles.item)}
				imgSrc={
					'https://images.unsplash.com/photo-1608541737042-87a12275d313?q=80&w=2322&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
				}
				txt={'Post Title'}
			/>
		</section>
	);
}
