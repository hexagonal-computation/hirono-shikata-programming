import { excludeNull } from './array'
import { nRandom } from './nRandom'
import { moveItemFromQueueToQueue } from './queue'

type Bowl = {
  id: string
  previousBowlId: Bowl['id'] | null
  mean: number
  variance: number
  isFinal: boolean
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

const getRandomNumber = (mean: number, variance: number) =>
  Math.round(nRandom(mean, variance))

const main = () => {
  const bowlCount = 10
  const bowls: Bowl[] = [...Array(bowlCount).keys()].map((i) => ({
    id: `bowl-id-${i}`,
    previousBowlId: i === 0 ? null : `bowl-id-${i - 1}`,
    // mean: (i % 4) + 0.5,
    mean: (i % 10) / 100 + 3.0343,
    // variance: 1,
    variance: (i % 4) + 0.5,
    isFinal: i === bowlCount - 1,
    processingMatchsticksQueue: [],
    processFinishedMatchsticksQueue: [],
  }))

  let matchstickId = 0
  const simulationLoopCount = 10000

  for (let loopCount = 0; loopCount < simulationLoopCount; loopCount++) {
    for (const bowl of bowls) {
      const diceNumber = Math.max(
        0,
        Math.min(7, getRandomNumber(bowl.mean, bowl.variance)),
      )

      bowl.processFinishedMatchsticksQueue = [
        ...bowl.processFinishedMatchsticksQueue,
        ...bowl.processingMatchsticksQueue.map((m) => ({
          ...m,
          finishedAt: loopCount,
        })),
      ]
      bowl.processingMatchsticksQueue = []

      if (!bowl.previousBowlId) {
        bowl.processingMatchsticksQueue = [...Array(diceNumber).keys()].map(
          (i) => ({
            id: `${matchstickId + i}`,
            startedAt: loopCount,
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

    if (loopCount % 1000 === 0) {
      // if (true) {
      console.log({ step: loopCount })
      console.log(
        bowls.map((b) => ({
          id: b.id,
          m: b.mean,
          v: b.variance,
          p: b.processingMatchsticksQueue.length,
          f: b.processFinishedMatchsticksQueue.length,
        })),
      )

      const finalBowl = bowls.find((b) => b.isFinal)

      if (!finalBowl) {
        throw new Error(`finalBowl not found`)
      }

      const leadTimes = excludeNull(
        finalBowl.processFinishedMatchsticksQueue.map((m) =>
          m.finishedAt ? m.finishedAt - m.startedAt : null,
        ),
      )

      console.log(
        {
          averagedLeadTime:
            leadTimes.reduce((prev, leadTime) => prev + leadTime, 0) /
            leadTimes.length,
          max: leadTimes.reduce(
            (prev, leadTime) => (prev < leadTime ? leadTime : prev),
            0,
          ),
        },
        // finalBowl.processFinishedMatchsticksQueue.map((m) => ({
        //   leadTime: m.finishedAt ? m.finishedAt - m.startedAt : null,
        // })),
      )
    }
  }
}

main()
