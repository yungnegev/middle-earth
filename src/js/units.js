import { getRandom, nameByEffect } from './utils/utils.js';

// создаю класс персонаж
// в конструкторе указываю параметры персонажа (имя, раса, сила, точность, броня, скорость)

class Character {
  constructor(name, race, strength, accuracy, armor, speed) {   
    this.name = name;               // для вывода в лог
    this.race = race;               // для алияса
    this.strength = strength;       // сила атаки (урон)
    this.accuracy = accuracy;       // как часто попадает 
    this.armor = armor;             // броня (я решил сделать как урон, но в минусб можно было процент )
    this.speed = speed;             // использую для увеличения шанса уклонения как ловкость
    this.hp = 100;                  // хп 100 у всех 
    this.armyId = null;             // для вывода в лог и для удобства
    this.id = null;                 
    this.army = [];
  }

  logAction(action) {               // метод вывода в лог
    const logElement = document.getElementById('logList');
    const logItem = document.createElement('li');
    logItem.classList.add('log-item');
    logItem.innerHTML = action;
    logElement.prepend(logItem);
  }

  attack(target) {  // метод атаки (принимает цель)
    const damage = this.strength - target.armor; // урон = сила атаки - броня цели

    // вычисляю шанс уклонения затем кидаю рандом от 1 до 100 и сравниваю с шансом уклонения
    const targetDodgeChance = target.speed * 2; 
    const accuracy = this.accuracy 
    const random = getRandom(1, 100)
    
    const totalDodgeChance = (accuracy - targetDodgeChance) * 2;

    const isDodgeSuccessful = random <= totalDodgeChance

    if (isDodgeSuccessful) {
      // красивые логи при помощи шаблонных строк
      this.logAction(`<span class="log-name">${target.name}</span>
                      <span class="log-id">[${target.id}]</span>
                      <span class="log-army">(${target.armyId === 1 ? 'Запад' : 'Восток'})</span>
                      <span class="log-dodge">увернуля</span> от атаки 
                      <span class="log-name">${nameByEffect('charm', this.name)}</span>
                      <span class="log-id">[${this.id}]</span>
                      <span class="log-army">(${this.armyId === 1 ? 'Запад' : 'Восток'})</span>
                      `);
      return; // если уклонился то выходим из функции
    }

    target.hp -= damage; // отнимаю у цели хп

    if (target.hp <= 0) { 
      this.logAction(`<span class="log-name">${this.name}</span>
                      <span class="log-id">[${this.id}]</span>
                      <span class="log-army">(${this.armyId === 1 ? 'Запад' : 'Восток'})</span>
                      <span class="log-defeated">убил</span>
                      <span class="log-name">${nameByEffect('charm', target.name)}</span>
                      <span class="log-id">[${target.id}]</span>
                      <span class="log-army">(${target.armyId === 1 ? 'Запад' : 'Восток'})</span>
      `);
    } else {
      this.logAction(`<span class="log-name">${this.name}</span>
            <span class="log-id">[${this.id}]</span>
            <span class="log-army">(${this.armyId === 1 ? 'Запад' : 'Восток'})</span>
            нанес <span class="log-damage">${damage}</span> урона
            <span class="log-name">${nameByEffect('damage', target.name)}</span>
            <span class="log-id">[${target.id}]</span>
            <span class="log-army">(${target.armyId === 1 ? 'Запад' : 'Восток'})</span>
      `);
    }
  }
}

// создаю классы персонажей наследуясь от класса персонаж
export class HumanWarrior extends Character {
  constructor() {
    super('Человек Воин', 'human', 12, 8, 9, 2);         // здесь указываю статы
    this.imgSrc = '/src/assets/images/humanWarrior.png'; // для фото
  }
}

export class HumanHorseman extends Character {
  constructor() {
    super('Человек Всадник', 'human', 16, 7, 7, 6);
    this.imgSrc = '/src/assets/images/humanHorseman.png';
  }
}

export class OrcHeavy extends Character {
  constructor() {
    super('Орк Тяжеловес', 'orc', 20, 6, 10, 1);
    this.imgSrc = '/src/assets/images/orcHeavy.png';
  }
}

export class OrcLight extends Character {
  constructor() {
    super('Орк Лазутчик', 'orc', 12, 9, 6, 4);
    this.imgSrc = '/src/assets/images/orcLight.png';
  }
}

export class Elf extends Character {
  constructor() {
    super('Эльф', 'elf', 18, 10, 8, 6);
    this.imgSrc = '/src/assets/images/elf.png';
    this.arrows = 10;     // 10 стрел
    this.critChance = 20; // 20% шанс крита (выстрела в глаз)
  }

