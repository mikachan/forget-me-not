var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  I: () => Image
});
module.exports = __toCommonJS(stdin_exports);
var import_index_db852415 = require("./index-db852415.js");
var import_blurhash = require("blurhash");
var Waypoint_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".wrapper.svelte-pj5vj2{display:inline-block}",
  map: null
};
const Waypoint = (0, import_index_db852415.c)(($$result, $$props, $$bindings, slots) => {
  (0, import_index_db852415.j)();
  let { offset = 0 } = $$props;
  let { throttle = 250 } = $$props;
  let { c = "" } = $$props;
  let { style = "" } = $$props;
  let { once = true } = $$props;
  let { threshold = 1 } = $$props;
  let { disabled = false } = $$props;
  let { class: className = "" } = $$props;
  let visible = disabled;
  if ($$props.offset === void 0 && $$bindings.offset && offset !== void 0)
    $$bindings.offset(offset);
  if ($$props.throttle === void 0 && $$bindings.throttle && throttle !== void 0)
    $$bindings.throttle(throttle);
  if ($$props.c === void 0 && $$bindings.c && c !== void 0)
    $$bindings.c(c);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  if ($$props.once === void 0 && $$bindings.once && once !== void 0)
    $$bindings.once(once);
  if ($$props.threshold === void 0 && $$bindings.threshold && threshold !== void 0)
    $$bindings.threshold(threshold);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  $$result.css.add(css$1);
  return `<div class="${"wrapper " + (0, import_index_db852415.e)(className, true) + " " + (0, import_index_db852415.e)(c, true) + " svelte-pj5vj2"}"${(0, import_index_db852415.b)("style", style, 0)}>${visible ? `${slots.default ? slots.default({}) : ``}` : ``}</div>`;
});
var Image_svelte_svelte_type_style_lang = "";
const css = {
  code: "img.svelte-uco8jw.svelte-uco8jw,canvas.svelte-uco8jw.svelte-uco8jw{-o-object-position:center;object-position:center;position:absolute;top:0;left:0;width:100%;will-change:opacity}.blur.svelte-uco8jw.svelte-uco8jw{-webkit-filter:blur(15px);filter:blur(15px);transition:opacity 1200ms}.placeholder.svelte-uco8jw.svelte-uco8jw{opacity:1;width:100%;height:100%;transition:opacity 1200ms ease-out;transition-delay:0.4s}.main.svelte-uco8jw.svelte-uco8jw{opacity:0;transition:opacity 1200ms ease-out;transition-delay:0.4s}.loaded.svelte-uco8jw .placeholder.svelte-uco8jw{opacity:0}.loaded.svelte-uco8jw .main.svelte-uco8jw{opacity:1}",
  map: null
};
const Image = (0, import_index_db852415.c)(($$result, $$props, $$bindings, slots) => {
  let { c = "" } = $$props;
  let { alt = "" } = $$props;
  let { width = null } = $$props;
  let { height = null } = $$props;
  let { src = "" } = $$props;
  let { srcset = "" } = $$props;
  let { srcsetWebp = "" } = $$props;
  let { ratio = "100%" } = $$props;
  let { blur = true } = $$props;
  let { sizes = "(max-width: 1000px) 100vw, 1000px" } = $$props;
  let { offset = 0 } = $$props;
  let { threshold = 1 } = $$props;
  let { lazy = true } = $$props;
  let { wrapperClass = "" } = $$props;
  let { placeholderClass = "" } = $$props;
  let { blurhash = null } = $$props;
  let { blurhashSize = null } = $$props;
  let { class: className = "" } = $$props;
  let loaded = !lazy;
  if ($$props.c === void 0 && $$bindings.c && c !== void 0)
    $$bindings.c(c);
  if ($$props.alt === void 0 && $$bindings.alt && alt !== void 0)
    $$bindings.alt(alt);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  if ($$props.src === void 0 && $$bindings.src && src !== void 0)
    $$bindings.src(src);
  if ($$props.srcset === void 0 && $$bindings.srcset && srcset !== void 0)
    $$bindings.srcset(srcset);
  if ($$props.srcsetWebp === void 0 && $$bindings.srcsetWebp && srcsetWebp !== void 0)
    $$bindings.srcsetWebp(srcsetWebp);
  if ($$props.ratio === void 0 && $$bindings.ratio && ratio !== void 0)
    $$bindings.ratio(ratio);
  if ($$props.blur === void 0 && $$bindings.blur && blur !== void 0)
    $$bindings.blur(blur);
  if ($$props.sizes === void 0 && $$bindings.sizes && sizes !== void 0)
    $$bindings.sizes(sizes);
  if ($$props.offset === void 0 && $$bindings.offset && offset !== void 0)
    $$bindings.offset(offset);
  if ($$props.threshold === void 0 && $$bindings.threshold && threshold !== void 0)
    $$bindings.threshold(threshold);
  if ($$props.lazy === void 0 && $$bindings.lazy && lazy !== void 0)
    $$bindings.lazy(lazy);
  if ($$props.wrapperClass === void 0 && $$bindings.wrapperClass && wrapperClass !== void 0)
    $$bindings.wrapperClass(wrapperClass);
  if ($$props.placeholderClass === void 0 && $$bindings.placeholderClass && placeholderClass !== void 0)
    $$bindings.placeholderClass(placeholderClass);
  if ($$props.blurhash === void 0 && $$bindings.blurhash && blurhash !== void 0)
    $$bindings.blurhash(blurhash);
  if ($$props.blurhashSize === void 0 && $$bindings.blurhashSize && blurhashSize !== void 0)
    $$bindings.blurhashSize(blurhashSize);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  $$result.css.add(css);
  return `${(0, import_index_db852415.v)(Waypoint, "Waypoint").$$render($$result, {
    class: wrapperClass,
    style: "min-height: 100px; width: 100%;",
    once: true,
    threshold,
    offset,
    disabled: !lazy
  }, {}, {
    default: () => {
      return `<div style="${"position: relative; width: 100%;"}" class="${["svelte-uco8jw", loaded ? "loaded" : ""].join(" ").trim()}"><div style="${"position: relative; overflow: hidden;"}"><div style="${"width:100%;padding-bottom:" + (0, import_index_db852415.e)(ratio, true) + ";"}"></div>
      ${blurhash ? `<canvas class="${"placeholder svelte-uco8jw"}"${(0, import_index_db852415.b)("width", blurhashSize.width, 0)}${(0, import_index_db852415.b)("height", blurhashSize.height, 0)}></canvas>` : `<img class="${[
        "placeholder " + (0, import_index_db852415.e)(placeholderClass, true) + " svelte-uco8jw",
        blur ? "blur" : ""
      ].join(" ").trim()}"${(0, import_index_db852415.b)("src", src, 0)}${(0, import_index_db852415.b)("alt", alt, 0)}>`}
      <picture><source type="${"image/webp"}"${(0, import_index_db852415.b)("srcset", srcsetWebp, 0)}${(0, import_index_db852415.b)("sizes", sizes, 0)}>
        <source${(0, import_index_db852415.b)("srcset", srcset, 0)}${(0, import_index_db852415.b)("sizes", sizes, 0)}>
        <img${(0, import_index_db852415.b)("src", src, 0)} class="${"main " + (0, import_index_db852415.e)(c, true) + " " + (0, import_index_db852415.e)(className, true) + " svelte-uco8jw"}"${(0, import_index_db852415.b)("alt", alt, 0)}${(0, import_index_db852415.b)("width", width, 0)}${(0, import_index_db852415.b)("height", height, 0)}></picture></div></div>`;
    }
  })}`;
});
