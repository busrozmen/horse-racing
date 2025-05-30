import type { RaceState } from '@/types/race'
import { generateHorses } from '@/utils/race'

export const state: RaceState = {
  horses: generateHorses(),
  program: {
    rounds: [],
    currentRound: 0,
    isGenerated: false
  },
  isRacing: false,
  racePositions: {},
  completedRounds: 0,
  savedHorseSpeeds: {},
  currentRoundHorseTimes: {},
  activeRoundIndex: -1
}