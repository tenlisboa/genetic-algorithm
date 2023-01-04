import { generateLetter, random } from "../utils.js";

class Member {
  constructor(target) {
    this.target = target;
    this.keys = [];

    for (let i = 0; i < target.length; i += 1) {
      this.keys[i] = generateLetter();
    }
  }

  /*
    For refactoring, let the users decide its fitness
  */
  // fitness(callback) {
  //   return callback(this);
  // }

  fitness() {
    let match = 0;

    for (let i = 0; i < this.keys.length; i++) {
      if (this.keys[i] === this.target[i]) {
        match += 1;
      }
    }

    return match / this.target.length;
  }

  crossover(partner) {
    const { length } = this.target;
    const child = new Member(this.target);
    const midpoint = random(0, length);

    for (let i = 0; i < length; i += 1) {
      if (i > midpoint) {
        child.keys[i] = this.keys[i];
      } else {
        child.keys[i] = partner.keys[i];
      }
    }

    return child;
  }

  mutate(mutationRate) {
    for (let i = 0; i < this.keys.length; i += 1) {
      if (Math.random() < mutationRate) {
        this.keys[i] = generateLetter();
      }
    }
  }
}

export { Member };
