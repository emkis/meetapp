function calculateMinutes (minutesToCalculate) {
  const hours = (minutesToCalculate / 60)
  const roundedHours = Math.floor(hours)

  const minutes = (hours - roundedHours) * 60
  const roundedMinutes = Math.round(minutes)

  return { hours: roundedHours, minutes: roundedMinutes }
}

export default calculateMinutes
