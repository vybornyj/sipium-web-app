type GetRandomInteger = (min: number, max: number) => number

export const getRandomInteger: GetRandomInteger = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1))
