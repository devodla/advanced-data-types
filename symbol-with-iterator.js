const kItems = Symbol("kItems")
const gene = Symbol("gene")
function* ret(ms) {
  yield new Promise(resolve => setTimeout(() => resolve(new Date().toISOString()), ms * 1000));

  yield new Promise(resolve => setTimeout(() => resolve(new Date().toISOString()), ms * 2000));
}

this[kItems] = [1, 1];

console.log(new Date().toISOString())
for (const item of this[kItems]) {
  console.log(item)
  for await (const subItem of ret(item)) {
    console.log(subItem)
  }
  this[gene] = ret(item)
  console.log(await Promise.all([...this[gene]]))
}
console.log(await Promise.all([...this[gene]]))
