import styles from './Swiper.module.scss';
import clsx from 'clsx';
import { Title } from '@/components/atoms/text/Title';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import { useState } from 'react';
import 'swiper/css';
import Slider from '@/components/molecules/Slider/Slider';
import Counter from '@/components/molecules/Counter/Counter';

SwiperCore.use([Autoplay]);

function SwiperWrap({ recipe, category }) {
	const [Index, setIndex] = useState(0);

	return (
		<figure className={clsx(styles.visual)}>
			<Title style={{ position: 'absolute', top: '20vh', left: '10vw', fontSize: 50, color: 'orange' }}>{category}</Title>

			<Slider data={recipe} index={Index} />
			<Counter index={Index} len={recipe.length} />

			<Swiper
				className={clsx(styles.swiper)}
				modules={[Autoplay]}
				autoplay={{ delay: 2000, disableOnInteraction: true }}
				loop={true}
				grabCursor={true}
				slidesPerView={1}
				spaceBetween={100}
				centeredSlides={true}
				breakpoints={{
					1200: {
						slidesPerView: 3,
						spaceBetween: 50,
					},
				}}
				//loop기능 적용하면 슬라이드가 동적으로 추가되기 때문에 순번이 어그러짐
				//아래와 같이 slideChange 이벤트 발생시 자동으로 전달되는 파라미터 객체의 realIndex 프로퍼티 활용
				onSlideChange={(el) => setIndex(el.realIndex)}
			>
				{recipe.map((item) => (
					//SwiperSlide 컴포넌트안쪽에서 자동으로 JSX리턴하는 함수 호출 가능
					//해당 함수에는 파라미터로 현재 컴포넌트 요소가 활성화되어있는 구분할 수 있는 객체가 전달
					<SwiperSlide key={item.idMeal} className={clsx(styles.swiperSlide)}>
						{({ isActive, isPrev, isNext }) => {
							//isActive , isPrev, isNext, isVisible
							return (
								<div className={clsx(isActive && styles.on, isPrev && styles.prev, isNext && styles.next)}>
									{/* 다이나믹 라우팅으로 기본 id값 전달외에 ?뒤에 쿼리 스트링값을 전달하면 해당 값을 다이나믹 라우팅이 적용되는 페이지 안에서 비구조화할당으로 받음 */}
									<Title tag={'h3'} url={`/detail/${item.idMeal}?name=${item.strMeal}&url=${item.strMealThumb}`} type={'slogan'}>
										{item.strMeal.length > 25 ? item.strMeal.substr(0, 25) : item.strMeal}
									</Title>
								</div>
							);
						}}
					</SwiperSlide>
				))}
			</Swiper>
		</figure>
	);
}

export default SwiperWrap;
