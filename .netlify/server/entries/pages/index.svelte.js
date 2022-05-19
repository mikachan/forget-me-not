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
  default: () => Routes,
  prerender: () => prerender
});
module.exports = __toCommonJS(stdin_exports);
var import_index_511eca88 = require("../../chunks/index-511eca88.js");
var import_Link_1d5c49d4 = require("../../chunks/Link-1d5c49d4.js");
const prerender = true;
const Routes = (0, import_index_511eca88.c)(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `${$$result.title = `<title>Forget-me-not | You fansite</title>`, ""}`, ""}

<p>Welcome to <strong>Forget-me-not</strong>, an <a href="${"/site/history"}">English fansite</a> dedicated to the Japanese musician, <strong>You</strong>, best known for playing guitar and violin for ${(0, import_index_511eca88.v)(import_Link_1d5c49d4.L, "Link").$$render($$result, { href: "https://gackt.com/" }, {}, {
    default: () => {
      return `Gackt`;
    }
  })} and ${(0, import_index_511eca88.v)(import_Link_1d5c49d4.L, "Link").$$render($$result, { href: "http://www.sqf.jp/" }, {}, {
    default: () => {
      return `S.Q.F`;
    }
  })}.</p>

<h2>Latest Site Updates <a href="${"/site/updates"}" class="${"text-sm"}">read more\xA0\u2192</a></h2>

<p><strong>18.05.21</strong><br>
	Luscious have announced they&#39;re going to be doing another live performance on June 17th! It&#39;ll be at Club Phase Takadanobaba in Tokyo, and will be streamed on ${(0, import_index_511eca88.v)(import_Link_1d5c49d4.L, "Link").$$render($$result, {
    href: "https://twitcasting.tv/chachamaru_yfcz"
  }, {}, {
    default: () => {
      return `TwitCasting`;
    }
  })} again. For full details, see ${(0, import_index_511eca88.v)(import_Link_1d5c49d4.L, "Link").$$render($$result, {
    href: "https://twitter.com/CHACHAMARU_YFCz/status/1394626299394625538"
  }, {}, {
    default: () => {
      return `Chacha&#39;s Twitter`;
    }
  })}.
</p>`;
});
