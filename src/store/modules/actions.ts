import { ROUND_DISTANCES } from "@/constants/race"
import type { Horse, RaceActionPayload, RaceRound } from "@/types/race"
import { calculateRaceResults, selectRandomHorses } from "@/utils/race"

export const actions = {
    generateRaceProgram({ commit, state }: RaceActionPayload) {
      const rounds: RaceRound[] = ROUND_DISTANCES.map((distance, index) => ({
        roundNumber: index + 1,
        distance,
        horses: selectRandomHorses(state.horses, 10),
        isCompleted: false,
        isActive: false
      }))

      commit('SET_RACE_PROGRAM', rounds)
      commit('RESET_RACE_STATE')
    },    
    async startRace({ commit, state, dispatch }: RaceActionPayload) {
      if (state.completedRounds >= state.program.rounds.length) {
        commit('RESET_RACE_STATE')
      }

      commit('SET_RACING_STATE', true)

      for (let i = state.program.currentRound; i < state.program.rounds.length; i++) {
        if (!state.isRacing) break

        await dispatch('runRound', i)
      }
    },    
    async runRound({ commit, state }: RaceActionPayload, roundIndex: number) {
      const round = state.program.rounds[roundIndex]
      if (!round || round.isCompleted) return

      commit('SET_ACTIVE_ROUND', roundIndex)

      const baseAnimationDuration = 6000
      const animationDuration = baseAnimationDuration * (round.distance / ROUND_DISTANCES[0])
      const intervalDuration = 16 

      const horseSpeeds: { [horseId: number]: number } = {}
      const horseProgress: { [horseId: number]: number } = {}
      const horseTimes: { [horseId: number]: number } = {}
      const horseFinishTimes: { [horseId: number]: number } = {} 
      const horseFinished: { [horseId: number]: boolean } = {} 
      const horsePauseOffsets: { [horseId: number]: number } = {}

      const raceStartTime = Date.now()

      const currentPositions = { ...state.racePositions }
      const savedTimes = { ...state.currentRoundHorseTimes }

      round.horses.forEach((horse: Horse) => {
        if (currentPositions[horse.id] !== undefined) {
          horseProgress[horse.id] = currentPositions[horse.id] / 100
          horseSpeeds[horse.id] = state.savedHorseSpeeds[horse.id] || (0.6 + (horse.condition / 100) * 0.6)
          horsePauseOffsets[horse.id] = savedTimes[horse.id] || 0
        } else {
          horseProgress[horse.id] = 0
          horseSpeeds[horse.id] = 0.6 + (horse.condition / 100) * 0.6 + (Math.random() * 0.2 - 0.1)
          horsePauseOffsets[horse.id] = 0
        }
        
        horseTimes[horse.id] = horsePauseOffsets[horse.id]
        horseFinished[horse.id] = false
      })

      let allHorsesFinished = false
      
      commit('SET_RACE_POSITIONS', currentPositions)

      while (!allHorsesFinished && state.isRacing) {
        const positions: { [horseId: number]: number } = {}
        let finishedCount = 0
        const currentTime = Date.now()
        const elapsedRaceTime = (currentTime - raceStartTime) / 1000

        round.horses.forEach((horse: Horse) => {
          if (horseFinished[horse.id]) {
            horseTimes[horse.id] = horseFinishTimes[horse.id]
            positions[horse.id] = 100
            finishedCount++
            return
          }

          if (horseProgress[horse.id] < 1) {
            const speedFactor = horseSpeeds[horse.id]
            const randomVariation = (Math.random() - 0.6) * 0.001

            const progressIncrement = (speedFactor / animationDuration * intervalDuration) + randomVariation
            horseProgress[horse.id] += progressIncrement
            horseProgress[horse.id] = Math.max(0, Math.min(1, horseProgress[horse.id]))

            horseTimes[horse.id] = horsePauseOffsets[horse.id] + elapsedRaceTime
          }

          positions[horse.id] = Math.max(currentPositions[horse.id] || 0, horseProgress[horse.id] * 100)

          if (positions[horse.id] >= 100 && !horseFinished[horse.id]) {
            positions[horse.id] = 100
            horseFinished[horse.id] = true
            horseFinishTimes[horse.id] = horsePauseOffsets[horse.id] + elapsedRaceTime
            horseTimes[horse.id] = horseFinishTimes[horse.id]
            finishedCount++
          }
        })

        if (finishedCount === round.horses.length) {
          allHorsesFinished = true
        }

        commit('SET_RACE_POSITIONS', positions)
        commit('SET_CURRENT_ROUND_HORSE_TIMES', horseTimes)

        if (!state.isRacing) {
          commit('SET_SAVED_HORSE_SPEEDS', { ...horseSpeeds })
          return
        }

        await new Promise(resolve => setTimeout(resolve, intervalDuration))
      }

      if (state.isRacing && allHorsesFinished) {
        const results = calculateRaceResults(round.horses, horseFinishTimes)
        
        commit('COMPLETE_ROUND', { roundIndex, results })
        commit('SET_RACE_POSITIONS', {})
        commit('SET_SAVED_HORSE_SPEEDS', {})
        commit('SET_CURRENT_ROUND_HORSE_TIMES', {})
      }
    },    
    pauseRace({ commit }: RaceActionPayload) {
      commit('SET_RACING_STATE', false)
    }
  }