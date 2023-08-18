import Layout from '@/components/template/Layout';
import '@/styles/globals.scss';
import axios from 'axios';

axios.defaults.baseURL = 'https://www.themealdb.com/api/json/v1/1';

export default function App({ Component, pageProps }) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}

/*
  컴포넌트 렌더링 흐름
  1. _app.js에서 공통의 layout 템플릿 컴포넌트를 가져와서 전체 Component를 Wrapping 
  2. _app.js에 있는 Component는 page폴더 안쪽에 있는 각각의 페이지 컴포넌트를 의미
  3. 모든 페이지 컴포넌트에는 Layout컴포넌트의 공통의 구조가 적용됨
  4. 각각의 페이지 컴포넌트에서 페이지별로 들어각 컨텐츠 추가
*/
