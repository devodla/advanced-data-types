const assert = require("assert");

// --- keys
const uniqueKey = Symbol("userName");
const user = {};

user["userName"] = "value for normal Objects";
user[uniqueKey] = "value for symbol";

assert.deepStrictEqual(user.userName, "value for normal Objects");
// sempre unico em nivel de endereco de memoria
assert.deepStrictEqual(user[Symbol("userName")], undefined);
assert.deepStrictEqual(user[uniqueKey], "value for symbol");

// e dificil de pegar, mas nao e secreto! qualquer pessoa debugando consigue ver
assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey);

// byPass - ma pratica (nem tem no codebase de node)
user[Symbol.for("password")] = 123;
assert.deepStrictEqual(user[Symbol.for("password")], 123);

// well know symbols
const obj = {
  [Symbol.iterator]: () => ({
    items: ["c", "b", "a"],
    next() {
      return {
        done: this.items.length === 0,
        // remove o ultimo e retorna
        value: this.items.pop(),
      };
    },
  }),
};

// for (const item of obj) {
//   console.log("item", item);
// }

assert.deepStrictEqual([...obj], ["a", "b", "c"]);
