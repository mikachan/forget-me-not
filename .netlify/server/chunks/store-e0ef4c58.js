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
  t: () => title
});
module.exports = __toCommonJS(stdin_exports);
var import_index_652f602f = require("./index-652f602f.js");
function createTitle() {
  const { subscribe, set, update } = (0, import_index_652f602f.w)("");
  return {
    subscribe,
    set: (value) => {
      set(`${value} \u2022 Forget-me-not: a You fansite`);
    },
    clear: () => {
      set("Forget-me-not: a You fansite");
    }
  };
}
const title = createTitle();
