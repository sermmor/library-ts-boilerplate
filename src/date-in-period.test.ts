import { validateDateInPeriod, VALIDATION_TYPE } from './date-in-period';
import { FieldValidationResult } from 'lc-form-validation';

const validMessage: string = '';

const expectValidationResultToBeFalsy = (result: FieldValidationResult) => {
  expect(result.type).toEqual(VALIDATION_TYPE);
  expect(result.succeeded).toBeFalsy();
  expect(result.errorMessage === validMessage).toBeFalsy();
};

const expectValidationResultToBeTruthy = (result: FieldValidationResult) => {
  expect(result.type).toEqual(VALIDATION_TYPE);
  expect(result.succeeded).toBeTruthy();
  expect(result.errorMessage).toEqual(validMessage);
};

describe('validateDateInPeriod', () => {
  it('Check undefined date in period', () => {
    // Arrange
    const inputDate: string = undefined;
    const period: string[] = ['1994/august/06', '1994/august/06'];

    // Act.
    const result: FieldValidationResult = validateDateInPeriod(inputDate, period[0], period[1]);

    // Assert.
    expectValidationResultToBeFalsy(result);
  });

  it('Check null date in period', () => {
    // Arrange
    const inputDate: string = null;
    const period: string[] = ['1994/august/06', '1994/august/06'];

    // Act.
    const result: FieldValidationResult = validateDateInPeriod(inputDate, period[0], period[1]);

    // Assert.
    expectValidationResultToBeFalsy(result);
  });

  it('Check date in period with same begin and ending', () => {
    // Arrange
    const inputDate: string = '1994/august/06';
    const period: string[] = ['1994/august/06', '1994/august/06'];

    // Act.
    const result: FieldValidationResult = validateDateInPeriod(inputDate, period[0], period[1]);

    // Assert.
    expectValidationResultToBeFalsy(result);
  });

  it('Check date in period with bars', () => {
    // Arrange
    const inputDate: string = '1994-august-07';
    const period: string[] = ['1994/august/06', '1994/august/08'];

    // Act.
    const result: FieldValidationResult = validateDateInPeriod(inputDate, period[0], period[1]);

    // Assert.
    expectValidationResultToBeTruthy(result);
  });

  it('Check date with case in month', () => {
    // Arrange
    const inputDate: string = '1994-FeBRuary-07';
    const period: string[] = ['1994/FeBRuary/06', '1994/FeBRuary/08'];

    // Act.
    const result: FieldValidationResult = validateDateInPeriod(inputDate, period[0], period[1]);

    // Assert.
    expectValidationResultToBeTruthy(result);
  });

  it('Check date with numbers in month', () => {
    // Arrange
    const inputDate: string = '1994-07-07';
    const period: string[] = ['1994/07/06', '1994-07-8'];

    // Act.
    const result: FieldValidationResult = validateDateInPeriod(inputDate, period[0], period[1]);

    // Assert.
    expectValidationResultToBeTruthy(result);
  });

  it('Check date with numbers in month and string in ending period', () => {
    // Arrange
    const inputDate: string = '1994-7-07';
    const period: string[] = ['1994-7-06', '1994-december-7'];

    // Act.
    const result: FieldValidationResult = validateDateInPeriod(inputDate, period[0], period[1]);

    // Assert.
    expectValidationResultToBeTruthy(result);
  });

  it('Check date in period with beginning greater than ending', () => {
    // Arrange
    const inputDate: string = '1994-10-27';
    const period: string[] = ['1994-FeBRuary-28', '1989-12-31'];

    // Act.
    const result: FieldValidationResult = validateDateInPeriod(inputDate, period[0], period[1]);

    // Assert.
    expectValidationResultToBeFalsy(result);
  });

  it('Check date less than begin period', () => {
    // Arrange
    const inputDate: string = '2019/5/21';
    const period: string[] = ['2019-5-28', '2019-6-17'];

    // Act.
    const result: FieldValidationResult = validateDateInPeriod(inputDate, period[0], period[1]);

    // Assert.
    expectValidationResultToBeFalsy(result);
  });

  it('Check date greater than end period', () => {
    // Arrange
    const inputDate: string = '2019/6/30';
    const period: string[] = ['2019-5-28', '2019-6-17'];

    // Act.
    const result: FieldValidationResult = validateDateInPeriod(inputDate, period[0], period[1]);

    // Assert.
    expectValidationResultToBeFalsy(result);
  });

  it('Check date in period with same year but diferent month', () => {
    // Arrange
    const inputDate: string = '1994-10-27';
    const period: string[] = ['1994-FeBRuary-28', '1994-12-31'];

    // Act.
    const result: FieldValidationResult = validateDateInPeriod(inputDate, period[0], period[1]);

    // Assert.
    expectValidationResultToBeTruthy(result);
  });

  it('Check date in period with same year and same beginning month', () => {
    // Arrange
    const inputDate: string = '2019/5/30';
    const period: string[] = ['2019-5-28', '2019-6-17'];

    // Act.
    const result: FieldValidationResult = validateDateInPeriod(inputDate, period[0], period[1]);

    // Assert.
    expectValidationResultToBeTruthy(result);
  });

  it('Check date in period with same year and same ending month', () => {
    // Arrange
    const inputDate: string = '2019-2-12';
    const period: string[] = ['2018-11-30', '2019-2-14'];

    // Act.
    const result: FieldValidationResult = validateDateInPeriod(inputDate, period[0], period[1]);

    // Assert.
    expectValidationResultToBeTruthy(result);
  });

  it('Check date in period with different year', () => {
    // Arrange
    const inputDate: string = '2018-12-29';
    const period: string[] = ['2017-11-30', '2019-2-14'];

    // Act.
    const result: FieldValidationResult = validateDateInPeriod(inputDate, period[0], period[1]);

    // Assert.
    expectValidationResultToBeTruthy(result);
  });
});
