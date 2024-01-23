import Navbar from '@/components/molecules/navbar/Navbar';

export default function Pages() {
	return (
		<section>
			<Navbar data={['Find Recipe', 'Gallery', 'About']} />
		</section>
	);
}
