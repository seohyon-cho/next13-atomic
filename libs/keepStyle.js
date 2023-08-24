import Router from 'next/router';
export const keepStyle = (delay) => {
	Router.events.on('beforeHistoryChange', () => {
		const nodes = document.querySelectorAll('link[rel=stylesheet], style:not([media=x])');
		const copies = [...nodes].map((el) => el.cloneNode(true));

		for (let copy of copies) {
			copy.removeAttribute('data-n-p');
			copy.removeAttribute('data-n-href');
			document.head.appendChild(copy);
		}
		const handler = () => {
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
