import { HORSE_COLORS, ROUND_DISTANCES, HORSE_NAMES } from '@/constants/race';
import { describe, expect, it } from '@jest/globals';

describe('Race Constants', () => {
  describe('HORSE_COLORS', () => {
    it('should contain exactly 20 colors', () => {
      expect(HORSE_COLORS).toHaveLength(20);
    });

    it('should only contain valid hex color codes', () => {
      const hexColorRegex = /^#[0-9A-F]{6}$/i;
      HORSE_COLORS.forEach(color => {
        expect(color).toMatch(hexColorRegex);
      });
    });

    it('should contain unique colors', () => {
      const uniqueColors = new Set(HORSE_COLORS);
      expect(uniqueColors.size).toBe(HORSE_COLORS.length);
    });

    it('should contain specific color values', () => {
      expect(HORSE_COLORS).toContain('#FF0000');
      expect(HORSE_COLORS).toContain('#5DCF5D');
      expect(HORSE_COLORS).toContain('#0000FF');
    });
  });

  describe('ROUND_DISTANCES', () => {
    it('should contain exactly 6 distances', () => {
      expect(ROUND_DISTANCES).toHaveLength(6);
    });

    it('should contain only numbers', () => {
      ROUND_DISTANCES.forEach(distance => {
        expect(typeof distance).toBe('number');
      });
    });

    it('should be in ascending order', () => {
      const sorted = [...ROUND_DISTANCES].sort((a, b) => a - b);
      expect(ROUND_DISTANCES).toEqual(sorted);
    });

    it('should contain specific distances', () => {
      expect(ROUND_DISTANCES).toContain(1200);
      expect(ROUND_DISTANCES).toContain(2200);
    });
  });

  describe('HORSE_NAMES', () => {
    it('should contain exactly 20 names', () => {
      expect(HORSE_NAMES).toHaveLength(20);
    });

    it('should contain only strings', () => {
      HORSE_NAMES.forEach(name => {
        expect(typeof name).toBe('string');
      });
    });

    it('should contain unique names', () => {
      const uniqueNames = new Set(HORSE_NAMES);
      expect(uniqueNames.size).toBe(HORSE_NAMES.length);
    });

    it('should contain specific horse names', () => {
      expect(HORSE_NAMES).toContain('Thunder Bolt');
      expect(HORSE_NAMES).toContain('Lightning Strike');
    });
  });
});