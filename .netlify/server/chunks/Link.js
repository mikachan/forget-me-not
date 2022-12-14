import { c as create_ssr_component, f as compute_rest_props, h as spread, i as escape_object, j as escape_attribute_value } from "./index.js";
const Link = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["href", "disabled", "outbound", "target", "rel", "download"]);
  let { href = "javascript:void(0);" } = $$props;
  let { disabled = false } = $$props;
  let { outbound = void 0 } = $$props;
  let { target = void 0 } = $$props;
  let { rel = void 0 } = $$props;
  let { download = void 0 } = $$props;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.outbound === void 0 && $$bindings.outbound && outbound !== void 0)
    $$bindings.outbound(outbound);
  if ($$props.target === void 0 && $$bindings.target && target !== void 0)
    $$bindings.target(target);
  if ($$props.rel === void 0 && $$bindings.rel && rel !== void 0)
    $$bindings.rel(rel);
  if ($$props.download === void 0 && $$bindings.download && download !== void 0)
    $$bindings.download(download);
  {
    if (typeof window !== "undefined") {
      const isExternal = new URL(href, `${location.protocol}//${location.host}`).host !== location.host;
      if (isExternal && outbound === void 0) {
        outbound = true;
      }
    }
  }
  {
    if (outbound) {
      target = "_blank";
      if (rel === void 0)
        rel = "noopener noreferrer";
    }
  }
  return `${disabled ? `<span${spread([escape_object($$restProps), { role: "link" }, { "aria-disabled": "true" }], {})}>${slots.default ? slots.default({}) : ``}</span>` : `<a${spread(
    [
      escape_object($$restProps),
      { href: escape_attribute_value(href) },
      { target: escape_attribute_value(target) },
      { rel: escape_attribute_value(rel) },
      {
        download: escape_attribute_value(download)
      }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</a>`}`;
});
export {
  Link as L
};
