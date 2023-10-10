import { HumanWarrior, HumanHorseman, OrcHeavy, OrcLight, Elf, Wizard } from './units.js';
import { setDelay, updateDivColorByHP } from './utils/utils.js';

const genRndArmy1 = document.getElementById('generateRandom1');
const genRndArmy2 = document.getElementById('generateRandom2');
const limit1 = document.getElementById('limit1');
const limit2 = document.getElementById('limit2');
const battleBtn = document.getElementById('battle');
const army1Div = document.getElementById('army1Display');
const army2Div = document.getElementById('army2Display');


let army1 = [];
let army2 = [];
  
function displayCharacters() {  

    army1Div.innerHTML = '';
    army2Div.innerHTML = '';
    
    army1.forEach((character, index) => {
      army1Div.innerHTML += `<div class="unit">
                              <img src="/src/assets/images/${character.type}.png" alt="${character.type}">
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
                                <img src="/src/assets/images/${character.type}.png" alt="${character.type}">
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

    const hpDivs = document.querySelectorAll('.unit__hp');
    hpDivs.forEach((div) => {
      console.log(div);
      const hp = Number(div.innerHTML);
      updateDivColorByHP(div, hp);
    });
}



function generateRandomArmy(armySize, army, pertainsTo) {
  const alliance1 = ['human', 'elf'];
  const alliance2 = ['orc'];

  const units1 = [HumanWarrior, HumanHorseman, Elf, Wizard];
  const units2 = [OrcHeavy, OrcLight, Wizard];

  const alliance = Math.random() < 0.5 ? alliance1 : alliance2;

  for (let i = 0; i < armySize; i++) {
    if (alliance === alliance1) {
      const newUnit = new units1[Math.floor(Math.random() * units1.length)]();
      newUnit.armyId = pertainsTo;
      newUnit.id = i + 1;
      newUnit.army = army;
      army.push(newUnit);
    }
    else {
      const newUnit = new units2[Math.floor(Math.random() * units2.length)]();
      newUnit.armyId = pertainsTo;
      newUnit.id = i + 1;
      newUnit.army = army;
      army.push(newUnit);
    }
  }

}

function combatPhase(attacker, defender) {
  if (attacker instanceof Wizard) {
    attacker.charm(defender, attacker);
  } else {
    attacker.attack(defender);
    if (defender.hp <= 0) {
      army1.splice(army1.indexOf(defender), 1);
      army2.splice(army2.indexOf(defender), 1);
    }
  }
  displayCharacters();
}

function playRound() {
  if (army1.length === 0 || army2.length === 0) {
    return;
  } else {
    army1.forEach((attacker) => {
      const defender = army2[Math.floor(Math.random() * army2.length)];
      combatPhase(attacker, defender);
    });
  
    army2.forEach((attacker) => {
      const defender = army1[Math.floor(Math.random() * army1.length)];
      combatPhase(attacker, defender);
    });

    checkForWin();
  }
}  

function checkForWin() {
  const logElement = document.getElementById('logList');
  const logItem = document.createElement('li');
  if (army1.length === 0) {
    logItem.textContent = 'Army 2 wins!';
    logElement.prepend(logItem);
  } else if (army2.length === 0) {
    logItem.textContent = 'Army 1 wins!';
    logElement.prepend(logItem);
  }
}


  
function addEventListeners() {
    genRndArmy1.addEventListener('click', () => {
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

    battleBtn.addEventListener('click', playRound);
}


const init = () => {
    addEventListeners();
}

init();
  