import type { Horse, RaceResult } from '@/types/race'
import { HORSE_COLORS, HORSE_NAMES } from '@/constants/race'

export const generateHorses = (): Horse[] => {
  return Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    name: HORSE_NAMES[index],
    condition: Math.floor(Math.random() * 100) + 1,
    color: HORSE_COLORS[index]
  }))
}

export const selectRandomHorses = (horses: Horse[], count: number): Horse[] => {
  const shuffled = [...horses].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export const calculateRaceResults = (horses: Horse[], horseTimes: { [horseId: number]: number }): RaceResult[] => {
  const results = horses.map(horse => ({
    position: 0,
    horse,
    time: horseTimes[horse.id] || 0
  }))

  results.sort((a, b) => a.time - b.time)
  results.forEach((result, index) => {
    result.position = index + 1
  })

  return results
}