import randn from '@stdlib/random-base-box-muller'

export const nRandom = (mean: number, variance: number): number => {
  const dist = randn.factory()

  return variance * dist() + mean
}
