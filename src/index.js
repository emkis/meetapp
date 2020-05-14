import { meets } from './meets'

function makeTrails(meets = []) {
  const trails = []
  const sanitizedTrails = []
  const tempMeets = [...meets]
  const MORNING_LIMIT = 180
  const EVENING_LIMIT = 240

  function getTrails() {
    while (tempMeets.length > 0) {
      trails.push({
        morging: getPeriods(tempMeets, MORNING_LIMIT),
        evening: getPeriods(tempMeets, EVENING_LIMIT)
      })
    }
  }

  function getPeriods(meets, periodLimit) {
    const periodMeets = []
    let totalDuration = 0

    for (let index = 0; index < meets.length; index++) {
      const currentDuration = meets[index].duration
      const accumulator = totalDuration + currentDuration

      if (accumulator <= periodLimit) {
        totalDuration += currentDuration
        periodMeets.push(meets[index])
        meets.splice(index, 1)
        index--

        if (accumulator === periodLimit) break
      }
    }

    return periodMeets
  }

  getTrails()

  return trails
}

const trails = makeTrails(meets)

console.log('meets:', meets)
console.log('')
console.log('trails:', trails)

