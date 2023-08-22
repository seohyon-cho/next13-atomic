import Head from 'next/head';
import styles from './style.module.scss';
import axios from 'axios';
import Category from '@/components/molecules/Category/Category';
import { useRecipeByCategory } from '@/hooks/useRecipe';

export default function Recipe({ categories }) {
	//useRecipeByCategory (자주활용되는 리액트 기능을 패키징해서 hook형태로 만들어놓은 함수)
	//인수가 전달되면 해당값을 활용해서 react-qeury를 이용하여 비동기서버데이터를 호출하고 해당 결과값을 객체형태로 리턴하는 함수
	//react-query를 굳이 써야되는 이유 : 반환받은 서버 데이터를 캐싱처리해서 동일한 데이터 요청시 다시 refetching하지 않기 위함
	// {data(서버데이터), isSuccess(요청성공시 true반환), isError(요청실패시 true반환),isLoading(요청중일떄 true반환), refetch(강제 refetching함수)}
	const { data, isSuccess } = useRecipeByCategory('Beef');
	console.log(data);

	return (
		<>
			<Head>
				<title>Recipe Page</title>
			</Head>

			<section className={styles.recipePage}>
				<Category items={categories} />
			</section>
		</>
	);
}

export async function getStaticProps() {
	const { data } = await axios.get('/categories.php');

	return {
		props: { categories: data.categories },
	};
}
