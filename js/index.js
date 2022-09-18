// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = (arr) => {
  
 fruitsList.innerHTML="";
  

  for (let i in arr) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
    const fruitLi = document.createElement('li');
    if (arr [i].color === 'фиолетовый'){
      fruitLi.className = "fruit__item fruit_violet";
    } else if (arr [i].color === 'зеленый') {
      fruitLi.className = "fruit__item fruit_green"
    } else if (arr [i].color === 'розово-красный') {
      fruitLi.className = "fruit__item fruit_carmazin"
    } else if (arr [i].color === 'желтый') {
      fruitLi.className = "fruit__item fruit_yellow"
    } else if (arr [i].color === 'светло-коричневый') {
      fruitLi.className = "fruit__item fruit_lightbrown"
    } else {
      fruitLi.className = "fruit__item fruit_added"
    };

    const div = document.createElement("div");
    div.className= "fruit__info";
    const divIndex = document.createElement ("div");
    divIndex.innerHTML= `Index: ${i}`
    div.appendChild(divIndex);
    const divKind= document.createElement ("div");
    divKind.innerHTML= `Kind: ${arr[i].kind}`
    div.appendChild(divKind);
    const divColor= document.createElement ("div");
    divColor.innerHTML=`Color: ${arr[i].color}`
    div.appendChild(divColor);
    const divWeight= document.createElement("div");
    divWeight.innerHTML=`Weight: ${arr[i].weight}`
    div.appendChild(divWeight);
    
    fruitLi.appendChild(div);
    listfruit.appendChild(fruitLi);
  }
  
};

// первая отрисовка карточек
display(fruits);

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  let fruitsCompare = fruits;

  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {
    // TODO: допишите функцию перемешивания массива
    //
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
    let i = getRandomInt (0,fruits.length-1);
    let copy = fruits[i];
    fruits.splice(i,1);
    result.push (copy);
}; 
 if (fruitsCompare === result) {
    alert ('Перемешайте заново!')
 } else {fruits = result; }
}; 

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display(fruits);
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива


filterButton.addEventListener('click', () => {
    const filterFruits = fruits.filter(item => {
    const weights = item.weight;
    let minWeight = document.querySelector('.minweight__input').value;
    let maxWeight = document.querySelector('.maxweight__input').value;
      return weights<=maxWeight && item.weight>=minWeight;
    });
    display(filterFruits);
  });





// ТЫ ЗДЕСЬ ВЫШЕ НЕ НАДО




/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки





const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
  const priority = ['желтый', 'зеленый', 'розово-красный', 'светло-коричневый', 'фиолетовый'];
  const priority1 = priority.indexOf(a.color);
  const priority2 = priority.indexOf(b.color);
  return priority1 - priority2;
};
const sortAPI = {
bubbleSort (arr, comparation)  {
  const n = arr.length;
   for (let i = 0; i < n-1; i++) { 
       for (let j = 0; j < n-1-i; j++) { 
           if (comparation(arr[j], arr[j+1])>0) { 
               let temp = arr[j+1]; 
               arr[j+1] = arr[j]; 
               arr[j] = temp; 
           }
       }
   }                 
},
   
 
quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
    arr.sort(comparation); 
  },




  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};


// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

function changeSortType() { 
  sortKindLabel.textContent = 'quickSort';
  sortKind = 'quickSort';
  sortChangeButton.removeEventListener('click', changeSortType);
  sortChangeButton.addEventListener('click', changeSortTypeBack);
  };
  
  function changeSortTypeBack() { 
    sortKindLabel.textContent = 'bubbleSort';
    sortKind = 'bubbleSort';
    sortChangeButton.removeEventListener('click', changeSortTypeBack);
    sortChangeButton.addEventListener('click', changeSortType);
  };
    
  sortChangeButton.addEventListener('click', changeSortType);

sortActionButton.addEventListener('click', () => {
  sortTimeLabel.textContent = 'sorting...';
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display(fruits);
  sortTimeLabel.textContent = sortTime;

  });

/*** ДОБАВИТЬ ФРУКТ ***/


addActionButton.addEventListener('click', () => {

  const newFruit = {};

  if (document.querySelector(".kind__input").value ==="") {
    alert('Введите название фрукта!')
    newFruit.kind = "";
  } else {
    newFruit.kind = document.querySelector(".kind__input").value;
  };

  if(document.querySelector(".color__input").value ==="") {
    alert('Введите цвет фрукта!')
    newFruit.color = "";
  } else {
  newFruit.color = document.querySelector(".color__input").value;
  };

  if (isNaN(document.querySelector(".weight__input").value)) {
    alert('Введите число в поле "Weight"!');
    newFruit.weight = "";
  } else {    
    newFruit.weight = document.querySelector(".weight__input").value;
  };
  
  fruits.push(newFruit);
  display(fruits);
});

