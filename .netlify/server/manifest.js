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
  manifest: () => manifest
});
const manifest = {
  appDir: "_app",
  assets: new Set(["_redirects", "favicon.png", "robots.txt"]),
  _: {
    mime: { ".png": "image/png", ".txt": "text/plain" },
    entry: { "file": "start-f5bdc4e3.js", "js": ["start-f5bdc4e3.js", "chunks/vendor-7f64b496.js"], "css": ["assets/start-c446e5f0.css", "assets/vendor-53181f56.css"] },
    nodes: [
      () => Promise.resolve().then(() => __toModule(require("./nodes/0.js"))),
      () => Promise.resolve().then(() => __toModule(require("./nodes/1.js"))),
      () => Promise.resolve().then(() => __toModule(require("./nodes/2.js"))),
      () => Promise.resolve().then(() => __toModule(require("./nodes/3.js"))),
      () => Promise.resolve().then(() => __toModule(require("./nodes/4.js"))),
      () => Promise.resolve().then(() => __toModule(require("./nodes/5.js"))),
      () => Promise.resolve().then(() => __toModule(require("./nodes/6.js"))),
      () => Promise.resolve().then(() => __toModule(require("./nodes/7.js"))),
      () => Promise.resolve().then(() => __toModule(require("./nodes/8.js"))),
      () => Promise.resolve().then(() => __toModule(require("./nodes/9.js"))),
      () => Promise.resolve().then(() => __toModule(require("./nodes/10.js"))),
      () => Promise.resolve().then(() => __toModule(require("./nodes/11.js"))),
      () => Promise.resolve().then(() => __toModule(require("./nodes/12.js"))),
      () => Promise.resolve().then(() => __toModule(require("./nodes/13.js"))),
      () => Promise.resolve().then(() => __toModule(require("./nodes/14.js"))),
      () => Promise.resolve().then(() => __toModule(require("./nodes/15.js"))),
      () => Promise.resolve().then(() => __toModule(require("./nodes/16.js"))),
      () => Promise.resolve().then(() => __toModule(require("./nodes/17.js"))),
      () => Promise.resolve().then(() => __toModule(require("./nodes/18.js"))),
      () => Promise.resolve().then(() => __toModule(require("./nodes/19.js"))),
      () => Promise.resolve().then(() => __toModule(require("./nodes/20.js"))),
      () => Promise.resolve().then(() => __toModule(require("./nodes/21.js"))),
      () => Promise.resolve().then(() => __toModule(require("./nodes/22.js")))
    ],
    routes: [
      {
        type: "page",
        pattern: /^\/$/,
        params: null,
        path: "/",
        a: [0, 2],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/music-career\/?$/,
        params: null,
        path: "/music-career",
        a: [0, 3],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/music-career\/birthday-2003\/?$/,
        params: null,
        path: "/music-career/birthday-2003",
        a: [0, 4],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/music-career\/cains-feel\/?$/,
        params: null,
        path: "/music-career/cains-feel",
        a: [0, 5],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/music-career\/you-gackt\/?$/,
        params: null,
        path: "/music-career/you-gackt",
        a: [0, 6],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/music-career\/gacktjob\/?$/,
        params: null,
        path: "/music-career/gacktjob",
        a: [0, 7],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/music-career\/maracas\/?$/,
        params: null,
        path: "/music-career/maracas",
        a: [0, 8],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/music-career\/sqf\/?$/,
        params: null,
        path: "/music-career/sqf",
        a: [0, 9],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/where-to-buy\/?$/,
        params: null,
        path: "/where-to-buy",
        a: [0, 10],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/discography\/?$/,
        params: null,
        path: "/discography",
        a: [0, 11],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/discography\/full-discography\/?$/,
        params: null,
        path: "/discography/full-discography",
        a: [0, 12],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/discography\/life-short-film\/?$/,
        params: null,
        path: "/discography/life-short-film",
        a: [0, 13],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/discography\/nine-nine-radio\/?$/,
        params: null,
        path: "/discography/nine-nine-radio",
        a: [0, 14],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/discography\/appearances\/?$/,
        params: null,
        path: "/discography/appearances",
        a: [0, 15],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/about-you\/?$/,
        params: null,
        path: "/about-you",
        a: [0, 16],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/about-you\/designs\/?$/,
        params: null,
        path: "/about-you/designs",
        a: [0, 17],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/about\/?$/,
        params: null,
        path: "/about",
        a: [0, 18],
        b: [1]
      },
      {
        type: "endpoint",
        pattern: /^\/todos\.json$/,
        params: null,
        load: () => Promise.resolve().then(() => __toModule(require("./entries/endpoints/todos/index.json.ts.js")))
      },
      {
        type: "page",
        pattern: /^\/todos\/?$/,
        params: null,
        path: "/todos",
        a: [0, 19],
        b: [1]
      },
      {
        type: "endpoint",
        pattern: /^\/todos\/([^/]+?)\.json$/,
        params: (m) => ({ uid: m[1] }),
        load: () => Promise.resolve().then(() => __toModule(require("./entries/endpoints/todos/_uid_.json.ts.js")))
      },
      {
        type: "page",
        pattern: /^\/site\/history\/?$/,
        params: null,
        path: "/site/history",
        a: [0, 20],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/site\/updates\/?$/,
        params: null,
        path: "/site/updates",
        a: [0, 21],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/site\/thanks\/?$/,
        params: null,
        path: "/site/thanks",
        a: [0, 22],
        b: [1]
      }
    ]
  }
};
