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
      div.style.backgroundColor = '#FFA3A3';
    }
  }