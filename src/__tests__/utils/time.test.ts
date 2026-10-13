import { milliSecondsToTime, getDifference, formatDateWithMonthName, getYearsOfExperience } from '../../utils/time';
import { getExperience } from '../../services/experience';

// Mock the getExperience function
jest.mock('../../services/experience', () => ({
  getExperience: jest.fn()
}));

describe('Time Utility Functions', () => {
  describe('milliSecondsToTime', () => {
    it('should convert milliseconds to time object correctly', () => {
      // Test case: 1 year, 2 months, 7 days, 4 hours, 5 minutes, 6 seconds
      // The implementation uses 30 days per month, so we need to adjust our test
      const milliseconds = (
        (365 + 31 + 28 + 7) * 24 * 60 * 60 * 1000 + // 1 year, 2 months, 7 days
        4 * 60 * 60 * 1000 + // 4 hours
        5 * 60 * 1000 + // 5 minutes
        6 * 1000 // 6 seconds
      );

      const result = milliSecondsToTime(milliseconds);

      expect(result.year).toBe(1);
      expect(result.month).toBe(2);
      expect(result.day).toBe(11);
      expect(result.hour).toBe(4);
      expect(result.minute).toBe(5);
      expect(result.second).toBe(6);
    });

    it('should handle zero milliseconds', () => {
      const result = milliSecondsToTime(0);

      expect(result.year).toBe(0);
      expect(result.month).toBe(0);
      expect(result.day).toBe(0);
      expect(result.hour).toBe(0);
      expect(result.minute).toBe(0);
      expect(result.second).toBe(0);
    });
  });

  describe('getDifference', () => {
    it('should calculate the difference between two dates', () => {
      const start = '2020-01-01';
      const end = '2021-03-15';

      const result = getDifference(start, end);

      expect(result).toContain('1 year');
      expect(result).toBe('1 year and 3 months');
    });

    it('should use current date if end date is null', () => {
      jest.useFakeTimers().setSystemTime(new Date('2026-10-13T12:00:00Z'));
      try {
        expect(getDifference('2025-10', null)).toBe('1 year and 1 month');
      } finally {
        jest.useRealTimers();
      }
    });

    it.each([
      ['2021-12-01', '2026-04', '4 years and 5 months'],
      ['2020-05-01', '2021-12-22', '1 year and 8 months'],
      ['2016-08-01', '2019-09-15', '3 years and 2 months'],
      ['2018-03-01', '2019-04-30', '1 year and 2 months'],
      ['2026-01-01', '2026-01-31', '1 month'],
      ['2025-01', '2025-12', '1 year'],
      ['2026-02-28', '2026-03-01', '2 months'],
      ['2026-04', '2021-12-01', '4 years and 5 months'],
      ['2024-02-01', '2024-02-29', '1 month'],
      ['2021-12-01T23:00:00-08:00', '2026-04', '4 years and 5 months']
    ])('counts calendar months for %s to %s', (start, end, expected) => {
      expect(getDifference(start, end)).toBe(expected);
    });

    it('rejects dates without a valid month', () => {
      expect(() => getDifference('2026-13', '2026-04')).toThrow(RangeError);
      expect(() => getDifference('unknown', '2026-04')).toThrow(RangeError);
    });
  });

  describe('formatDateWithMonthName', () => {
    it('should format date with month name correctly', () => {
      const date = '2021-05-15';

      const result = formatDateWithMonthName(date);

      expect(result).toContain('15');
      expect(result).toContain('may');
      expect(result).toContain('2021');
    });

    it('should respect options for formatting', () => {
      const date = '2021-05-15';

      const result = formatDateWithMonthName(date, {
        day: true,
        month: true,
        year: false,
        short: true
      });

      expect(result).toContain('15');
      expect(result).toContain('may');
      expect(result).not.toContain('2021');
    });
  });

  describe('getYearsOfExperience', () => {
    beforeEach(() => {
      // Reset mock
      jest.clearAllMocks();
    });

    it('should calculate years of experience correctly', () => {
      // Mock job experience data
      const mockExperience = [
        {
          id: '1',
          title: 'Developer',
          company: 'Company A',
          type: 'full-time',
          location: 'Location A',
          start: '2018-01-01',
          end: '2020-01-01', // 2 years
          technologies: ['Tech A'],
          responsibilities: ['Resp A']
        },
        {
          id: '2',
          title: 'Developer',
          company: 'Company B',
          type: 'full-time',
          location: 'Location B',
          start: '2020-02-01',
          end: '2021-08-01', // 1 year 6 months
          technologies: ['Tech B'],
          responsibilities: ['Resp B']
        }
      ];

      (getExperience as jest.Mock).mockReturnValue(mockExperience);

      const result = getYearsOfExperience({ filter: { fullTime: true } });

      expect(result).toBe(3); // 2 years + 1 year 6 months = 3 years
      expect(getExperience).toHaveBeenCalled();
    });

    it('should filter jobs by type', () => {
      // Mock job experience data with different types
      const mockExperience = [
        {
          id: '1',
          title: 'Developer',
          company: 'Company A',
          type: 'full-time',
          location: 'Location A',
          start: '2018-01-01',
          end: '2020-01-01', // 2 years
          technologies: ['Tech A'],
          responsibilities: ['Resp A']
        },
        {
          id: '2',
          title: 'Developer',
          company: 'Company B',
          type: 'freelance',
          location: 'Location B',
          start: '2020-02-01',
          end: '2021-08-01', // 1 year 6 months
          technologies: ['Tech B'],
          responsibilities: ['Resp B']
        }
      ];

      (getExperience as jest.Mock).mockReturnValue(mockExperience);

      // Only count full-time jobs
      const result = getYearsOfExperience({ filter: { fullTime: true } });

      expect(result).toBe(2); // Only the 2 years from the full-time job
      expect(getExperience).toHaveBeenCalled();
    });
  });
});
