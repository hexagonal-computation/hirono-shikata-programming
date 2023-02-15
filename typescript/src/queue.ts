// 次回これのテスト書く
// queueAからenqueueしてqueueBにdequeue
//
export const moveItemFromQueueToQueue = <T>(
  queueA: T[],
  queueB: T[],
  count: number,
): void => {
  if (queueA.length < count) {
    throw new Error(
      `queueA.length ${queueA.length} must be equal or greater than count ${count}`,
    )
  }

  for (let i = 0; i < count; i++) {
    const firstItem = queueA.shift()

    if (!firstItem) {
      // Do nothing
      continue
    }
    queueB.push(firstItem)
  }
}
