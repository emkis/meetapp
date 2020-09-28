import {
  MORNING_MINUTES_LIMIT,
  EVENING_MINUTES_LIMIT,
  MAX_MINUTES_PER_TRAIL,
  EVENT_TYPES,
} from '@/utils/constants'
import uuid from '@/utils/uuid'
import getTimeFromMinutes from '@/utils/getTimeFromMinutes'

function trailsFactory(meets = []) {
  const trails = []

  function build() {
    const mutableMeets = [...meets]

    while (mutableMeets.length > 0) {
      trails.push({
        morning: getPeriod(mutableMeets, MORNING_MINUTES_LIMIT),
        evening: getPeriod(mutableMeets, EVENING_MINUTES_LIMIT),
      })
    }

    return trails
  }

  function categoryAlreadyUsed(meetCategory, usedMeets) {
    return usedMeets.some((meet) => meet === meetCategory)
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
        throw Error(
          'Sorry, something went wrong. Our monkeys are working to fix it :)'
        )
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

      if (
        categoryAlreadyUsed(currentCategory, usedCategories) &&
        !isPreviousCategory(currentCategory, usedCategories)
      ) {
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
      const { hours, minutes } = getTimeFromMinutes(minutesToAdd + minute)

      hour += hours
      minute = minutes
    }

    function getTime() {
      const sanitizedMinutes = minute < 10 ? `0${minute}` : minute
      return `${hour}:${sanitizedMinutes ? sanitizedMinutes : '00'}`
    }

    function formatOutput(meet) {
      const title = meet.title
      const duration = meet.duration

      const startTime = getTime()
      incrementTime(duration)
      const endTime = getTime()

      return {
        id: uuid(),
        type: EVENT_TYPES.MEET,
        title,
        category: meet.category,
        schedule: { startTime, endTime },
      }
    }

    sanitizedTrails = trails.map((trail) => {
      setTime(MORNING_START_TIME, 0)
      const morning = trail.morning.map((meet) => formatOutput(meet))
      const lunch = {
        id: uuid(),
        title: 'Almoço',
        type: EVENT_TYPES.BREAK,
        schedule: {
          startTime: `${LUNCH_START_TIME}:00`,
          endTime: `${EVENING_START_TIME}:00`,
        },
      }

      setTime(EVENING_START_TIME, 0)
      const evening = trail.evening.map((meet) => formatOutput(meet))

      const network = {
        id: uuid(),
        title: 'Evento de Networking',
        type: EVENT_TYPES.BREAK,
        schedule: { startTime: getTime(), endTime: 'No time set' },
      }

      return {
        id: uuid(),
        meets: [...morning, lunch, ...evening, network],
      }
    })

    return sanitizedTrails
  }

  return { build, buildSchedule }
}

export default trailsFactory
