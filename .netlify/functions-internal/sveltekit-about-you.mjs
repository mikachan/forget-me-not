import { init } from '../serverless.js';

export const handler = init((() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["_redirects","downloads/etude.txt","downloads/life-soyokaze.mp4","favicon.png","robots.txt"]),
	mimeTypes: {".txt":"text/plain",".mp4":"video/mp4",".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.BPtG9lph.js","app":"_app/immutable/entry/app.B02IXAEV.js","imports":["_app/immutable/entry/start.BPtG9lph.js","_app/immutable/chunks/entry.4pu-uTWe.js","_app/immutable/chunks/scheduler.Bo3Zsy8n.js","_app/immutable/chunks/index.Dj-1nGQs.js","_app/immutable/entry/app.B02IXAEV.js","_app/immutable/chunks/scheduler.Bo3Zsy8n.js","_app/immutable/chunks/index.BzCFKv-5.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('../server/nodes/0.js')),
			__memo(() => import('../server/nodes/1.js')),
			__memo(() => import('../server/nodes/3.js'))
		],
		routes: [
			{
				id: "/about-you",
				pattern: /^\/about-you\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})());
