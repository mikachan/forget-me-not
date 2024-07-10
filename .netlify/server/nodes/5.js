

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/discography/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.0NzzEjvk.js","_app/immutable/chunks/scheduler.Bo3Zsy8n.js","_app/immutable/chunks/index.BzCFKv-5.js","_app/immutable/chunks/store.DlPclBXN.js","_app/immutable/chunks/index.Dj-1nGQs.js","_app/immutable/chunks/Image.DaX1tWsV.js"];
export const stylesheets = ["_app/immutable/assets/Image.Dt0nRtnj.css"];
export const fonts = [];
