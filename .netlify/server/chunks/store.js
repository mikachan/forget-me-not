import { w as writable } from "./index2.js";
function createTitle() {
  const { subscribe, set, update } = writable("");
  return {
    subscribe,
    set: (value) => {
      set(`${value} • Forget-me-not: a You fansite`);
    },
    clear: () => {
      set("Forget-me-not: a You fansite");
    }
  };
}
const title = createTitle();
export {
  title as t
};