  attack(target) { // эльфу переопределяю метод атаки
    const rng = getRandom(1, 100);
    const isCrit = rng < this.critChance; // определяю крит или нет
    const baseDamage = this.strength - target.armor;
    const critDamage = 100;

    if (this.arrows > 0) { // если стрелы есть то стреляю
      const damage = isCrit ? critDamage : baseDamage;  // если крит то урон = 100 иначе урон = сила атаки - броня цели
      target.hp -= damage;  

      this.arrows -= 1; // отнимаю стрелу

      if (target.hp <= 0) {
        isCrit // логи в зависимости от крита
          ?       this.logAction(`<span class="log-name">${this.name}</span>
          <span class="log-id">[${this.id}]</span>
          <span class="log-arrows">(🏹:${this.arrows})</span>
          <span class="log-army">(${this.armyId === 1 ? 'Запад' : 'Восток'})</span>
          <span class="log-defeated">убил</span> 
          <span class="log-name">${nameByEffect('charm', target.name)}</span>
          <span class="log-id">[${target.id}]</span>
          <span class="log-army">(${target.armyId === 1 ? 'Запад' : 'Восток'})</span>
          <span class="log-crit">выстрелом в глаз!</span>
          `)
          :       this.logAction(`<span class="log-name">${this.name}</span>
          <span class="log-id">[${this.id}]</span>
          <span class="log-arrows">(🏹:${this.arrows})</span>
          <span class="log-army">(${this.armyId === 1 ? 'Запад' : 'Восток'})</span>
          <span class="log-defeated">убил</span>
          <span class="log-name">${nameByEffect('charm', target.name)}</span>
          <span class="log-id">[${target.id}]</span>
          <span class="log-army">(${target.armyId === 1 ? 'Запад' : 'Восток'})</span>
          `);
      } else {
        this.logAction(`<span class="log-name">${this.name}</span>
                        <span class="log-id">[${this.id}]</span>
                        <span class="log-arrows">(🏹:${this.arrows})</span>
                        <span class="log-army">(${this.armyId === 1 ? 'Запад' : 'Восток'})</span>
                        нанес <span class="log-damage">${damage}</span> урона
                        <span class="log-name">${nameByEffect('damage', target.name)}</span>
                        <span class="log-id">[${target.id}]</span>
                        <span class="log-army">(${target.armyId === 1 ? 'Запад' : 'Восток'})</span>
        `);
      }
    }

    if (this.arrows === 0) { // если стрел нет то просто лог о том что стрел нет
      this.logAction(`<span class="log-name">${this.name}</span>
                      <span class="log-id">[${this.id}]</span>
                      <span class="log-army">(${this.armyId === 1 ? 'Запад' : 'Восток'})</span>
                      <span class="log-arrows">(🏹:${this.arrows})</span> остался без стрел :(
      `)
    }
  }
}

export class Wizard extends Character { // волшебник самый дисбалансный юнит
  constructor() {
    super('Волшебник', 'wizard', 0, 10, 0, 2);
    this.imgSrc = '/src/assets/images/wizard.png';
  }

  charm(target) {
    const rng = getRandom(1, 100);
    const charmChance = this.accuracy

    const isCharmSuccessful = rng <= charmChance; // 10% шанс чарма 

    if (isCharmSuccessful) {

      const myArmy = this.army;
      const targetArmy = target.army;

      const targetArmyIndex = targetArmy.indexOf(target); // нахожу индекс цели в ее армии
      targetArmy.splice(targetArmyIndex, 1);              // удаляю цель из ее армии

      target.armyId = this.armyId;                        // меняю айди армии цели на свою
      target.army = myArmy;                               // меняю армию цели на свою
      target.id = '👻'                                    // меняю айди цели на призрака (просто для узнаваемости)

      myArmy.push(target);                                // добавляю цель в свою армию
      // лог о том что чарм успешен
      this.logAction(`<span class="log-name">${this.name}</span>
          <span class="log-id">[${this.id}]</span>
          <span class="log-army">(${this.armyId === 1 ? 'Запад' : 'Восток'})</span>
          <span class="log-charmed">зачаровал</span>
          <span class="log-name">${nameByEffect('charm', target.name)}</span>
          <span class="log-id">[${target.id}]</span>
          <span class="log-army">(${target.armyId === 1 ? 'Запад' : 'Восток'})</span>, теперь он в армии 
          <span>(${this.armyId === 1 ? 'Запада' : 'Востока'})</span>!
          `);
    } else { // лог о том что чарм не успешен
      this.logAction(`<span class="log-name">${this.name}</span>
          <span class="log-id">[${this.id}]</span>
          <span class="log-army">(${this.armyId === 1 ? 'Запад' : 'Восток'})</span>
          попытался наложить чары на 
          <span class="log-name">${nameByEffect('charm', target.name)}</span>
          <span class="log-id">[${target.id}]</span>
          <span class="log-army">(${target.armyId === 1 ? 'Запад' : 'Восток'})</span> , но не смог этого сделать!
      `);
    }
  }
}