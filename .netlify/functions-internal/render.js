const { init } = require('../handler.js');

exports.handler = init({
	appDir: "_app",
	assets: new Set(["_redirects","downloads/etude.txt","downloads/life-soyokaze.mp4","favicon.png","robots.txt"]),
	_: {
		mime: {".txt":"text/plain",".mp4":"video/mp4",".png":"image/png"},
		entry: {"file":"start-e8b3eb41.js","js":["start-e8b3eb41.js","chunks/vendor-5060e924.js"],"css":["assets/start-c446e5f0.css","assets/vendor-53181f56.css"]},
		nodes: [
			() => Promise.resolve().then(() => require('../server/nodes/0.js')),
			() => Promise.resolve().then(() => require('../server/nodes/1.js')),
			() => Promise.resolve().then(() => require('../server/nodes/2.js')),
			() => Promise.resolve().then(() => require('../server/nodes/3.js')),
			() => Promise.resolve().then(() => require('../server/nodes/4.js')),
			() => Promise.resolve().then(() => require('../server/nodes/5.js')),
			() => Promise.resolve().then(() => require('../server/nodes/6.js')),
			() => Promise.resolve().then(() => require('../server/nodes/7.js')),
			() => Promise.resolve().then(() => require('../server/nodes/8.js')),
			() => Promise.resolve().then(() => require('../server/nodes/9.js')),
			() => Promise.resolve().then(() => require('../server/nodes/10.js')),
			() => Promise.resolve().then(() => require('../server/nodes/11.js')),
			() => Promise.resolve().then(() => require('../server/nodes/12.js')),
			() => Promise.resolve().then(() => require('../server/nodes/13.js')),
			() => Promise.resolve().then(() => require('../server/nodes/14.js')),
			() => Promise.resolve().then(() => require('../server/nodes/15.js')),
			() => Promise.resolve().then(() => require('../server/nodes/16.js')),
			() => Promise.resolve().then(() => require('../server/nodes/17.js')),
			() => Promise.resolve().then(() => require('../server/nodes/19.js')),
			() => Promise.resolve().then(() => require('../server/nodes/20.js')),
			() => Promise.resolve().then(() => require('../server/nodes/21.js')),
			() => Promise.resolve().then(() => require('../server/nodes/22.js'))
		],
		routes: [
			{
				type: 'page',
				pattern: /^\/$/,
				params: null,
				path: "/",
				a: [0,2],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/music-career\/?$/,
				params: null,
				path: "/music-career",
				a: [0,3],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/music-career\/birthday-2003\/?$/,
				params: null,
				path: "/music-career/birthday-2003",
				a: [0,4],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/music-career\/cains-feel\/?$/,
				params: null,
				path: "/music-career/cains-feel",
				a: [0,5],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/music-career\/you-gackt\/?$/,
				params: null,
				path: "/music-career/you-gackt",
				a: [0,6],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/music-career\/gacktjob\/?$/,
				params: null,
				path: "/music-career/gacktjob",
				a: [0,7],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/music-career\/maracas\/?$/,
				params: null,
				path: "/music-career/maracas",
				a: [0,8],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/music-career\/sqf\/?$/,
				params: null,
				path: "/music-career/sqf",
				a: [0,9],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/where-to-buy\/?$/,
				params: null,
				path: "/where-to-buy",
				a: [0,10],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/discography\/?$/,
				params: null,
				path: "/discography",
				a: [0,11],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/discography\/full-discography\/?$/,
				params: null,
				path: "/discography/full-discography",
				a: [0,12],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/discography\/life-short-film\/?$/,
				params: null,
				path: "/discography/life-short-film",
				a: [0,13],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/discography\/nine-nine-radio\/?$/,
				params: null,
				path: "/discography/nine-nine-radio",
				a: [0,14],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/discography\/appearances\/?$/,
				params: null,
				path: "/discography/appearances",
				a: [0,15],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/about-you\/?$/,
				params: null,
				path: "/about-you",
				a: [0,16],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/about-you\/designs\/?$/,
				params: null,
				path: "/about-you/designs",
				a: [0,17],
				b: [1]
			},
			{
				type: 'endpoint',
				pattern: /^\/todos\.json$/,
				params: null,
				load: () => Promise.resolve().then(() => require('../server/entries/endpoints/todos/index.json.ts.js'))
			},
			{
				type: 'page',
				pattern: /^\/todos\/?$/,
				params: null,
				path: "/todos",
				a: [0,18],
				b: [1]
			},
			{
				type: 'endpoint',
				pattern: /^\/todos\/([^/]+?)\.json$/,
				params: (m) => ({ uid: m[1]}),
				load: () => Promise.resolve().then(() => require('../server/entries/endpoints/todos/_uid_.json.ts.js'))
			},
			{
				type: 'page',
				pattern: /^\/site\/history\/?$/,
				params: null,
				path: "/site/history",
				a: [0,19],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/site\/updates\/?$/,
				params: null,
				path: "/site/updates",
				a: [0,20],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/site\/thanks\/?$/,
				params: null,
				path: "/site/thanks",
				a: [0,21],
				b: [1]
			}
		]
	}
});
