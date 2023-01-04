import { Population } from "../entities/population";

class GA {
  public fitnessFunc: any;
  private target;
  private populationSize;
  private mutationRate;
  
  constructor(target: any, populationSize: number, mutationRate: number) {
    this.fitnessFunc = null;

    this.target = target;
    this.populationSize = populationSize;
    this.mutationRate = mutationRate;
  }

  setFitnessFunc(fn: any) {
    this.fitnessFunc = fn;
  }

  run() {
    const population = new Population(
      this.populationSize,
      this.target,
      this.mutationRate
    );

    let membersKeysTotal: any[] = [];
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
