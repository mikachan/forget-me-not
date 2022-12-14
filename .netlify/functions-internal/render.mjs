import { init } from '../serverless.js';

export const handler = init({
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["_redirects","downloads/etude.txt","downloads/life-soyokaze.mp4","favicon.png","robots.txt"]),
	mimeTypes: {".txt":"text/plain",".mp4":"video/mp4",".png":"image/png"},
	_: {
		entry: {"file":"_app/immutable/start-9afe1eae.js","imports":["_app/immutable/start-9afe1eae.js","_app/immutable/chunks/index-7f3551f2.js","_app/immutable/chunks/singletons-c1916556.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('../server/nodes/0.js'),
			() => import('../server/nodes/1.js')
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		}
	}
});
