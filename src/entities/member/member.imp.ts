import { generateLetter, random } from "../../utils";
import { Member } from "./member";

class MemberImp implements Member {
  private target;
  public keys;

  constructor(target: any) {
    this.target = target;
    this.keys = [];

    for (let i = 0; i < target.length; i += 1) {
      this.keys[i] = generateLetter();
    }
  }

  fitness(callback: Member.Fitness.Input): Member.Fitness.Output {
    return callback(this);
  }

  crossover(partner: Member) {
    const { length } = this.target;
    const child = new MemberImp(this.target);
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

  mutate(mutationRate: number) {
    for (let i = 0; i < this.keys.length; i += 1) {
      if (Math.random() < mutationRate) {
        this.keys[i] = generateLetter();
      }
    }
  }
}

export { MemberImp };
