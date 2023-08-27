import Router from 'next/router';

export const keepStyle = (delay) => {
	console.log('keepStyle');
	Router.events.on('beforeHistoryChange', () => {
		const nodes = document.querySelectorAll('link[rel=stylesheet], style');
		const copies = [...nodes].map((el) => el.cloneNode(true));

		for (let copy of copies) {
			//static하게 연결되는 스타일 (next제거안함)
			copy.removeAttribute('data-n-g');
			//dynamic하게 연결되는 스타일 (컴포넌트 언마운트시 next가 제거)
			copy.removeAttribute('data-n-href');
			copy.removeAttribute('data-n-p');
			copy.removeAttribute('media');
			document.head.appendChild(copy);
		}
		const handler = () => {
			console.log('handler');
			Router.events.off('routeChangeComplete', handler);
			window.setTimeout(() => {
				for (let copy of copies) {
					document.head.removeChild(copy);
				}
			}, delay);
		};
		Router.events.on('routeChangeComplete', handler);
	});
};
