import type { RaceState, RaceResult, RacePosition, RaceRound } from '@/types/race'

export const mutations = {
    SET_RACE_PROGRAM(state: RaceState, rounds: RaceRound[]) {
      state.program.rounds = rounds;
      state.program.isGenerated = true;
      state.program.currentRound = 0;
      state.completedRounds = 0;
    },
    SET_RACING_STATE(state: RaceState, isRacing: boolean) {
      state.isRacing = isRacing;
    },
    SET_RACE_POSITIONS(state: RaceState, positions: { [horseId: number]: number }) {
      state.racePositions = positions;
    },
    COMPLETE_ROUND(state: RaceState, { roundIndex, results }: { roundIndex: number, results: RaceResult[] }) {
      if (state.program.rounds[roundIndex]) {
        state.program.rounds[roundIndex].results = results;
        state.program.rounds[roundIndex].isCompleted = true;
        state.program.rounds[roundIndex].isActive = false;
      }
      state.completedRounds++;
    },
    SET_ACTIVE_ROUND(state: RaceState, roundIndex: number) {
      state.program.rounds.forEach(round => {
        round.isActive = false;
      });
      if (state.program.rounds[roundIndex]) {
        state.program.rounds[roundIndex].isActive = true;
      }
      state.program.currentRound = roundIndex;
      state.activeRoundIndex = roundIndex;
    },
    SET_SAVED_HORSE_SPEEDS(state: RaceState, speeds: RacePosition) {
      state.savedHorseSpeeds = speeds;
    },
    SET_CURRENT_ROUND_HORSE_TIMES(state: RaceState, horseTimes: { [horseId: number]: number }) {
      state.currentRoundHorseTimes = horseTimes;
    },
    RESET_RACE_STATE(state: RaceState) {
      state.isRacing = false;
      state.racePositions = {};
      state.program.currentRound = 0;
      state.completedRounds = 0;
      state.savedHorseSpeeds = {};
      state.currentRoundHorseTimes = {};
      state.activeRoundIndex = -1;
      state.program.rounds.forEach(round => {
        round.isActive = false;
        round.isCompleted = false;
        round.results = undefined;
      });
    }
  }