export const daysLeft = (deadline: string | number | Date) => {
  const deadlineTime = Number(new Date(deadline).getTime()) // Ensure it's a number
  const currentTime = Number(Date.now()) // Ensure it's a number

  const difference = deadlineTime - currentTime
  const remainingDays = difference / (1000 * 3600 * 24)

  return remainingDays.toFixed(0)
}
