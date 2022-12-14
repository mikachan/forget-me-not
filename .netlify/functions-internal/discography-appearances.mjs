import { init } from '../serverless.js';

export const handler = init({
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["_redirects","downloads/etude.txt","downloads/life-soyokaze.mp4","favicon.png","robots.txt"]),
	mimeTypes: {".txt":"text/plain",".mp4":"video/mp4",".png":"image/png"},
	_: {
		entry: {"file":"_app/immutable/start-6883edec.js","imports":["_app/immutable/start-6883edec.js","_app/immutable/chunks/index-b9e6f8c5.js","_app/immutable/chunks/singletons-eb5410fd.js","_app/immutable/chunks/index-07cc4148.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('../server/nodes/0.js'),
			() => import('../server/nodes/1.js'),
			() => import('../server/nodes/6.js')
		],
		routes: [
			{
				id: "/discography/appearances",
				pattern: /^\/discography\/appearances\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
});
