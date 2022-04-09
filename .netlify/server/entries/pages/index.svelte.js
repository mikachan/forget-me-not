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
  default: () => Routes
});
var import_index_9861661c = __toModule(require("../../chunks/index-9861661c.js"));
var import_Link_d40f893b = __toModule(require("../../chunks/Link-d40f893b.js"));
const Routes = (0, import_index_9861661c.c)(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `${$$result.title = `<title>Forget-me-not | You fansite</title>`, ""}`, ""}

<p>Welcome to <strong>Forget-me-not</strong>, an <a href="${"site/history"}">English fansite</a> dedicated to the Japanese musician, <strong>You</strong>, best known for playing guitar and violin for ${(0, import_index_9861661c.v)(import_Link_d40f893b.L, "Link").$$render($$result, { href: "https://gackt.com/" }, {}, {
    default: () => {
      return `Gackt`;
    }
  })} and ${(0, import_index_9861661c.v)(import_Link_d40f893b.L, "Link").$$render($$result, { href: "http://www.sqf.jp/" }, {}, {
    default: () => {
      return `S.Q.F`;
    }
  })}.</p>

<h2>Latest Site Updates <a href="${"site/updates"}" class="${"text-sm"}">read more\xA0\u2192</a></h2>

<p><strong>18.05.21</strong><br>
	Luscious have announced they&#39;re going to be doing another live performance on June 17th! It&#39;ll be at Club Phase Takadanobaba in Tokyo, and will be streamed on ${(0, import_index_9861661c.v)(import_Link_d40f893b.L, "Link").$$render($$result, {
    href: "https://twitcasting.tv/chachamaru_yfcz"
  }, {}, {
    default: () => {
      return `TwitCasting`;
    }
  })} again. For full details, see ${(0, import_index_9861661c.v)(import_Link_d40f893b.L, "Link").$$render($$result, {
    href: "https://twitter.com/CHACHAMARU_YFCz/status/1394626299394625538"
  }, {}, {
    default: () => {
      return `Chacha&#39;s Twitter`;
    }
  })}.
</p>`;
});
