import Head from 'next/head';
import axios from 'axios';

export default function Home(props) {
	console.log('SSG', props);
	return (
		<>
			<Head>
				<title>Main Page</title>
			</Head>

			<main>
				<h1>Main Page</h1>
			</main>
		</>
	);
}

// SSG 방식으로 페이지 렌더링
// axios.get('데이터를 호출할 URL') (알아서 parsing 까지 해줌.)
// serialize 관련 에러 뜰 시, 반환 받은 promise 객체를 그대로 내보내는 게 아니라, 실제 data 값까지 추출해낸 뒤에 그 data 값을 props로 전달하면 해결 됨.
export async function getStaticProps() {
	const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood');
	// {props: }라는 객체로 내보내면, 맨 상단에서 props로 전달 받을 수 있음.
	// return으로 props 객체 반환하여 컴포넌트로 전달 시, revalidate가 없으면 SSG방식 (한 번 패칭한 데이터를 재패칭하지 않고 static하게 그대로 가지고 가는 것), 있으면 ISR 방식 (revalidate: 로 설정한 시간마다 정기적으로 데이터가 새로 재패칭 되는 것.)
	// revalidate: @ = @초 단위로 데이터 갱신 (초 단위)
	return { props: data, revalidate: 60 * 60 * 24 };
}
