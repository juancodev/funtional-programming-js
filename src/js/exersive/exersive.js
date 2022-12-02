// example with mutability
const addToListWithMutability = (list, item, quantity) => {
  list.push({
    item,
    quantity
  });
  return list;
};

//example with immutability
const addToListWithImmutability = (list, item, quantity) => {
  const newList = JSON.parse(JSON.stringify(list));
  newList.push({
    item,
    quantity
  });
  return newList;
};


//Modificación sin programación funcional
const a = {
  value: 2
};

const addOne = () => a.value += 1;
const timesTwo = () => a.value *= 2;

console.log(a.value); // 6

timesTwo()
addOne();

console.log(a.value) // 5

/*
  Le cambiamos el valor inicial al objeto "a";
  Para resolver el problema de mutabilidad, utilizamos la programación funcional
*/

const b = {
  value: 2
};

const addOne2 = x => Object.assign({}, x, {
  value: x.value + 1
});

const timesTwo2 = x => Object.assign({}, x, {
  value: x.value * 2
});

addOne2(b)
timesTwo2(b)

console.log(b.value);