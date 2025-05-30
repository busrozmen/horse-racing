import { actions } from '@/store/modules/actions';
import type { RaceState } from '@/types/race';
import { describe, expect, it, jest, beforeEach } from '@jest/globals';

describe('Race Actions', () => {
  let context: any;
  let state: RaceState;

  beforeEach(() => {
    state = {
      horses: [
        { id: 1, name: 'Thunder Bolt', condition: 100, color: '#FF0000' },
        { id: 2, name: 'Lightning Strike', condition: 80, color: '#00FF00' }
      ],
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
      activeRoundIndex: -1,
    };

    context = {
      state: state,
      commit: jest.fn(),
      
      dispatch: jest.fn().mockImplementation((...args: any[]) => {
        const [action] = args;
        if (action === 'runRound') {
          return Promise.resolve();
        }
        return Promise.reject(new Error(`Unknown action: ${action}`));
      })
    };
  });

  describe('generateRaceProgram', () => {
    it('should generate a valid race program and reset state', () => {
      actions.generateRaceProgram(context);

      expect(context.commit).toHaveBeenNthCalledWith(1, 'SET_RACE_PROGRAM', expect.any(Array));
      expect(context.commit).toHaveBeenNthCalledWith(2, 'RESET_RACE_STATE');
    });
  });

  describe('startRace', () => {
    it('should start the race', async () => {
      await actions.startRace(context);

      expect(context.commit).toHaveBeenCalledWith('SET_RACING_STATE', true);
    });

    it('should reset if all rounds are completed', async () => {
      context.state.completedRounds = 6;
      await actions.startRace(context);

      expect(context.commit).toHaveBeenCalledWith('RESET_RACE_STATE');
    });
  });

  describe('runRound', () => {
    it('should set active round and update positions', async () => {
      state.program.rounds = [{
        roundNumber: 1,
        distance: 1200,
        horses: state.horses,
        isCompleted: false,
        isActive: false
      }];

      await actions.runRound(context, 0);

      expect(context.commit).toHaveBeenCalledWith('SET_ACTIVE_ROUND', 0);
      expect(context.commit).toHaveBeenCalledWith('SET_RACE_POSITIONS', expect.any(Object));
    });
  });

  describe('pauseRace', () => {
    it('should pause the race', () => {
      actions.pauseRace(context);
      expect(context.commit).toHaveBeenCalledWith('SET_RACING_STATE', false);
    });
  });
});
