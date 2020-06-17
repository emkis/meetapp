import { MORNING_MINUTES_LIMIT, EVENING_MINUTES_LIMIT, MAX_MINUTES_PER_TRAIL } from './utils/constants'
import calculateMinutes from './utils/calculateMinutes'

function trailsFactory(meets = []) {
  const trails = []

  function build() {
    const mutableMeets = [...meets]

    while (mutableMeets.length > 0) {
      trails.push({
        morning: getPeriod(mutableMeets, MORNING_MINUTES_LIMIT),
        evening: getPeriod(mutableMeets, EVENING_MINUTES_LIMIT)
      })
    }

    return trails
  }

  function categoryAlreadyUsed(meetCategory, usedMeets) {
    return usedMeets.some(meet => meet === meetCategory)
  }

  function isPreviousCategory(currentCategory, usedCategories) {
    const lastCategoryPosition = usedCategories.length - 1
    const previousCategory = usedCategories[lastCategoryPosition]

    return currentCategory === previousCategory
  }

  function getPeriod(meets, periodLimit) {
    const usedCategories = []
    const periodMeets = []
    let totalDuration = 0

    function addMeetToPeriod(currentIndex, duration, currentCategory) {
      usedCategories.push(currentCategory)

      totalDuration += duration
      periodMeets.push(meets[currentIndex])
      meets.splice(currentIndex, 1)
    }

    for (let index = 0; index < meets.length; index++) {
      const currentDuration = meets[index].duration
      const currentCategory = meets[index].category
      const accumulator = totalDuration + currentDuration

      if (currentDuration > MAX_MINUTES_PER_TRAIL) {
        throw Error ('Sorry, something went wrong. Our monkeys are working to fix it :)')
      }

      if (!categoryAlreadyUsed(currentCategory, usedCategories)) {
        if (accumulator <= periodLimit) {
          addMeetToPeriod(index, currentDuration, currentCategory)
          index--

          if (accumulator === periodLimit) break
        }
      }
    }

    for (let index = 0; index < meets.length; index++) {
      const currentDuration = meets[index].duration
      const currentCategory = meets[index].category
      const accumulator = totalDuration + currentDuration

      if (categoryAlreadyUsed(currentCategory, usedCategories) && !isPreviousCategory(currentCategory, usedCategories)) {
        if (accumulator <= periodLimit) {
          addMeetToPeriod(index, currentDuration, currentCategory)
          index--

          if (accumulator === periodLimit) break
        }
      } else {
        if (accumulator <= periodLimit) {
          addMeetToPeriod(index, currentDuration, currentCategory)
          index--

          if (accumulator === periodLimit) break
        }
      }
    }

    return periodMeets
  }

  function buildSchedule() {
    const MORNING_START_TIME = 9
    const LUNCH_START_TIME = 12
    const EVENING_START_TIME = 13

    let sanitizedTrails = []

    let hour = MORNING_START_TIME
    let minute = 0

    function setTime(targetHour, targetMinute) {
      hour = parseInt(targetHour)
      minute = parseInt(targetMinute)
    }

    function incrementTime(minutesToAdd) {
      const { hours, minutes } = calculateMinutes(minutesToAdd + minute)

      hour += hours
      minute = minutes
    }

    function formatOutput(meet) {
      const name = meet.name
      const duration = meet.duration
      const time = `${hour}:${!!minute ? minute : '00'}`
      incrementTime(duration)

      return {
        time: `${time}`,
        name: `${name} ${duration}min`,
        category: meet.category
      }
    }

    sanitizedTrails = trails.map(trail => {
      setTime(MORNING_START_TIME, 0)
      const morning = trail.morning.map(meet => formatOutput(meet))
      const lunch = { time: `${LUNCH_START_TIME}:00`, name: 'Almoço' }

      setTime(EVENING_START_TIME, 0)
      const evening = trail.evening.map(meet => formatOutput(meet))
      const network = { time: `${hour}:00`, name: 'Evento de Networking' }

      return [...morning, lunch, ...evening, network]
    })

    return sanitizedTrails
  }

  return { build, buildSchedule }
}

export default trailsFactory
