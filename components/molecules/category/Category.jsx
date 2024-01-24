import clsx from 'clsx';
import styles from './category.module.scss';
import Text from '@/components/atoms/text/Text';

// 해당 카테고리 컴포넌트를 범용적으로 사용하기 위해서는, 무조건 아래의 형식으로 데이터를 전달받아야 함.
// {원본배열데이터, 활성화될 요소, 출력용 메뉴이름 배열데이터(선택사항), 클릭했을 때 실행할 핸들러 함수, 클래스명}
export default function Category({ dataArr, selectedEl, nameArr, onClick, className }) {
	return (
		<nav className={clsx(styles.category, className)}>
			{dataArr.map((el, idx) => (
				<Text key={idx} onClick={() => onClick(dataArr[idx])}>
					{nameArr ? nameArr[idx] : el}
				</Text>
			))}
		</nav>
	);
}
