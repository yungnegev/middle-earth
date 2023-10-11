import { HumanWarrior, HumanHorseman, OrcHeavy, OrcLight, Elf, Wizard } from './units.js';
import { setDelay, updateDivColorByHP, caseByQuantity, getRandom } from './utils/utils.js';

const genRndArmy1 = document.getElementById('generateRandom1');
const genRndArmy2 = document.getElementById('generateRandom2');
const limit1 = document.getElementById('limit1');
const limit2 = document.getElementById('limit2');
const battleBtn = document.getElementById('battle');
const army1Div = document.getElementById('army1Display');
const army2Div = document.getElementById('army2Display');
const autoBtn = document.getElementById('autoResolve');
const resetBtn = document.getElementById('reset');

let army1 = [];  // запад
let army2 = [];  // восток
let turn = 1;    // ход
  

// функция отображения персонажей
function displayCharacters() {  
    // очищаю дивы и добавляю в них число юнитов
    army1Div.innerHTML = `<span class="unitqty">${army1.length} ${caseByQuantity(army1.length, 'юнит', 'юнита', 'юнитов')} </span>`;
    army2Div.innerHTML = `<span class="unitqty unitqty2">${army2.length} ${caseByQuantity(army2.length, 'юнит', 'юнита', 'юнитов')}</span>`;
    // перебираю массивы с армиями и добавляю в дивы картинки и инфу о персонажах
    army1.forEach((character, index) => {
      army1Div.innerHTML += `<div class="unit">
                              <img src="${character.imgSrc}" alt="${character.type}">
                              <div class="unit-info">
                                <div class="unit__name">${character.name} ${character.id}</div>
                                <div class="unit__stats">
                                    <div>🗡️: ${character.strength}</div>
                                    <div>🎯: ${character.accuracy}</div>
                                    <div>🛡️: ${character.armor}</div>
                                    <div>🏃: ${character.speed}</div>
                                </div>
                              </div>
                              <div class="unit__hp">${character.hp}</div>
                             </div>`;
    });
  
    army2.forEach((character, index) => {
      army2Div.innerHTML +=   `<div class="unit">
                                <img src="${character.imgSrc}" alt="${character.type}">
                                <div class="unit-info">
                                  <div class="unit__name">${character.name} ${character.id}</div>
                                  <div class="unit__stats">
                                      <div>🗡️: ${character.strength}</div>
                                      <div>🎯: ${character.accuracy}</div>
                                      <div>🛡️: ${character.armor}</div>
                                      <div>🏃: ${character.speed}</div>
                                  </div>
                                </div>
                                <div class="unit__hp">${character.hp}</div>
                              </div>`;
    });

    // перебираю дивы с хп и меняю цвет в зависимости от значения хп
    const hpDivs = document.querySelectorAll('.unit__hp');
    hpDivs.forEach((div) => {
      const hp = Number(div.innerHTML);
      updateDivColorByHP(div, hp);
    });
}

// функция генерации случайной армии
// armySize - размер армии
// army - массив с армией
// pertainsTo - принадлежность армии (1 - запад, 2 - восток)
function generateRandomArmy(armySize, army, pertainsTo) {
  const alliance1 = ['human', 'elf']; // альянс 1
  const alliance2 = ['orc'];          // альянс 2

  const units1 = [HumanWarrior, HumanHorseman, Elf, Wizard]; // массивы с юнитами альянсов
  const units2 = [OrcHeavy, OrcLight, Wizard];
  const rng = getRandom(0, 100);
  const alliance =  rng < 50 ? alliance1 : alliance2; // определяю альянс рандомно

  for (let i = 0; i < armySize; i++) {
    if (alliance === alliance1) {
      const newUnit = new units1[getRandom(0, units1.length - 1)](); // рандомно выбираю юнита из массива юнитов альянса
      newUnit.armyId = pertainsTo; // присваиваю юниту принадлежность к армии
      newUnit.id = i + 1;          // присваиваю юниту id
      newUnit.army = army;         // присваиваю юниту ссылку на массив с армией
      army.push(newUnit);          // добавляю юнита в массив с армией
    }
    else {
      const newUnit = new units2[getRandom(0, units2.length - 1)]();
      newUnit.armyId = pertainsTo;
      newUnit.id = i + 1;
      newUnit.army = army;
      army.push(newUnit);
    }
  }
}

// фаза боя
function combatPhase(attacker, defender) {
  if (attacker instanceof Wizard) {
    attacker.charm(defender); // если атакующий волшебник то он чарует
  } else {
    attacker.attack(defender); // иначе атакует
    if (defender.hp <= 0) {    // если хп цели <= 0 то удаляю цель из массива с армией
      const index = defender.army.indexOf(defender);
      defender.army.splice(index, 1);
    }
  }
  displayCharacters();
}

// функция раунда
function playRound() {
  if (army1.length === 0 || army2.length === 0) { // если армия одной из сторон пуста то выхожу из функции
    return;
  } else {
    const attacker = turn === 1 
                    ? army1[getRandom(0, army1.length - 1)] 
                    : army2[getRandom(0, army2.length - 1)]; // определяю атакующего
    const defender = turn === 1 
                    ? army2[getRandom(0, army2.length - 1)] 
                    : army1[getRandom(0, army1.length - 1)]; // определяю цель

    combatPhase(attacker, defender);  // фаза боя
    turn = turn === 1 ? 2 : 1;        // меняю ход
    checkForWin();                    // проверяю победу
  }
}

// функция проверки победы
// если армия одной из сторон пуста то добавляю в лог сообщение о победе
function checkForWin() {
  const logElement = document.getElementById('logList');
  const logItem = document.createElement('li');
  logItem.classList.add('log-item');
  if (army1.length === 0) {
    logItem.innerHTML = 'Армия Востока победила!';
    logElement.prepend(logItem);
  } else if (army2.length === 0) {
    logItem.innerHTML = 'Армия Запада пбедила!';
    logElement.prepend(logItem);
  }
}

// функция автоматического решения
// пока армии не пусты играю раунды с задержкой 500 мс
async function autoResolve() {
  while (army1.length > 0 && army2.length > 0) {
    playRound();
    await setDelay(100);
  }
}

// функция сброса
// очищаю массивы с армиями и дивы с армией (оставляю логи, можно отчистить и их)
function reset() {
  army1 = [];
  army2 = [];
  army1Div.innerHTML = '';
  army2Div.innerHTML = '';
}  

// функция добавления обработчиков событий
function addEventListeners() {
    genRndArmy1.addEventListener('click', () => {  // при нажатии на кнопку генерирую армию 1 с заданным размером
      army1Div.innerHTML = '';
      army1 = [];
      const armySize = Number(limit1.value);
      generateRandomArmy(armySize, army1, 1);
      displayCharacters();
    });

    genRndArmy2.addEventListener('click', () => {
      army2Div.innerHTML = '';
      army2 = [];
      const armySize = Number(limit2.value);
      generateRandomArmy(armySize, army2, 2);
      displayCharacters();
    });

    battleBtn.addEventListener('click', playRound); // при нажатии на кнопку играю раунд

    autoBtn.addEventListener('click', autoResolve); // при нажатии на кнопку автоматически решаю

    resetBtn.addEventListener('click', reset);      // при нажатии на кнопку сбрасываю
}


const init = () => {
    addEventListeners();
}

init();
  