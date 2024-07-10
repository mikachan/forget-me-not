import { c as create_ssr_component, d as createEventDispatcher, e as escape, b as add_attribute, v as validate_component } from "./ssr.js";
const css$1 = {
  code: ".wrapper.svelte-142y8oi{display:inline-block}",
  map: `{"version":3,"file":"Waypoint.svelte","sources":["Waypoint.svelte"],"sourcesContent":["<script>\\n  import { createEventDispatcher, onDestroy } from 'svelte';\\n\\n  const dispatch = createEventDispatcher();\\n\\n  export let offset = 0;\\n  export let throttle = 250;\\n  export let c = '';\\n  export let style = '';\\n  export let once = true;\\n  export let threshold = 1.0;\\n  export let disabled = false;\\n\\n  let className = \\"\\";\\n  export { className as class };\\n\\n  let visible = disabled;\\n  let wasVisible = false;\\n  let intersecting = false;\\n  let removeHandlers = () => {};\\n\\n  function throttleFn(fn, time) {\\n    let last, deferTimer;\\n\\n    return () => {\\n      const now = +new Date;\\n\\n      if (last && now < last + time) {\\n        // hold on to it\\n        clearTimeout(deferTimer);\\n        deferTimer = setTimeout(function () {\\n          last = now;\\n          fn();\\n        }, time);\\n      } else {\\n        last = now;\\n        fn();\\n      }\\n    };\\n  }\\n\\n  function callEvents(wasVisible, observer, node) {\\n    if (visible && !wasVisible) {\\n      dispatch('enter');\\n      return;\\n    }\\n\\n    if (wasVisible && !intersecting) {\\n      dispatch('leave');\\n    }\\n\\n    if (once && wasVisible && !intersecting) {\\n      removeHandlers();\\n    }\\n  }\\n\\n  function waypoint(node) {\\n    if (!window || disabled) return;\\n\\n    if (window.IntersectionObserver && window.IntersectionObserverEntry) {\\n      const observer = new IntersectionObserver(([ { isIntersecting } ]) => {\\n        wasVisible = visible;\\n\\n        intersecting = isIntersecting;\\n\\n        if (wasVisible && once && !isIntersecting) {\\n          callEvents(wasVisible, observer, node);\\n          return;\\n        }\\n\\n        visible = isIntersecting;\\n\\n        callEvents(wasVisible, observer, node);\\n      }, {\\n        rootMargin: offset + 'px',\\n        threshold,\\n      });\\n\\n      observer.observe(node);\\n\\n      removeHandlers = () => observer.unobserve(node);\\n\\n      return removeHandlers;\\n    }\\n\\n    function checkIsVisible() {\\n      // Kudos https://github.com/twobin/react-lazyload/blob/master/src/index.jsx#L93\\n      if (!(node.offsetWidth || node.offsetHeight || node.getClientRects().length)) return;\\n\\n      let top;\\n      let height;\\n\\n      try {\\n        ({ top, height } = node.getBoundingClientRect());\\n      } catch (e) {\\n        ({ top, height } = defaultBoundingClientRect);\\n      }\\n\\n      const windowInnerHeight = window.innerHeight\\n        || document.documentElement.clientHeight;\\n\\n      wasVisible = visible;\\n      intersecting = (top - offset <= windowInnerHeight) &&\\n        (top + height + offset >= 0);\\n\\n      if (wasVisible && once && !isIntersecting) {\\n        callEvents(wasVisible, observer, node);\\n        return;\\n      }\\n\\n      visible = intersecting;\\n\\n      callEvents(wasVisible);\\n    }\\n\\n    checkIsVisible();\\n\\n    const throttled = throttleFn(checkIsVisible, throttle);\\n\\n    window.addEventListener('scroll', throttled);\\n    window.addEventListener('resize', throttled);\\n\\n    removeHandlers = () => {\\n      window.removeEventListener('scroll', throttled);\\n      window.removeEventListener('resize', throttled);\\n    }\\n\\n    return removeHandlers;\\n  }\\n<\/script>\\n\\n<style>\\n.wrapper {\\n  display: inline-block;\\n}\\n</style>\\n\\n<div class=\\"wrapper {className} {c}\\" {style} use:waypoint>\\n  {#if visible}\\n    <slot />\\n  {/if}\\n</div>\\n"],"names":[],"mappings":"AAoIA,uBAAS,CACP,OAAO,CAAE,YACX"}`
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
  if ($$props.offset === void 0 && $$bindings.offset && offset !== void 0) $$bindings.offset(offset);
  if ($$props.throttle === void 0 && $$bindings.throttle && throttle !== void 0) $$bindings.throttle(throttle);
  if ($$props.c === void 0 && $$bindings.c && c !== void 0) $$bindings.c(c);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0) $$bindings.style(style);
  if ($$props.once === void 0 && $$bindings.once && once !== void 0) $$bindings.once(once);
  if ($$props.threshold === void 0 && $$bindings.threshold && threshold !== void 0) $$bindings.threshold(threshold);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  $$result.css.add(css$1);
  return `<div class="${"wrapper " + escape(className, true) + " " + escape(c, true) + " svelte-142y8oi"}"${add_attribute("style", style, 0)}>${visible ? `${slots.default ? slots.default({}) : ``}` : ``}</div>`;
});
const css = {
  code: "img.svelte-ilz1a1.svelte-ilz1a1,canvas.svelte-ilz1a1.svelte-ilz1a1{object-position:center;position:absolute;top:0;left:0;width:100%;will-change:opacity}.blur.svelte-ilz1a1.svelte-ilz1a1{filter:blur(15px);transition:opacity 1200ms}.placeholder.svelte-ilz1a1.svelte-ilz1a1{opacity:1;width:100%;height:100%;transition:opacity 1200ms ease-out;transition-delay:0.4s}.main.svelte-ilz1a1.svelte-ilz1a1{opacity:0;transition:opacity 1200ms ease-out;transition-delay:0.4s}.loaded.svelte-ilz1a1 .placeholder.svelte-ilz1a1{opacity:0}.loaded.svelte-ilz1a1 .main.svelte-ilz1a1{opacity:1}",
  map: `{"version":3,"file":"Image.svelte","sources":["Image.svelte"],"sourcesContent":["<script>\\n  import { decode } from 'blurhash';\\n  import Waypoint from \\"svelte-waypoint\\";\\n\\n  export let c = \\"\\"; // deprecated\\n  export let alt = \\"\\";\\n  export let width = null;\\n  export let height = null;\\n  export let src = \\"\\";\\n  export let srcset = \\"\\";\\n  export let srcsetWebp = \\"\\";\\n  export let ratio = \\"100%\\";\\n  export let blur = true;\\n  export let sizes = \\"(max-width: 1000px) 100vw, 1000px\\";\\n  export let offset = 0;\\n  export let threshold = 1.0;\\n  export let lazy = true;\\n  export let wrapperClass = \\"\\";\\n  export let placeholderClass = \\"\\";\\n  export let blurhash = null;\\n  export let blurhashSize = null;\\n\\n  let className = \\"\\";\\n  export { className as class };\\n\\n  let loaded = !lazy;\\n\\n  function load(img) {\\n    img.onload = () => (loaded = true);\\n  }\\n\\n  function decodeBlurhash(canvas) {\\n    const pixels = decode(blurhash, blurhashSize.width, blurhashSize.height);\\n    const ctx = canvas.getContext('2d');\\n    const imageData = ctx.createImageData(blurhashSize.width, blurhashSize.height);\\n    imageData.data.set(pixels);\\n    ctx.putImageData(imageData, 0, 0);\\n  }\\n<\/script>\\n\\n<style>\\n  img, canvas {\\n    object-position: center;\\n    position: absolute;\\n    top: 0;\\n    left: 0;\\n    width: 100%;\\n    will-change: opacity;\\n  }\\n\\n  .blur {\\n    filter: blur(15px);\\n    transition: opacity 1200ms;\\n  }\\n\\n  .placeholder {\\n    opacity: 1;\\n    width: 100%;\\n    height: 100%;\\n    transition: opacity 1200ms ease-out;\\n    transition-delay: 0.4s;\\n  }\\n\\n  .main {\\n    opacity: 0;\\n    transition: opacity 1200ms ease-out;\\n    transition-delay: 0.4s;\\n  }\\n\\n  .loaded .placeholder {\\n    opacity: 0;\\n  }\\n\\n  .loaded .main {\\n    opacity: 1;\\n  }\\n</style>\\n\\n<Waypoint\\n  class=\\"{wrapperClass}\\"\\n  style=\\"min-height: 100px; width: 100%;\\"\\n  once\\n  {threshold}\\n  {offset}\\n  disabled=\\"{!lazy}\\"\\n>  \\n  <div class:loaded style=\\"position: relative; width: 100%;\\">\\n    <div style=\\"position: relative; overflow: hidden;\\">\\n      <div style=\\"width:100%;padding-bottom:{ratio};\\"></div>\\n      {#if blurhash}\\n        <canvas class=\\"placeholder\\" use:decodeBlurhash width={blurhashSize.width} height={blurhashSize.height} />\\n      {:else}\\n        <img class=\\"placeholder {placeholderClass}\\" class:blur {src} {alt} />\\n      {/if}\\n      <picture>\\n        <source type=\\"image/webp\\" srcset=\\"{srcsetWebp}\\" {sizes} />\\n        <source {srcset} {sizes} />\\n        <img\\n          {src}\\n          use:load\\n          class=\\"main {c} {className}\\"\\n          {alt}\\n          {width}\\n          {height}\\n        />\\n      </picture>\\n    </div>\\n  </div>\\n</Waypoint>\\n"],"names":[],"mappings":"AAyCE,+BAAG,CAAE,kCAAO,CACV,eAAe,CAAE,MAAM,CACvB,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,IAAI,CACX,WAAW,CAAE,OACf,CAEA,iCAAM,CACJ,MAAM,CAAE,KAAK,IAAI,CAAC,CAClB,UAAU,CAAE,OAAO,CAAC,MACtB,CAEA,wCAAa,CACX,OAAO,CAAE,CAAC,CACV,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,OAAO,CAAC,MAAM,CAAC,QAAQ,CACnC,gBAAgB,CAAE,IACpB,CAEA,iCAAM,CACJ,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,OAAO,CAAC,MAAM,CAAC,QAAQ,CACnC,gBAAgB,CAAE,IACpB,CAEA,qBAAO,CAAC,0BAAa,CACnB,OAAO,CAAE,CACX,CAEA,qBAAO,CAAC,mBAAM,CACZ,OAAO,CAAE,CACX"}`
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
  if ($$props.c === void 0 && $$bindings.c && c !== void 0) $$bindings.c(c);
  if ($$props.alt === void 0 && $$bindings.alt && alt !== void 0) $$bindings.alt(alt);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0) $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0) $$bindings.height(height);
  if ($$props.src === void 0 && $$bindings.src && src !== void 0) $$bindings.src(src);
  if ($$props.srcset === void 0 && $$bindings.srcset && srcset !== void 0) $$bindings.srcset(srcset);
  if ($$props.srcsetWebp === void 0 && $$bindings.srcsetWebp && srcsetWebp !== void 0) $$bindings.srcsetWebp(srcsetWebp);
  if ($$props.ratio === void 0 && $$bindings.ratio && ratio !== void 0) $$bindings.ratio(ratio);
  if ($$props.blur === void 0 && $$bindings.blur && blur !== void 0) $$bindings.blur(blur);
  if ($$props.sizes === void 0 && $$bindings.sizes && sizes !== void 0) $$bindings.sizes(sizes);
  if ($$props.offset === void 0 && $$bindings.offset && offset !== void 0) $$bindings.offset(offset);
  if ($$props.threshold === void 0 && $$bindings.threshold && threshold !== void 0) $$bindings.threshold(threshold);
  if ($$props.lazy === void 0 && $$bindings.lazy && lazy !== void 0) $$bindings.lazy(lazy);
  if ($$props.wrapperClass === void 0 && $$bindings.wrapperClass && wrapperClass !== void 0) $$bindings.wrapperClass(wrapperClass);
  if ($$props.placeholderClass === void 0 && $$bindings.placeholderClass && placeholderClass !== void 0) $$bindings.placeholderClass(placeholderClass);
  if ($$props.blurhash === void 0 && $$bindings.blurhash && blurhash !== void 0) $$bindings.blurhash(blurhash);
  if ($$props.blurhashSize === void 0 && $$bindings.blurhashSize && blurhashSize !== void 0) $$bindings.blurhashSize(blurhashSize);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
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
        return `<div style="position: relative; width: 100%;" class="${["svelte-ilz1a1", loaded ? "loaded" : ""].join(" ").trim()}"><div style="position: relative; overflow: hidden;"><div style="${"width:100%;padding-bottom:" + escape(ratio, true) + ";"}"></div> ${blurhash ? `<canvas class="placeholder svelte-ilz1a1"${add_attribute("width", blurhashSize.width, 0)}${add_attribute("height", blurhashSize.height, 0)}></canvas>` : `<img class="${[
          "placeholder " + escape(placeholderClass, true) + " svelte-ilz1a1",
          blur ? "blur" : ""
        ].join(" ").trim()}"${add_attribute("src", src, 0)}${add_attribute("alt", alt, 0)}>`} <picture><source type="image/webp"${add_attribute("srcset", srcsetWebp, 0)}${add_attribute("sizes", sizes, 0)}> <source${add_attribute("srcset", srcset, 0)}${add_attribute("sizes", sizes, 0)}> <img${add_attribute("src", src, 0)} class="${"main " + escape(c, true) + " " + escape(className, true) + " svelte-ilz1a1"}"${add_attribute("alt", alt, 0)}${add_attribute("width", width, 0)}${add_attribute("height", height, 0)}></picture></div></div>`;
      }
    }
  )}`;
});
export {
  Image as I
};
