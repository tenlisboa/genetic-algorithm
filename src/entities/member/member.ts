export type Member = Member.Contract;

export namespace Member {
  export interface Contract {
    keys: any[];

    fitness(callback: Fitness.Input): Fitness.Output;

    crossover(partner: Member.Contract): Member.Contract;

    mutate(mutationRate: number): void;
  }

  export namespace Fitness {
    export type Input = (obj: Member.Contract) => number;

    export type Output = number;
  }
}
