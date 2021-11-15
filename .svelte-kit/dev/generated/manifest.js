const c = [
	() => import("../../../src/routes/__layout.svelte"),
	() => import("../components/error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/music-career/index.svelte"),
	() => import("../../../src/routes/music-career/birthday-2003.svelte"),
	() => import("../../../src/routes/music-career/cains-feel.svelte"),
	() => import("../../../src/routes/music-career/you-gackt.svelte"),
	() => import("../../../src/routes/music-career/gacktjob.svelte"),
	() => import("../../../src/routes/music-career/maracas.svelte"),
	() => import("../../../src/routes/music-career/sqf.svelte"),
	() => import("../../../src/routes/discography/index.svelte"),
	() => import("../../../src/routes/discography/full-discography.svelte"),
	() => import("../../../src/routes/discography/life-short-film.svelte"),
	() => import("../../../src/routes/discography/nine-nine-radio.svelte"),
	() => import("../../../src/routes/discography/appearances.svelte"),
	() => import("../../../src/routes/about-you/index.svelte"),
	() => import("../../../src/routes/about-you/designs.svelte"),
	() => import("../../../src/routes/about.svelte"),
	() => import("../../../src/routes/todos/index.svelte"),
	() => import("../../../src/routes/site/history.svelte"),
	() => import("../../../src/routes/site/updates.svelte"),
	() => import("../../../src/routes/site/thanks.svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/music-career/index.svelte
	[/^\/music-career\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/music-career/birthday-2003.svelte
	[/^\/music-career\/birthday-2003\/?$/, [c[0], c[4]], [c[1]]],

	// src/routes/music-career/cains-feel.svelte
	[/^\/music-career\/cains-feel\/?$/, [c[0], c[5]], [c[1]]],

	// src/routes/music-career/you-gackt.svelte
	[/^\/music-career\/you-gackt\/?$/, [c[0], c[6]], [c[1]]],

	// src/routes/music-career/gacktjob.svelte
	[/^\/music-career\/gacktjob\/?$/, [c[0], c[7]], [c[1]]],

	// src/routes/music-career/maracas.svelte
	[/^\/music-career\/maracas\/?$/, [c[0], c[8]], [c[1]]],

	// src/routes/music-career/sqf.svelte
	[/^\/music-career\/sqf\/?$/, [c[0], c[9]], [c[1]]],

	// src/routes/discography/index.svelte
	[/^\/discography\/?$/, [c[0], c[10]], [c[1]]],

	// src/routes/discography/full-discography.svelte
	[/^\/discography\/full-discography\/?$/, [c[0], c[11]], [c[1]]],

	// src/routes/discography/life-short-film.svelte
	[/^\/discography\/life-short-film\/?$/, [c[0], c[12]], [c[1]]],

	// src/routes/discography/nine-nine-radio.svelte
	[/^\/discography\/nine-nine-radio\/?$/, [c[0], c[13]], [c[1]]],

	// src/routes/discography/appearances.svelte
	[/^\/discography\/appearances\/?$/, [c[0], c[14]], [c[1]]],

	// src/routes/about-you/index.svelte
	[/^\/about-you\/?$/, [c[0], c[15]], [c[1]]],

	// src/routes/about-you/designs.svelte
	[/^\/about-you\/designs\/?$/, [c[0], c[16]], [c[1]]],

	// src/routes/about.svelte
	[/^\/about\/?$/, [c[0], c[17]], [c[1]]],

	// src/routes/todos/index.json.ts
	[/^\/todos\.json$/],

	// src/routes/todos/index.svelte
	[/^\/todos\/?$/, [c[0], c[18]], [c[1]]],

	// src/routes/todos/[uid].json.ts
	[/^\/todos\/([^/]+?)\.json$/],

	// src/routes/site/history.svelte
	[/^\/site\/history\/?$/, [c[0], c[19]], [c[1]]],

	// src/routes/site/updates.svelte
	[/^\/site\/updates\/?$/, [c[0], c[20]], [c[1]]],

	// src/routes/site/thanks.svelte
	[/^\/site\/thanks\/?$/, [c[0], c[21]], [c[1]]]
];

// we import the root layout/error components eagerly, so that
// connectivity errors after initialisation don't nuke the app
export const fallback = [c[0](), c[1]()];