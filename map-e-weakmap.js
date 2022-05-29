const assert = require("assert");
const { isMap } = require("util/types");
const myMap = new Map();

myMap
  .set(1, "one")
  .set("Erick", { text: "two" })
  .set(true, () => "hello");

// usando um constructor
const myMapWithConstructor = new Map([
  ["1", "str1"],
  [1, "num1"],
  [true, "bool1"],
]);

// console.log("myMap", myMap);
// console.log("myMap.get(1)", myMap.get(1));
assert.deepStrictEqual(myMap.get(1), "one");
assert.deepStrictEqual(myMap.get("Erick"), { text: "two" });
assert.deepStrictEqual(myMap.get(true)(), "hello");

// em objects a chave so pode ser string ou symbol (number é corregido a string)
const onlyRefereceWorks = { id: 1 };
myMap.set(onlyRefereceWorks, { name: "Erick Wendel" });

assert.deepStrictEqual(myMap.get({ id: 1 }), undefined);
assert.deepStrictEqual(myMap.get(onlyRefereceWorks), { name: "Erick Wendel" });

// utilitarios
// - no object seria Object.keys({ a:1 }).length
assert.deepStrictEqual(myMap.size, 4);

// para verificar se um item existe no objeto
// item.key = se nao existe = undefined
// if() = coercao implicita para boolean e retorna false
// o jeito certo em Object é ({name: 'Erick'}).hasOwnProperty('name')
assert.ok(myMap.has(onlyRefereceWorks));
// console.log(myMap.has(onlyRefereceWorks));
// console.log(myMap.get(onlyRefereceWorks).hasOwnProperty("name"));
assert.deepStrictEqual(myMap.get(onlyRefereceWorks).hasOwnProperty("name"), true);
assert.ok(myMap.get(onlyRefereceWorks).hasOwnProperty("name"));

// Para remover um item do objeto
// delete item.id
// imperformatico para o javascript
assert.ok(myMap.delete(onlyRefereceWorks));

// mas da para iterar em objects diferentemente
// tem que transformar com o Object.entries(item)
assert.deepStrictEqual(
  JSON.stringify([...myMap]),
  JSON.stringify([
    [1, "one"],
    ["Erick", { text: "two" }],
    [true, () => {}],
  ])
);

// for (const [key, value] of myMap) {
//   console.log({ key, value });
// }

// Object é inseguro, pois dependendo do nome da chave, pode substituir algum comportamento padrao
// ({}).toString() === '[object Object]'
// ({toString: () => 'Hey'}).toString() === 'Hey'

// qualquer chave pode colidir, com as propiedades heredadas do objecto, como
// constructor, toString, valueOf e etc.
const actor = {
  name: "Xuxa da Silva",
  toString: () => "Queen: Xuxa da Silva",
};

const desa = new Map([
  ["toString", "te peguei"],
  ["des", 12],
]);
// nao tem restricao de nome chave
myMap.set(actor, actor);
myMap.set(12, desa);

assert.ok(myMap.has(actor));
// assert.throws(() => myMap.get(actor).toString(), TypeError);
// console.log(myMap.get(actor).toString());
console.log(myMap.get(12).des);
console.log(actor.toString());

// assert.deepStrictEqual(typeof myMap.get(actor), "number");
// assert.deepStrictEqual(typeof myMap.get(actor).toString(), "string");
// assert.deepStrictEqual(myMap.get("toString")(), "dehde");
// console.log(myMap.get(desa).toString());
// console.log(myMap.get(desa));
// console.log(myMap.get(actor).toString());
// console.log(myMap.get(desa).des);
