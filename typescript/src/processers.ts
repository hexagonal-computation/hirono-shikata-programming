import { moveItemFromQueueToQueue } from './queue'

type Bowl = {
  id: string
  previousBowlId: Bowl['id'] | null
  processingMatchsticksQueue: Matchstick[]
  // processingTime: number
  // averagedThroughput: number
  processFinishedMatchsticksQueue: Matchstick[]
}

type Matchstick = {
  id: string
  startedAt: number
  finishedAt: number | null
}

const nRandom = (): number => {
  let u = 0,
    v = 0

  while (u === 0) u = Math.random() //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random()

  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)

  num = num / 10.0 + 0.5 // Translate to 0 -> 1

  if (num > 1 || num < 0) return nRandom() // resample between 0 and 1

  return num
}

const getRandomNumber = () => Math.floor(3.5 * nRandom())

const main = () => {
  const bowlCount = 5
  const bowls: Bowl[] = [...Array(bowlCount).keys()].map((i) => ({
    id: `bowl-id-${i}`,
    previousBowlId: i === 0 ? null : `bowl-id-${i - 1}`,
    processingMatchsticksQueue: [],
    processFinishedMatchsticksQueue: [],
  }))

  const currentTime = 0
  let matchstickId = 0
  const simulationLoopCount = 100

  for (let loopCount = 0; loopCount < simulationLoopCount; loopCount++) {
    for (const bowl of bowls) {
      const diceNumber = getRandomNumber()

      bowl.processFinishedMatchsticksQueue = [
        ...bowl.processFinishedMatchsticksQueue,
        ...bowl.processingMatchsticksQueue,
      ]
      bowl.processingMatchsticksQueue = []

      if (!bowl.previousBowlId) {
        bowl.processingMatchsticksQueue = [...Array(diceNumber).keys()].map(
          (i) => ({
            id: `${matchstickId + i}`,
            startedAt: currentTime,
            finishedAt: null,
          }),
        )
        matchstickId += diceNumber
      } else {
        const previousBowl = bowls.find((b) => b.id === bowl.previousBowlId)

        if (!previousBowl) {
          throw new Error(`previousBowl not found id ${bowl.previousBowlId}`)
        }

        moveItemFromQueueToQueue(
          previousBowl.processFinishedMatchsticksQueue,
          bowl.processingMatchsticksQueue,
          Math.min(
            diceNumber,
            previousBowl.processFinishedMatchsticksQueue.length,
          ),
        )
      }
    }

    console.log(
      bowls.map((b) => ({
        id: b.id,
        finished: b.processFinishedMatchsticksQueue,
      })),
    )
  }
}

main()
