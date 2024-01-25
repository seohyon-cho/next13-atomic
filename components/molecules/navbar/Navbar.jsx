import clsx from 'clsx';
import styles from './navbar.module.scss';
import List from '@/components/atoms/list/List';
import { useRouter } from 'next/router';

export default function Navbar({ data }) {
	// 내부적으로, 현재 페이지의 path 이름을 찾아서 currentPath로 정의.
	const currentPath = useRouter().asPath.split('/')[1];

	// 하단의 urls는, 실제 url 라우터명으로 연산로직에 쓰이는 값이기 때문에 기존에 display용으로 name값을 가공했던 것으로 그대로 쓸 수 없음.
	// 따라서 전달받은 출력용 메뉴배열 (display용도로 가공되었던 값)을 다시 라우터 링크용 배열로 재가공해서 반환
	const urls = data.map(el => '/' + el.toLowerCase().split(' ').join('-'));

	return (
		//출력용 메뉴배열, 라우터설정용 링크배열, 활성화되야 되는 라우터명 전달
		<List data={data} url={urls} className={clsx(styles.navbar)} currentPath={currentPath} />
	);
}
