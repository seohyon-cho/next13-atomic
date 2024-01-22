import Head from 'next/head';
import axios from 'axios';
import Image from 'next/image';
import Pic from '@/components/pic/Pic';
import clsx from 'clsx';
import styles from './Home.module.scss';

// getStaticProps에서 전달받은 props 에서, props에 있는 meals라는 property 자체를 아예 비구조화할당으로 가져옴. = export default function Home(props.meals){};
export default function Home({ meals }) {
	// meals 의 데이터 여러 개 중, 5개만 가져오는 것.
	// 기존, 밑에서 map 돌릴 때 if (idx<=5) return; 으로 설정 갯수 넘어가면 끊어버리는 거랑 같은 역할.
	const mealsData = meals.slice(0, 5);
	return (
		<>
			<Head>
				<title>Main Page</title>
			</Head>

			<main className={clsx(styles.main)}>
				<h1>Main Page</h1>
				{mealsData.map((item, idx) => {
					return (
						<div key={item.idMeal}>
							<div className={clsx(styles.bg)}>
								<Pic imgSrc={item.strMealThumb} imgTxt={item.strMeal} url={'/gallery'} />
							</div>
						</div>
					);
				})}
			</main>
		</>
	);
}

// SSG 방식으로 페이지 렌더링
// axios.get('데이터를 호출할 URL') (알아서 parsing 까지 해줌.)
// serialize 관련 에러 뜰 시, 반환 받은 promise 객체를 그대로 내보내는 게 아니라, 실제 data 값까지 추출해낸 뒤에 그 data 값을 props로 전달하면 해결 됨.
// export async function getStaticProps() {} 자체는 원래 SSG방식으로 렌더링 하는 건데, 여기에 revalidate 라는 옵션이 더해지면 ISR 방식으로 전환되는 개념임.
export async function getStaticProps() {
	const { data } = await axios.get('/filter.php?c=Seafood');
	// {props: }라는 객체로 내보내면, 맨 상단에서 props로 전달 받을 수 있음.
	// return으로 props 객체 반환하여 컴포넌트로 전달 시, revalidate가 없으면 SSG방식 (한 번 패칭한 데이터를 재패칭하지 않고 static하게 그대로 가지고 가는 것), 있으면 ISR 방식 (revalidate: 로 설정한 시간마다 정기적으로 데이터가 새로 재패칭 되는 것.)
	// revalidate: @ = @초 단위로 데이터 갱신 (초 단위)
	return { props: data, revalidate: 60 * 60 * 24 };
}
