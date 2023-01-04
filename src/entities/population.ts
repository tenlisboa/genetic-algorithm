import { random } from "../utils";
import { Member } from "./member";

class Population {
  private mutationRate;
  public members: Member[];

  constructor(size = 1, target: any, mutationRate: number) {
    this.members = [];
    this.mutationRate = mutationRate;

    for (let i = 0; i < size; i += 1) {
      this.members.push(new Member(target));
    }
  }

  _generateMatingPoolBasedOnMembersFitness() {
    const matingPool: any[] = [];

    this.members.forEach((member) => {
      const howMuchMembersToAdd = Math.floor(member.fitness() * 100) || 1;

      for (let i = 0; i < howMuchMembersToAdd; i += 1) {
        matingPool.push(member);
      }
    });

    return matingPool;
  }

  _reproduce(matingPool: any[]) {
    for (let i = 0; i < this.members.length; i += 1) {
      const parentA = matingPool[random(0, matingPool.length)];
      const parentB = matingPool[random(0, matingPool.length)];

      const child = parentA.crossover(parentB);

      child.mutate(this.mutationRate);

      this.members[i] = child;
    }
  }

  evolve(generations: any) {
    for (let i = 0; i < generations; i += 1) {
      const pool = this._generateMatingPoolBasedOnMembersFitness();
      this._reproduce(pool);
    }
  }
}

export { Population };
