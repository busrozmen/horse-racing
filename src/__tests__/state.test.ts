import { state } from '@/store/modules/state';
import type { Horse } from '@/types/race';
import { describe, expect, it } from '@jest/globals';

describe('Race State', () => {
  it('should have initial state with correct properties', () => {
    expect(state).toHaveProperty('horses');
    expect(state).toHaveProperty('program');
    expect(state).toHaveProperty('isRacing');
    expect(state).toHaveProperty('racePositions');
    expect(state).toHaveProperty('completedRounds');
    expect(state).toHaveProperty('savedHorseSpeeds');
    expect(state).toHaveProperty('currentRoundHorseTimes');
    expect(state).toHaveProperty('activeRoundIndex');
  });

  it('should have program with correct initial values', () => {
    expect(state.program).toEqual({
      rounds: [],
      currentRound: 0,
      isGenerated: false
    });
  });

  it('should have correct initial boolean values', () => {
    expect(state.isRacing).toBe(false);
    expect(state.program.isGenerated).toBe(false);
  });

  it('should have correct initial numeric values', () => {
    expect(state.completedRounds).toBe(0);
    expect(state.activeRoundIndex).toBe(-1);
  });

  it('should have empty initial objects', () => {
    expect(state.racePositions).toEqual({});
    expect(state.savedHorseSpeeds).toEqual({});
    expect(state.currentRoundHorseTimes).toEqual({});
  });

  it('should have generated horses array', () => {
    expect(Array.isArray(state.horses)).toBe(true);
    expect(state.horses.length).toBeGreaterThan(0);
    state.horses.forEach((horse: Horse) => {
      expect(horse).toHaveProperty('id');
      expect(horse).toHaveProperty('name');
      expect(horse).toHaveProperty('color');
      expect(horse).toHaveProperty('condition');
    });
  });
});
