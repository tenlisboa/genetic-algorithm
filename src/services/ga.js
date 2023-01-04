import { Population } from "../entities/population.js";

class GA {
  constructor(target, populationSize, mutationRate) {
    this.fitnessFunc = null;

    this.target = target;
    this.populationSize = populationSize;
    this.mutationRate = mutationRate;
  }

  setFitnessFunc(fn) {
    this.fitnessFunc = fn;
  }

  run() {
    const population = new Population(
      this.populationSize,
      this.target,
      this.mutationRate
    );

    let membersKeysTotal = [];
    let perfectCandidatesNum = 0;
    while (perfectCandidatesNum <= 0) {
      population.evolve(20);
      const membersKeys = population.members.map((member) =>
        member.keys.join("")
      );
      perfectCandidatesNum = membersKeys.filter(
        (member) => member === this.target
      ).length;
      membersKeysTotal = [...membersKeysTotal, ...membersKeys];
    }

    console.log(membersKeysTotal);
    console.log(`${perfectCandidatesNum} member(s) typed "${this.target}"`);
  }
}

export { GA };
