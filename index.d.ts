/**
 * Validate if dateInput is between dateBeginning and dateEnding (dateBeginning <= dateInput < dateEnding).
 * @param dateInput date (with format Year-Month-Day or Year/Month/Day) to check whether it's in period or not.
 * @param dateBeginning date (with format Year-Month-Day or Year/Month/Day) initial of the period.
 * @param dateEnding date (with format Year-Month-Day or Year/Month/Day) ending of the period.
 */
import FieldValidationResult from 'lc-form-validation';

export declare const VALIDATION_TYPE : string;
export declare function validateDateInPeriod(dateInput: string, dateBeginning: string, dateEnding: string): FieldValidationResult;