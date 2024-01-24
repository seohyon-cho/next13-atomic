import clsx from 'clsx';
import styles from './layout.module.scss';
import Header from '@/components/organisms/header/Header';
import Breadcrumb from '@/components/molecules/breadcrumb/Breadcrumb';
import { Nanum_Myeongjo, Orbitron } from 'next/font/google';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';

const nanum = Nanum_Myeongjo({
	subsets: ['latin'],
	weight: ['400', '700'],
	preload: true,
	variable: '--font-nanum'
});

const orbitron = Orbitron({
	subsets: ['latin'],
	weight: ['400', '600'],
	preload: true,
	variable: '--font-orbitron'
});

export default function Layout({ children }) {
	const router = useRouter();
	return (
		// <AnimatePresence> 에 mode='wait' 속성을 부여하면, 기존 컴포넌트에서 실행되고 있는 모션 컴포넌트가 있을 때, 해당 모션이 끝날 때까지 unmount를 지연 시킴. (=> 사라지는 모션까지 온전하게 나타날 수 있도록 모션 시간 확보가 가능해짐. )
		<AnimatePresence mode='wait'>
			{/* router 변경을 감지하는 모션 컴포넌트 */}
			<motion.div key={router.pathname}>
				<div className={clsx(styles.layout, nanum.variable, orbitron.variable)}>
					<Header />
					<div className={clsx(styles.content)}>
						{router.asPath !== '/' && <Breadcrumb />}
						{children}
					</div>
				</div>
				{/* router 변경 시마다 실제로 모션이 일어날 박스 요소 */}
				<motion.div className='in' initial={{ scaleX: 0 }} animate={{ scaleX: 0 }} exit={{ scaleX: 1 }} transition={{ duration: 0.7 }}></motion.div>
				<motion.div className='out' initial={{ scaleX: 1 }} animate={{ scaleX: 0 }} exit={{ scaleX: 0 }} transition={{ duration: 0.7 }}></motion.div>
			</motion.div>
		</AnimatePresence>
	);
}
