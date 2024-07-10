

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.DShcKfAj.js","_app/immutable/chunks/scheduler.Bo3Zsy8n.js","_app/immutable/chunks/index.BzCFKv-5.js","_app/immutable/chunks/Link.DQ7OeXZP.js"];
export const stylesheets = [];
export const fonts = [];
