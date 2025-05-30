import type { RaceRound, RaceState } from "@/types/race";

export const getters = {
    isRacing: (state: RaceState) => state.isRacing,
    hasProgram: (state: RaceState) => state.program.isGenerated, 
    allRounds: (state: RaceState) => state.program.rounds,
    activeRound: (state: RaceState) => state.program.rounds.find((round: RaceRound) => round.isActive),
    racePositions: (state: RaceState) => state.racePositions,
    currentRoundHorseTimes: (state: RaceState) => state.currentRoundHorseTimes,
    activeRoundIndex: (state: RaceState) => state.activeRoundIndex,
    allHorses: (state: RaceState) => state.horses
  }