import { Population } from "./entities/population";

export function random(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
}

export function generateLetter() {
  const code = random(97, 123);
  return String.fromCharCode(code);
}

export function generate(target: any, options: any) {
  const population = new Population(
    options.populationSize,
    target,
    options.mutationRate
  );
  population.evolve(options.generations);

  const membersKeys = population.members.map((member) => member.keys.join(""));
  const perfectCandidatesNum = membersKeys.filter(
    (member) => member === target
  );

  console.log(membersKeys);
  console.log(
    `${
      perfectCandidatesNum ? perfectCandidatesNum.length : 0
    } member(s) typed "${target}"`
  );
}
