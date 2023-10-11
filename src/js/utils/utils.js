export const setDelay = (delay) => {
    return new Promise((resolve) => {
        setTimeout(() => {
        resolve();
        }, delay);
    });
};

export const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const caseByQuantity = (quantity, one, two, five) => {
    if (quantity % 10 === 1 && quantity % 100 !== 11) {
        return one;
    } else if (quantity % 10 >= 2 && quantity % 10 <= 4 && (quantity % 100 < 10 || quantity % 100 >= 20)) {
        return two;
    } else {
        return five;
    }
}

export const updateDivColorByHP = (div, hp) => {
    if(hp > 75) {
      div.style.backgroundColor = '#77D977';
    }
    if(hp <= 75 && hp > 50) {
      div.style.backgroundColor = '#8ACC8A';
    }
    if(hp <= 50 && hp > 25) {
      div.style.backgroundColor = '#ffe24f';
    }
    if(hp <= 25) {
      div.style.backgroundColor = '#ff4343';
    }
}

export const nameByEffect = (effect, name) => {
  const names = {
    1: 'Человек Воин',
    2: 'Человек Всадник',
    3: 'Эльф',
    4: 'Орк Тяжеловес',
    5: 'Орк Лазутчик',
    6: 'Волшебник',
  }

  if (effect === 'damage') {
    switch (name) {
      case names[1]:
        return 'Человеку Воину';
      case names[2]:
        return 'Человеку Всаднику';
      case names[3]:
        return 'Эльфу';
      case names[4]:
        return 'Орку Тяжеловесу';
      case names[5]:
        return 'Орку Лазутчику';
      case names[6]:
        return 'Волшебнику';
      default:
        return '';
    }
  } else if (effect === 'charm') {
    switch (name) {
      case names[1]:
        return 'Человека Воина';
      case names[2]:
        return 'Человека Всадника';
      case names[3]:
        return 'Эльфа';
      case names[4]:
        return 'Орка Тяжеловеса';
      case names[5]:
        return 'Орка Лазутчика';
      case names[6]:
        return 'Волшебника';
      default:
        return '';
    }
  } else {
    return '';
  }
}
