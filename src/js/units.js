class Character {
  constructor(name, race, strength, accuracy, armor, speed) {
    this.name = name;
    this.race = race;
    this.strength = strength;
    this.accuracy = accuracy;
    this.armor = armor;
    this.speed = speed;
    this.hp = 100;
    this.armyId = null;
    this.id = null;
    this.army = [];
  }

  logAction(action) {
    const logElement = document.getElementById('logList');
    const logItem = document.createElement('li');
    logItem.textContent = action;
    logElement.prepend(logItem);
  }

  attack(target) {
    const damage = this.strength - target.armor;

    const targetDodgeChance = target.speed * 0.1; // Assuming 1% chance to dodge per point of speed
    const isDodgeSuccessful = Math.random() < targetDodgeChance;

    if (isDodgeSuccessful) {
      this.logAction(`${target.name} dodged the attack from ${this.name}`);
      return;
    }

    target.hp -= damage;

    if (target.hp <= 0) {
      this.logAction(`${this.name} defeated ${target.name}`);
    } else {
      this.logAction(`${this.name} (from army ${this.armyId}) dealt ${damage} damage to ${target.name}`);
    }
  }
}


// Максимальный урон - 20
// Максимальная точность - 10
// Максимальная броня - 10
// Максимальная скорость - 10
// ХП - 100

export class HumanWarrior extends Character {
  constructor() {
    super('Человек Воин', 'human', 12, 8, 9, 2);
    this.type = 'humanWarrior';
  }
}

export class HumanHorseman extends Character {
  constructor() {
    super('Человек Всадник', 'human', 16, 7, 7, 6);
    this.type = 'humanHorseman';
  }
}

export class Elf extends Character {
  constructor() {
    super('Эльф', 'elf', 18, 10, 8, 4);
    this.type = 'elf';
    this.arrows = 10;
    this.critChance = 0.1;
  }

  attack(target) {
    const isCrit = Math.random() < this.critChance;
    const damage = this.strength - target.armor;

    target.hp -= damage;

    if (target.hp <= 0) {
      isCrit
        ? this.logAction(`${this.name} dealt a critical hit to ${target.name}`)
        : this.logAction(`${this.name} defeated ${target.name}`);
    } else {
      this.logAction(`${this.name} dealt ${damage} damage to ${target.name}`);
    }
  }
}

export class OrcHeavy extends Character {
  constructor() {
    super('Орк Тяжеловес', 'orc', 20, 6, 10, 1);
    this.type = 'orcHeavy';
  }
}

export class OrcLight extends Character {
  constructor() {
    super('Орк Лазутчик', 'orc', 12, 9, 6, 4);
    this.type = 'orcLight';
  }
}

export class Wizard extends Character {
  constructor() {
    super('Волшебник', 'wizard', 0, 10, 0, 2);
    this.type = 'wizard';
  }

  charm(target, newAlly) {
    const charmChance = this.accuracy * 0.01; // Assuming 1% chance to charm per point of accuracy

    const isCharmSuccessful = Math.random() < charmChance;

    if (isCharmSuccessful) {

      // Remove the charmed unit from the old army

      const oldArmy = target.army;
      const oldArmyIndex = oldArmy.indexOf(target);
      oldArmy.splice(oldArmyIndex, 1);


      // Change the ally to the new wizard (or any other character from the new army)
      target.ally = newAlly;

      // Add the charmed unit to the new army
      newAlly.army.push(target);

      this.logAction(`${this.name} charmed ${target.name} to fight for their team!`);
    } else {
      this.logAction(`${this.name} attempted to charm ${target.name}, but failed!`);
    }
  }
}