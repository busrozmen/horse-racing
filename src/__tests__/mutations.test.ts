import { mutations } from '@/store/modules/mutations';
import type { RaceState, RaceResult, RaceRound, Horse } from '@/types/race';
import { describe, expect, it, beforeEach } from '@jest/globals';

describe('Race Mutations', () => {
  let state: RaceState;

  beforeEach(() => {
    state = {
      horses: [],
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
    };
  });

  describe('SET_RACE_PROGRAM', () => {
    it('should set race program rounds and update program state', () => {
      const rounds: RaceRound[] = [
        { roundNumber: 1, distance: 1200, horses: [], results: [], isCompleted: false, isActive: false },
        { roundNumber: 2, distance: 1400, horses: [], results: [], isCompleted: false, isActive: false }
      ];

      mutations.SET_RACE_PROGRAM(state, rounds);

      expect(state.program.rounds).toEqual(rounds);
      expect(state.program.isGenerated).toBe(true);
      expect(state.program.currentRound).toBe(0);
      expect(state.completedRounds).toBe(0);
    });
  });

  describe('SET_RACING_STATE', () => {
    it('should update racing state', () => {
      mutations.SET_RACING_STATE(state, true);
      expect(state.isRacing).toBe(true);

      mutations.SET_RACING_STATE(state, false);
      expect(state.isRacing).toBe(false);
    });
  });

  describe('SET_RACE_POSITIONS', () => {
    it('should update race positions', () => {
      const positions = { 1: 100, 2: 200, 3: 300 };
      mutations.SET_RACE_POSITIONS(state, positions);
      expect(state.racePositions).toEqual(positions);
    });
  });

  describe('COMPLETE_ROUND', () => {
    it('should complete a round and update its results', () => {
      const testHorse1: Horse = { id: 1, name: 'Thunder Bolt', condition: 100, color: '#FF0000' };
      const testHorse2: Horse = { id: 2, name: 'Lightning Strike', condition: 80, color: '#00FF00' };

      state.program.rounds = [
        { roundNumber: 1, distance: 1200, horses: [testHorse1, testHorse2], results: [], isCompleted: false, isActive: true },
        { roundNumber: 2, distance: 1400, horses: [testHorse1, testHorse2], results: [], isCompleted: false, isActive: false }
      ];

      const results: RaceResult[] = [
        { position: 1, horse: testHorse1, time: 70 },
        { position: 2, horse: testHorse2, time: 72 }
      ];

      mutations.COMPLETE_ROUND(state, { roundIndex: 0, results });

      expect(state.program.rounds[0].results).toEqual(results);
      expect(state.program.rounds[0].isCompleted).toBe(true);
      expect(state.program.rounds[0].isActive).toBe(false);
      expect(state.completedRounds).toBe(1);
    });

    it('should handle invalid round index', () => {
      const testHorse: Horse = { id: 1, name: 'Thunder Bolt', condition: 100, color: '#FF0000' };
      const results: RaceResult[] = [
        { position: 1, horse: testHorse, time: 70 }
      ];

      mutations.COMPLETE_ROUND(state, { roundIndex: 0, results });
      expect(state.completedRounds).toBe(1);
    });
  });

  describe('SET_ACTIVE_ROUND', () => {
    it('should set the active round and update other rounds', () => {
      const testHorse1: Horse = { id: 1, name: 'Thunder Bolt', condition: 100, color: '#FF0000' };
      const testHorse2: Horse = { id: 2, name: 'Lightning Strike', condition: 80, color: '#00FF00' };

      state.program.rounds = [
        { roundNumber: 1, distance: 1200, horses: [testHorse1, testHorse2], results: [], isCompleted: false, isActive: false },
        { roundNumber: 2, distance: 1400, horses: [testHorse1, testHorse2], results: [], isCompleted: false, isActive: false }
      ];

      mutations.SET_ACTIVE_ROUND(state, 1);

      expect(state.program.rounds[0].isActive).toBe(false);
      expect(state.program.rounds[1].isActive).toBe(true);
      expect(state.program.currentRound).toBe(1);
    });

    it('should handle invalid round index', () => {
      const testHorse: Horse = { id: 1, name: 'Thunder Bolt', condition: 100, color: '#FF0000' };
      state.program.rounds = [
        { roundNumber: 1, distance: 1200, horses: [testHorse], results: [], isCompleted: false, isActive: false }
      ];

      mutations.SET_ACTIVE_ROUND(state, 999);

      expect(state.program.rounds[0].isActive).toBe(false);
      expect(state.program.currentRound).toBe(999);
    });
  });

  describe('SET_SAVED_HORSE_SPEEDS', () => {
    it('should  set saved horse speeds', () => {
      const speeds = { 1: 100, 2: 200, 3: 300 };

      mutations.SET_SAVED_HORSE_SPEEDS(state, speeds);

      expect(state.savedHorseSpeeds).toEqual(speeds);
    });
  });

  describe('SET_CURRENT_ROUND_HORSE_TIMES', () => {
    it('should set current round horse times', () => {
      const horseTimes = { 1: 6.5, 2: 7.2 };

      mutations.SET_CURRENT_ROUND_HORSE_TIMES(state, horseTimes);

      expect(state.currentRoundHorseTimes).toEqual(horseTimes);
    });
  });

  describe('RESET_RACE_STATE', () => {
    it('should reset the race state', () => {
      state.isRacing = true;
      state.racePositions = { 1: 100, 2: 200};
      state.program.currentRound = 2;
      state.completedRounds = 1;
      state.savedHorseSpeeds = { 1: 100, 2: 200};
      state.currentRoundHorseTimes = { 1: 7.2 };
      state.activeRoundIndex = 1;

      state.program.rounds = [
        {
          roundNumber: 1,
          distance: 1200,
          horses: [],
          isActive: true,
          isCompleted: true,
          results: [{ position: 1, horse: { id: 1, name: 'Thunder Bolt', condition: 100, color: '#FF0000' }, time: 7.2 }]
        }
      ];

      mutations.RESET_RACE_STATE(state);

      expect(state.isRacing).toBe(false);
      expect(state.racePositions).toEqual({});
      expect(state.program.currentRound).toBe(0);
      expect(state.completedRounds).toBe(0);
      expect(state.savedHorseSpeeds).toEqual({});
      expect(state.currentRoundHorseTimes).toEqual({});
      expect(state.activeRoundIndex).toBe(-1);

      expect(state.program.rounds[0].isActive).toBe(false);
      expect(state.program.rounds[0].isCompleted).toBe(false);
      expect(state.program.rounds[0].results).toBeUndefined();
    });
  });
});
