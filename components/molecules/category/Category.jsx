import clsx from 'clsx';
import styles from './category.module.scss';
import Text from '@/components/atoms/text/Text';

//해당 카테고리 컴포넌트를 범용적으로 사용하기 위해서 무조건 아래의 형식으로 데이터 전달받음
//원본 배열데이터, 활성화요소, 출력할 메뉴이름배열 데이터(선택사항), 클릭핸들러, 클래스
export default function Category({ dataArr, selectedEl, nameArr, onClick, className }) {
	return (
		<nav className={clsx(styles.category, className)}>
			{dataArr.map((el, idx) => (
				<Text styleType={'button'} key={idx} onClick={() => onClick(dataArr[idx])} isOn={selectedEl === dataArr[idx]}>
					{nameArr ? nameArr[idx] : el}
				</Text>
			))}
		</nav>
	);
}
