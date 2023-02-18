import { nRandom } from './nRandom'

describe('nRandom', () => {
  test('check results', () => {
    const attemptionCount = 1000

    let sum = 0
    let min = Number.MAX_VALUE
    let max = 0

    for (let i = 0; i < attemptionCount; i++) {
      const result = nRandom(10, 5)

      expect(result).not.toBeNaN()

      console.log(result)

      sum += result
      min = min > result ? result : min
      max = max < result ? result : max
    }

    console.log({ average: sum / attemptionCount, min, max })
  })
})
