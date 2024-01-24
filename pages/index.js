import Head from 'next/head';
import clsx from 'clsx';
import styles from './Home.module.scss';
import axios from 'axios';

export default function Home({ meals, category }) {
	console.log('meals', meals);
	console.log('category', category);
	return (
		<>
			<Head>
				<title>Main Page</title>
			</Head>

			<main className={clsx(styles.main)}>
				<h1>Main Page</h1>
			</main>
		</>
	);
}

// export async function getStaticProps() 이 양식은 고정.

export async function getStaticProps() {
	const list = [];
	// mealDB에 가지고 있는 전체 카테고리를 가져오는 것.
	// data 객체의 값을 가져오되, obj 라는 이름으로 가져올 것.
	const { data: obj } = await axios.get('/categories.php');
	const items = obj.categories;

	items.forEach(el => list.push(el.strCategory));

	// 카테고리 내 컨텐츠가 1-2개 밖에 없는 것들은 제외시키고 filtering 하도록 해서 재정의.
	const newList = list.filter(el => el !== 'Goat' && el !== 'Vegan' && el !== 'Starter');

	// [ 난수를 만드는 로직 ]
	// newList.length 이 10 이라고 하면, Math.random()은 0~10 사이의 실수를 랜덤으로 반환해줌.
	// floor 는 소숫점 자리를 제거하여 반환해주므로
	// 결론적으로 0부터 newList.length 까지의 숫자 중 랜덤으로 정수를 반환함.
	const randomNum = Math.floor(Math.random() * newList.length);

	// data라는 객체에 받아져야 하므로, 일단 {data} 로 받고 :randomCategoryData 라고 이어 써서, 이름을 randomCategoryData로 치환.
	const { data: meals } = await axios.get(`/filter.php?c=${newList[randomNum]}`);

	// getStaticProps 는 무조건 객체를 return 해야함.
	return {
		props: { ...meals, category: newList[randomNum] },
		// getStaticProps 자체가 SSG 방식이어서, 프로덕션 모드로 배포 했을 때 빌드했을 그 당시의 랜덤데이터로만 고정이 되는데, 이 경우엔 주기적으로 랜덤데이터가 갱신되어야 하므로, revalidate를 부여해서 일정 시간마다 랜덤 데이터가 변경되도록 ISG 방식으로 만들어줘야 함.
		revalidate: 60
	};
}
