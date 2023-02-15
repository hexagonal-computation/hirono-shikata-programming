import { Gaussian } from 'ts-gaussian'

type Bowl = {
  id: string
  currentMatchstickCount: number
  totalProcessedMatchstickCount: number
  previousBowlId: Bowl['id'] | null
}

const getRandomNumber = () => new Gaussian(3.5, 1).ppf(Math.random())
const main = () => {
  const bowlCount = 1000
  const bowls: Bowl[] = [...Array(bowlCount).keys()].map((i) => ({
    id: `bowl-id-${i}`,
    currentMatchstickCount: 0,
    totalProcessedMatchstickCount: 0,
    previousBowlId: i === 0 ? null : `bowl-id-${i - 1}`,
  }))

  let currentTime = 0

  while (currentTime < 1000) {
    for (const bowl of bowls) {
      const diceNumber = getRandomNumber()

      if (!bowl.previousBowlId) {
        bowl.currentMatchstickCount += diceNumber
        bowl.totalProcessedMatchstickCount += diceNumber
      } else {
        const previousBowl = bowls.find((b) => b.id === bowl.previousBowlId)

        if (!previousBowl) {
          throw new Error(`bowl ${bowl.previousBowlId} not found`)
        }

        const matchstickCount = Math.min(
          diceNumber,
          previousBowl.currentMatchstickCount,
        )

        bowl.currentMatchstickCount += matchstickCount
        previousBowl.currentMatchstickCount -= matchstickCount
        bowl.totalProcessedMatchstickCount += matchstickCount
      }
    }
    // console.log(
    //   currentTime,
    //   bowls.reduce((prev, bowl, i) => {
    //     return { ...prev, [i]: bowl.currentMatchstickCount }
    //   }, {}),
    // )
    currentTime += 1
  }
  console.log(
    'Total',
    bowls.reduce((prev, bowl, i) => {
      if (i === 0 || i === bowls.length - 1) {
        return { ...prev, [i]: Math.floor(bowl.totalProcessedMatchstickCount) }
      } else {
        return prev
      }
    }, {}),
    {
      efficiency:
        bowls[bowls.length - 1].totalProcessedMatchstickCount /
        bowls[0].totalProcessedMatchstickCount,
    },
  )
}

main()
