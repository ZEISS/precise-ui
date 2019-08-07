import { parseDate } from './date';
describe('Date utils', () => {
  describe('parseDate', () => {
    it('should parse date that matches the format', () => {
      const value = '01/15/2019';
      const dateFormat = 'MM/dd/yyyy';

      expect(parseDate(value, dateFormat, null, true)).not.toBeNull();
    });

    it('should parse date that matches one of the formats', () => {
      const value = '01/15/2019';
      const dateFormat = ['MM/dd/yyyy', 'yyyy-MM-dd'];

      expect(parseDate(value, dateFormat, null, true)).not.toBeNull();
    });

    it('should not parse date that does not match the format', () => {
      const value = '01/15/20';
      const dateFormat = 'MM/dd/yyyy';

      expect(parseDate(value, dateFormat, null, true)).toBeNull();
    });

    it('should not parse date that does not match any of the formats', () => {
      const value = '01/15/20';
      const dateFormat = ['MM/dd/yyyy', 'yyyy-MM-dd'];

      expect(parseDate(value, dateFormat, null, true)).toBeNull();
    });

    it('should parse date without strict parsing', () => {
      const value = '01/15/20';
      const dateFormat = 'MM/dd/yyyy';

      expect(parseDate(value, dateFormat, null, false)).not.toBeNull();
    });

    it('should not parse date based on locale without a given locale', () => {
      const value = '26/05/1995';
      const dateFormat = 'P';

      const actual = parseDate(value, dateFormat, null, false);

      expect(actual).toBeNull();
    });
  });
});
