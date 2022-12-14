import { c as create_ssr_component, k as createEventDispatcher, e as escape, d as add_attribute, v as validate_component } from "./index.js";
const Waypoint_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".wrapper.svelte-142y8oi{display:inline-block}",
  map: null
};
const Waypoint = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
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
  return `<div class="${"wrapper " + escape(className, true) + " " + escape(c, true) + " svelte-142y8oi"}"${add_attribute("style", style, 0)}>${visible ? `${slots.default ? slots.default({}) : ``}` : ``}</div>`;
});
const Image_svelte_svelte_type_style_lang = "";
const css = {
  code: "img.svelte-ilz1a1.svelte-ilz1a1,canvas.svelte-ilz1a1.svelte-ilz1a1{object-position:center;position:absolute;top:0;left:0;width:100%;will-change:opacity}.blur.svelte-ilz1a1.svelte-ilz1a1{filter:blur(15px);transition:opacity 1200ms}.placeholder.svelte-ilz1a1.svelte-ilz1a1{opacity:1;width:100%;height:100%;transition:opacity 1200ms ease-out;transition-delay:0.4s}.main.svelte-ilz1a1.svelte-ilz1a1{opacity:0;transition:opacity 1200ms ease-out;transition-delay:0.4s}.loaded.svelte-ilz1a1 .placeholder.svelte-ilz1a1{opacity:0}.loaded.svelte-ilz1a1 .main.svelte-ilz1a1{opacity:1}",
  map: null
};
const Image = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  return `${validate_component(Waypoint, "Waypoint").$$render(
    $$result,
    {
      class: wrapperClass,
      style: "min-height: 100px; width: 100%;",
      once: true,
      threshold,
      offset,
      disabled: !lazy
    },
    {},
    {
      default: () => {
        return `<div style="${"position: relative; width: 100%;"}" class="${["svelte-ilz1a1", loaded ? "loaded" : ""].join(" ").trim()}"><div style="${"position: relative; overflow: hidden;"}"><div style="${"width:100%;padding-bottom:" + escape(ratio, true) + ";"}"></div>
      ${blurhash ? `<canvas class="${"placeholder svelte-ilz1a1"}"${add_attribute("width", blurhashSize.width, 0)}${add_attribute("height", blurhashSize.height, 0)}></canvas>` : `<img class="${[
          "placeholder " + escape(placeholderClass, true) + " svelte-ilz1a1",
          blur ? "blur" : ""
        ].join(" ").trim()}"${add_attribute("src", src, 0)}${add_attribute("alt", alt, 0)}>`}
      <picture><source type="${"image/webp"}"${add_attribute("srcset", srcsetWebp, 0)}${add_attribute("sizes", sizes, 0)}>
        <source${add_attribute("srcset", srcset, 0)}${add_attribute("sizes", sizes, 0)}>
        <img${add_attribute("src", src, 0)} class="${"main " + escape(c, true) + " " + escape(className, true) + " svelte-ilz1a1"}"${add_attribute("alt", alt, 0)}${add_attribute("width", width, 0)}${add_attribute("height", height, 0)}></picture></div></div>`;
      }
    }
  )}`;
});
export {
  Image as I
};
