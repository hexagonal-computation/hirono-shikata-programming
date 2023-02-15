import { moveItemFromQueueToQueue } from './queue'

describe('moveItemFromQueueToQueue', () => {
  type Item = { id: string; attributeA: number }

  const queueA: Item[] = [
    { id: '1', attributeA: 1 },
    { id: '2', attributeA: 2 },
    { id: '3', attributeA: 3 },
  ]
  const queueB: Item[] = []

  test('move 2 items', () => {
    moveItemFromQueueToQueue(queueA, queueB, 2)

    expect(queueA).toEqual<Item[]>([{ id: '3', attributeA: 3 }])
    expect(queueB).toEqual<Item[]>([
      { id: '1', attributeA: 1 },
      { id: '2', attributeA: 2 },
    ])
  })

  test('try to move more than existing count', () => {
    const result = () => {
      moveItemFromQueueToQueue(queueA, queueB, 2)
    }

    expect(result).toThrow()
  })

  test('move last one', () => {
    moveItemFromQueueToQueue(queueA, queueB, 1)

    expect(queueA).toEqual<Item[]>([])
    expect(queueB).toEqual<Item[]>([
      { id: '1', attributeA: 1 },
      { id: '2', attributeA: 2 },
      { id: '3', attributeA: 3 },
    ])
  })

  test('when nothing to move', () => {
    const result = () => {
      moveItemFromQueueToQueue(queueA, queueB, 1)
    }

    expect(result).toThrow()
  })
})
