const { init } = require('../serverless.js');

exports.handler = init({
	appDir: "_app",
	assets: new Set(["_redirects","downloads/etude.txt","downloads/life-soyokaze.mp4","favicon.png","robots.txt"]),
	mimeTypes: {".txt":"text/plain",".mp4":"video/mp4",".png":"image/png"},
	_: {
		entry: {"file":"start-545e6fb9.js","js":["start-545e6fb9.js","chunks/index-981bb7d4.js","chunks/index-9ae8fc66.js"],"css":[]},
		nodes: [
			() => Promise.resolve().then(() => require('../server/nodes/0.js')),
			() => Promise.resolve().then(() => require('../server/nodes/1.js')),
			() => Promise.resolve().then(() => require('../server/nodes/10.js')),
			() => Promise.resolve().then(() => require('../server/nodes/3.js')),
			() => Promise.resolve().then(() => require('../server/nodes/7.js')),
			() => Promise.resolve().then(() => require('../server/nodes/14.js')),
			() => Promise.resolve().then(() => require('../server/nodes/21.js')),
			() => Promise.resolve().then(() => require('../server/nodes/22.js')),
			() => Promise.resolve().then(() => require('../server/nodes/2.js')),
			() => Promise.resolve().then(() => require('../server/nodes/5.js')),
			() => Promise.resolve().then(() => require('../server/nodes/6.js')),
			() => Promise.resolve().then(() => require('../server/nodes/8.js')),
			() => Promise.resolve().then(() => require('../server/nodes/9.js')),
			() => Promise.resolve().then(() => require('../server/nodes/11.js')),
			() => Promise.resolve().then(() => require('../server/nodes/12.js')),
			() => Promise.resolve().then(() => require('../server/nodes/13.js')),
			() => Promise.resolve().then(() => require('../server/nodes/15.js')),
			() => Promise.resolve().then(() => require('../server/nodes/16.js')),
			() => Promise.resolve().then(() => require('../server/nodes/17.js')),
			() => Promise.resolve().then(() => require('../server/nodes/18.js')),
			() => Promise.resolve().then(() => require('../server/nodes/19.js')),
			() => Promise.resolve().then(() => require('../server/nodes/20.js'))
		],
		routes: [
			{
				type: 'page',
				id: "",
				pattern: /^\/$/,
				names: [],
				types: [],
				path: "/",
				shadow: null,
				a: [0,2],
				b: [1]
			},
			{
				type: 'endpoint',
				id: "todos.json",
				pattern: /^\/todos\.json$/,
				names: [],
				types: [],
				load: () => Promise.resolve().then(() => require('../server/entries/endpoints/todos/index.json.ts.js'))
			},
			{
				type: 'page',
				id: "about-you",
				pattern: /^\/about-you\/?$/,
				names: [],
				types: [],
				path: "/about-you",
				shadow: null,
				a: [0,3],
				b: [1]
			},
			{
				type: 'page',
				id: "discography",
				pattern: /^\/discography\/?$/,
				names: [],
				types: [],
				path: "/discography",
				shadow: null,
				a: [0,4],
				b: [1]
			},
			{
				type: 'page',
				id: "music-career",
				pattern: /^\/music-career\/?$/,
				names: [],
				types: [],
				path: "/music-career",
				shadow: null,
				a: [0,5],
				b: [1]
			},
			{
				type: 'page',
				id: "todos",
				pattern: /^\/todos\/?$/,
				names: [],
				types: [],
				path: "/todos",
				shadow: null,
				a: [0,6],
				b: [1]
			},
			{
				type: 'page',
				id: "where-to-buy",
				pattern: /^\/where-to-buy\/?$/,
				names: [],
				types: [],
				path: "/where-to-buy",
				shadow: null,
				a: [0,7],
				b: [1]
			},
			{
				type: 'page',
				id: "about-you/designs",
				pattern: /^\/about-you\/designs\/?$/,
				names: [],
				types: [],
				path: "/about-you/designs",
				shadow: null,
				a: [0,8],
				b: [1]
			},
			{
				type: 'page',
				id: "discography/appearances",
				pattern: /^\/discography\/appearances\/?$/,
				names: [],
				types: [],
				path: "/discography/appearances",
				shadow: null,
				a: [0,9],
				b: [1]
			},
			{
				type: 'page',
				id: "discography/full-discography",
				pattern: /^\/discography\/full-discography\/?$/,
				names: [],
				types: [],
				path: "/discography/full-discography",
				shadow: null,
				a: [0,10],
				b: [1]
			},
			{
				type: 'page',
				id: "discography/life-short-film",
				pattern: /^\/discography\/life-short-film\/?$/,
				names: [],
				types: [],
				path: "/discography/life-short-film",
				shadow: null,
				a: [0,11],
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
				a: [0,12],
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
				a: [0,13],
				b: [1]
			},
			{
				type: 'page',
				id: "music-career/cains-feel",
				pattern: /^\/music-career\/cains-feel\/?$/,
				names: [],
				types: [],
				path: "/music-career/cains-feel",
				shadow: null,
				a: [0,14],
				b: [1]
			},
			{
				type: 'page',
				id: "music-career/gacktjob",
				pattern: /^\/music-career\/gacktjob\/?$/,
				names: [],
				types: [],
				path: "/music-career/gacktjob",
				shadow: null,
				a: [0,15],
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
				a: [0,16],
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
				a: [0,17],
				b: [1]
			},
			{
				type: 'page',
				id: "music-career/you-gackt",
				pattern: /^\/music-career\/you-gackt\/?$/,
				names: [],
				types: [],
				path: "/music-career/you-gackt",
				shadow: null,
				a: [0,18],
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
				a: [0,19],
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
				a: [0,20],
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
				a: [0,21],
				b: [1]
			},
			{
				type: 'endpoint',
				id: "todos/[uid].json",
				pattern: /^\/todos\/([^/]+?)\.json$/,
				names: ["uid"],
				types: [null],
				load: () => Promise.resolve().then(() => require('../server/entries/endpoints/todos/_uid_.json.ts.js'))
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
});
