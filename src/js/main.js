const compose = (...functions) => data =>
  functions.reduceRight((value, func) => func(value), data);

const attrsToString = (obj = {}) => {
  const keys = Object.keys(obj);
  const attrs = [];

  for (let i = 0; i < keys.length; i++) {
    let attr = keys[i];
    attrs.push(`${attr}="${obj[attr]}"`)
  }

  const str = attrs.join(' ');

  return str;
  // Object.keys(obj).map((attr) => `${attr}="${obj[attr]}"`).join(' ');
}

const tagAttrs = obj => (content = "") =>
  `<${obj.tag} ${obj.attrs ? '' : ''}${attrsToString(obj.attrs)}>${content}</${obj.tag}>`;

const tag = t => typeof t === 'string' ? tagAttrs({
  tag: t
}) : tagAttrs(t);

const tableRowTag = tag('tr')
const tableRow = items => compose(tableRowTag, tableCells)(items);

const tableCell = tag('td');
const tableCells = items => items.map(tableCell).join('');

const trashIcon = tag({
  tag: 'i',
  attrs: {
    class: 'fa-solid fa-trash'
  }
})('');

let description = document.getElementById('description');
let calories = document.getElementById('calories');
let carbs = document.getElementById('carbs');
let protein = document.getElementById('protein');
let tbody = document.querySelector('tbody');

let listItem = [];

const removeClass = element => {
  element.addEventListener('keydown', () => {
    element.classList.remove('is-invalid');
  });
};

removeClass(description);
removeClass(calories);
removeClass(carbs);
removeClass(protein);

const validateInputs = () => {
  description.value ? '' : description.classList.add('is-invalid');
  calories.value ? '' : calories.classList.add('is-invalid');
  carbs.value ? '' : carbs.classList.add('is-invalid');
  protein.value ? '' : protein.classList.add('is-invalid');

  if (description.value && calories.value && carbs.value && protein.value) {
    addItem();
  }
}

const addItem = () => {
  const newItem = {
    description: description.value,
    calories: parseInt(calories.value),
    carbs: parseInt(carbs.value),
    protein: parseInt(protein.value)
  }

  listItem.push(newItem);
  updateTotals();
  cleanInputs();
  renderItems();
}

const removeItem = (index) => {
  listItem.splice(index, 1);
  updateTotals();
  renderItems();
}

const updateTotals = () => {
  let calories = 0;
  let carbs = 0;
  let protein = 0;

  listItem.map(item => {
    calories += item.calories,
      carbs += item.carbs,
      protein += item.protein
  })

  document.getElementById('totalCalories').innerText = calories;
  document.getElementById('totalCarbs').innerText = carbs;
  document.getElementById('totalProtein').innerText = protein;
}

const cleanInputs = () => {
  description.value = "";
  calories.value = 0;
  carbs.value = 0;
  protein.value = 0;
}

const renderItems = () => {
  tbody.innerHTML = '';
  listItem.map((item, index) => {

    const removeButton = tag({
      tag: 'button',
      attrs: {
        class: 'btn btn-outline-danger',
        onclick: `removeItem(${index})`
      }
    })(trashIcon)
    // const row = document.createElement('tr');

    tbody.innerHTML += tableRow([
      item.description,
      item.calories,
      item.carbs,
      item.protein,
      removeButton
    ]);
  })
}