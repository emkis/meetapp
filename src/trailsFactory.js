import { MORNING_MINUTES_LIMIT, EVENING_MINUTES_LIMIT } from './utils/constants'
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

  function getPeriod(meets, periodLimit) {
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

      return `${time} ${name} ${duration}min`
    }

    sanitizedTrails = trails.map(trail => {
      setTime(MORNING_START_TIME, 0)
      const morning = trail.morning.map(meet => formatOutput(meet))
      const lunch = `${LUNCH_START_TIME}:00 Almoço`

      setTime(EVENING_START_TIME, 0)
      const evening = trail.evening.map(meet => formatOutput(meet))
      const network = `${hour}:00 Evento de Networking`

      return [...morning, lunch, ...evening, network]
    })

    return sanitizedTrails
  }

  return { build, buildSchedule }
}

export default trailsFactory
