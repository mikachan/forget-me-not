var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
__export(exports, {
  default: () => Todos,
  load: () => load
});
var import_index_430bc4f2 = __toModule(require("../../../chunks/index-430bc4f2.js"));
var index_svelte_svelte_type_style_lang = "";
const css = {
  code: `.todos.svelte-1dauu4f.svelte-1dauu4f.svelte-1dauu4f{width:100%;max-width:var(--column-width);margin:var(--column-margin-top) auto 0 auto;line-height:1}.new.svelte-1dauu4f.svelte-1dauu4f.svelte-1dauu4f{margin:0 0 0.5rem 0}input.svelte-1dauu4f.svelte-1dauu4f.svelte-1dauu4f{border:1px solid transparent}input.svelte-1dauu4f.svelte-1dauu4f.svelte-1dauu4f:focus-visible{box-shadow:inset 1px 1px 6px rgba(0, 0, 0, 0.1);border:1px solid #ff3e00 !important;outline:none}.new.svelte-1dauu4f input.svelte-1dauu4f.svelte-1dauu4f{font-size:28px;width:100%;padding:0.5em 1em 0.3em 1em;box-sizing:border-box;background:rgba(255, 255, 255, 0.05);border-radius:8px;text-align:center}.todo.svelte-1dauu4f.svelte-1dauu4f.svelte-1dauu4f{display:grid;grid-template-columns:2rem 1fr 2rem;grid-gap:0.5rem;align-items:center;margin:0 0 0.5rem 0;padding:0.5rem;background-color:white;border-radius:8px;-webkit-filter:drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.1));filter:drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.1));-webkit-transform:translate(-1px, -1px);transform:translate(-1px, -1px);transition:-webkit-filter 0.2s, -webkit-transform 0.2s;transition:filter 0.2s, transform 0.2s;transition:filter 0.2s, transform 0.2s, -webkit-filter 0.2s, -webkit-transform 0.2s}.done.svelte-1dauu4f.svelte-1dauu4f.svelte-1dauu4f{-webkit-transform:none;transform:none;opacity:0.4;-webkit-filter:drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.1));filter:drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.1))}form.text.svelte-1dauu4f.svelte-1dauu4f.svelte-1dauu4f{position:relative;display:flex;align-items:center;flex:1}.todo.svelte-1dauu4f input.svelte-1dauu4f.svelte-1dauu4f{flex:1;padding:0.5em 2em 0.5em 0.8em;border-radius:3px}.todo.svelte-1dauu4f button.svelte-1dauu4f.svelte-1dauu4f{width:2em;height:2em;border:none;background-color:transparent;background-position:50% 50%;background-repeat:no-repeat}button.toggle.svelte-1dauu4f.svelte-1dauu4f.svelte-1dauu4f{border:1px solid rgba(0, 0, 0, 0.2);border-radius:50%;box-sizing:border-box;background-size:1em auto}.done.svelte-1dauu4f .toggle.svelte-1dauu4f.svelte-1dauu4f{background-image:url("data:image/svg+xml,%3Csvg width='22' height='16' viewBox='0 0 22 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.5 1.5L7.4375 14.5L1.5 8.5909' stroke='%23676778' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")}.delete.svelte-1dauu4f.svelte-1dauu4f.svelte-1dauu4f{background-image:url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.5 5V22H19.5V5H4.5Z' fill='%23676778' stroke='%23676778' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M10 10V16.5' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M14 10V16.5' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M2 5H22' stroke='%23676778' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M8 5L9.6445 2H14.3885L16 5H8Z' fill='%23676778' stroke='%23676778' stroke-width='1.5' stroke-linejoin='round'/%3E%3C/svg%3E%0A");opacity:0.2}.delete.svelte-1dauu4f.svelte-1dauu4f.svelte-1dauu4f:hover,.delete.svelte-1dauu4f.svelte-1dauu4f.svelte-1dauu4f:focus{transition:opacity 0.2s;opacity:1}.save.svelte-1dauu4f.svelte-1dauu4f.svelte-1dauu4f{position:absolute;right:0;opacity:0;background-image:url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.5 2H3.5C2.67158 2 2 2.67157 2 3.5V20.5C2 21.3284 2.67158 22 3.5 22H20.5C21.3284 22 22 21.3284 22 20.5V3.5C22 2.67157 21.3284 2 20.5 2Z' fill='%23676778' stroke='%23676778' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M17 2V11H7.5V2H17Z' fill='white' stroke='white' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M13.5 5.5V7.5' stroke='%23676778' stroke-width='1.5' stroke-linecap='round'/%3E%3Cpath d='M5.99844 2H18.4992' stroke='%23676778' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E%0A")}.todo.svelte-1dauu4f input.svelte-1dauu4f:focus+.save.svelte-1dauu4f,.save.svelte-1dauu4f.svelte-1dauu4f.svelte-1dauu4f:focus{transition:opacity 0.2s;opacity:1}`,
  map: null
};
const load = async ({ fetch }) => {
  const res = await fetch("/todos.json");
  if (res.ok) {
    const todos = await res.json();
    return { props: { todos } };
  }
  const { message } = await res.json();
  return { error: new Error(message) };
};
const Todos = (0, import_index_430bc4f2.c)(($$result, $$props, $$bindings, slots) => {
  let { todos } = $$props;
  if ($$props.todos === void 0 && $$bindings.todos && todos !== void 0)
    $$bindings.todos(todos);
  $$result.css.add(css);
  return `${$$result.head += `${$$result.title = `<title>Todos</title>`, ""}`, ""}

<div class="${"todos svelte-1dauu4f"}"><h1>Todos</h1>

	<form class="${"new svelte-1dauu4f"}" action="${"/todos.json"}" method="${"post"}"><input name="${"text"}" aria-label="${"Add todo"}" placeholder="${"+ tap to add a todo"}" class="${"svelte-1dauu4f"}"></form>

	${(0, import_index_430bc4f2.l)(todos, (todo) => `<div class="${["todo svelte-1dauu4f", todo.done ? "done" : ""].join(" ").trim()}"><form action="${"/todos/" + (0, import_index_430bc4f2.e)(todo.uid) + ".json?_method=patch"}" method="${"post"}"><input type="${"hidden"}" name="${"done"}"${(0, import_index_430bc4f2.b)("value", todo.done ? "" : "true", 0)} class="${"svelte-1dauu4f"}">
				<button class="${"toggle svelte-1dauu4f"}" aria-label="${"Mark todo as " + (0, import_index_430bc4f2.e)(todo.done ? "not done" : "done")}"></button></form>

			<form class="${"text svelte-1dauu4f"}" action="${"/todos/" + (0, import_index_430bc4f2.e)(todo.uid) + ".json?_method=patch"}" method="${"post"}"><input aria-label="${"Edit todo"}" type="${"text"}" name="${"text"}"${(0, import_index_430bc4f2.b)("value", todo.text, 0)} class="${"svelte-1dauu4f"}">
				<button class="${"save svelte-1dauu4f"}" aria-label="${"Save todo"}"></button></form>

			<form action="${"/todos/" + (0, import_index_430bc4f2.e)(todo.uid) + ".json?_method=delete"}" method="${"post"}"><button class="${"delete svelte-1dauu4f"}" aria-label="${"Delete todo"}" ${todo.pending_delete ? "disabled" : ""}></button></form>
		</div>`)}
</div>`;
});
