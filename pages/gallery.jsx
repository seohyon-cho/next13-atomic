import Navbar from '@/components/molecules/navbar/Navbar';
import clsx from 'clsx';
import { useRouter } from 'next/router';

export default function Gallery() {
	return (
		<section>
			<h1>Gallery</h1>
			<Navbar data={['Find Recipe', 'Gallery', 'About']} />
		</section>
	);
}
