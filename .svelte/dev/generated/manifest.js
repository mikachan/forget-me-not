import * as layout from "../../../src/routes/$layout.svelte";

const components = [
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/music-career/index.svelte"),
	() => import("../../../src/routes/music-career/birthday-2003.svelte"),
	() => import("../../../src/routes/music-career/cains-feel.svelte"),
	() => import("../../../src/routes/music-career/you-gackt.svelte"),
	() => import("../../../src/routes/music-career/gacktjob.svelte"),
	() => import("../../../src/routes/music-career/maracas.svelte"),
	() => import("../../../src/routes/music-career/sqf.svelte"),
	() => import("../../../src/routes/where-to-buy.svelte"),
	() => import("../../../src/routes/discography/index.svelte"),
	() => import("../../../src/routes/discography/full-discography.svelte"),
	() => import("../../../src/routes/discography/life-short-film.svelte"),
	() => import("../../../src/routes/discography/nine-nine-radio.svelte"),
	() => import("../../../src/routes/discography/appearances.svelte"),
	() => import("../../../src/routes/about-you/index.svelte"),
	() => import("../../../src/routes/about-you/designs.svelte"),
	() => import("../../../src/routes/site/history.svelte"),
	() => import("../../../src/routes/site/updates.svelte"),
	() => import("../../../src/routes/site/thanks.svelte")
];

const d = decodeURIComponent;
const empty = () => ({});

export const routes = [
	// src/routes/index.svelte
[/^\/$/, [components[0]]],

// src/routes/music-career/index.svelte
[/^\/music-career\/?$/, [components[1]]],

// src/routes/music-career/birthday-2003.svelte
[/^\/music-career\/birthday-2003\/?$/, [components[2]]],

// src/routes/music-career/cains-feel.svelte
[/^\/music-career\/cains-feel\/?$/, [components[3]]],

// src/routes/music-career/you-gackt.svelte
[/^\/music-career\/you-gackt\/?$/, [components[4]]],

// src/routes/music-career/gacktjob.svelte
[/^\/music-career\/gacktjob\/?$/, [components[5]]],

// src/routes/music-career/maracas.svelte
[/^\/music-career\/maracas\/?$/, [components[6]]],

// src/routes/music-career/sqf.svelte
[/^\/music-career\/sqf\/?$/, [components[7]]],

// src/routes/where-to-buy.svelte
[/^\/where-to-buy\/?$/, [components[8]]],

// src/routes/discography/index.svelte
[/^\/discography\/?$/, [components[9]]],

// src/routes/discography/full-discography.svelte
[/^\/discography\/full-discography\/?$/, [components[10]]],

// src/routes/discography/life-short-film.svelte
[/^\/discography\/life-short-film\/?$/, [components[11]]],

// src/routes/discography/nine-nine-radio.svelte
[/^\/discography\/nine-nine-radio\/?$/, [components[12]]],

// src/routes/discography/appearances.svelte
[/^\/discography\/appearances\/?$/, [components[13]]],

// src/routes/about-you/index.svelte
[/^\/about-you\/?$/, [components[14]]],

// src/routes/about-you/designs.svelte
[/^\/about-you\/designs\/?$/, [components[15]]],

// src/routes/site/history.svelte
[/^\/site\/history\/?$/, [components[16]]],

// src/routes/site/updates.svelte
[/^\/site\/updates\/?$/, [components[17]]],

// src/routes/site/thanks.svelte
[/^\/site\/thanks\/?$/, [components[18]]]
];

export { layout };