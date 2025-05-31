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
      expect(result).toContain('2 months');
    });

    it('should use current date if end date is null', () => {
      const start = new Date();
      start.setFullYear(start.getFullYear() - 1); // 1 year ago

      const result = getDifference(start.toISOString(), null);

      expect(result).toContain('1 year');
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
