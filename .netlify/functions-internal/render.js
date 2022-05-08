const { init } = require('../serverless.js');

exports.handler = init({
	appDir: "_app",
	assets: new Set(["_redirects","downloads/etude.txt","downloads/life-soyokaze.mp4","favicon.png","robots.txt"]),
	mimeTypes: {".txt":"text/plain",".mp4":"video/mp4",".png":"image/png"},
	_: {
		entry: {"file":"start-fa5584ab.js","js":["start-fa5584ab.js","chunks/index-ec6d3f23.js","chunks/index-aca68f77.js"],"css":[]},
		nodes: [
			() => Promise.resolve().then(() => require('../server/nodes/0.js')),
			() => Promise.resolve().then(() => require('../server/nodes/1.js')),
			() => Promise.resolve().then(() => require('../server/nodes/7.js')),
			() => Promise.resolve().then(() => require('../server/nodes/8.js')),
			() => Promise.resolve().then(() => require('../server/nodes/10.js')),
			() => Promise.resolve().then(() => require('../server/nodes/14.js')),
			() => Promise.resolve().then(() => require('../server/nodes/15.js')),
			() => Promise.resolve().then(() => require('../server/nodes/17.js')),
			() => Promise.resolve().then(() => require('../server/nodes/18.js')),
			() => Promise.resolve().then(() => require('../server/nodes/19.js'))
		],
		routes: [
			{
				type: 'page',
				id: "discography/life-short-film",
				pattern: /^\/discography\/life-short-film\/?$/,
				names: [],
				types: [],
				path: "/discography/life-short-film",
				shadow: null,
				a: [0,2],
				b: [1]
			},
			{
				type: 'page',
				id: "discography/nine-nine-radio",
				pattern: /^\/discography\/nine-nine-radio\/?$/,
				names: [],
				types: [],
				path: "/discography/nine-nine-radio",
				shadow: null,
				a: [0,3],
				b: [1]
			},
			{
				type: 'page',
				id: "music-career/birthday-2003",
				pattern: /^\/music-career\/birthday-2003\/?$/,
				names: [],
				types: [],
				path: "/music-career/birthday-2003",
				shadow: null,
				a: [0,4],
				b: [1]
			},
			{
				type: 'page',
				id: "music-career/maracas",
				pattern: /^\/music-career\/maracas\/?$/,
				names: [],
				types: [],
				path: "/music-career/maracas",
				shadow: null,
				a: [0,5],
				b: [1]
			},
			{
				type: 'page',
				id: "music-career/sqf",
				pattern: /^\/music-career\/sqf\/?$/,
				names: [],
				types: [],
				path: "/music-career/sqf",
				shadow: null,
				a: [0,6],
				b: [1]
			},
			{
				type: 'page',
				id: "site/history",
				pattern: /^\/site\/history\/?$/,
				names: [],
				types: [],
				path: "/site/history",
				shadow: null,
				a: [0,7],
				b: [1]
			},
			{
				type: 'page',
				id: "site/thanks",
				pattern: /^\/site\/thanks\/?$/,
				names: [],
				types: [],
				path: "/site/thanks",
				shadow: null,
				a: [0,8],
				b: [1]
			},
			{
				type: 'page',
				id: "site/updates",
				pattern: /^\/site\/updates\/?$/,
				names: [],
				types: [],
				path: "/site/updates",
				shadow: null,
				a: [0,9],
				b: [1]
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
});
