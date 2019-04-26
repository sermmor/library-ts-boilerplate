import {FieldValidationResult} from 'lc-form-validation';

const invalidPeriodMessage: string = 'Invalid period';
const invalidInputDateInPeriod: string = 'Invalid date between two dates';
const separatorDateTypeLine: string = '-';
const separatorDateTypeSlash: string = '/';
const allMonths: string[] = ["january", "february", "march", "april", "may", "june", "july", "august", 
    "september", "october", "november", "december"];

const isAllNumbers = (listNumbers: string[]): boolean => {
    for (let number of listNumbers) {
        if (Number.isNaN(+number)) {
            return false;
        }
    }
    return true;
}

const parseMonthToNumber = (monthString: string) => allMonths.indexOf(monthString.toLowerCase()) + 1;

const isStringMonthAndDayYearNumbers = (dateSplited: string[]): boolean => {
    if (dateSplited.length !== 3) {    
        return false;
    }
    const [year, day]: number[] = [+dateSplited[0], +dateSplited[2]];
    const month: string = dateSplited[1];
    return !Number.isNaN(year) && allMonths.indexOf(month.toLowerCase()) !== -1 && !Number.isNaN(day);
}

const isLeapYear = (year: number) => (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);

const getMaxDayOfTheMonth = (year: number, month: number): number => {
    if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
        return 31;
    } else if (month === 2) {
        return isLeapYear(year) ? 29 : 28;
    } else {
        return 30;
    }
}

const isValidDay = (year: number, month: number, day: number): boolean => {
    return 0 < day && day <= getMaxDayOfTheMonth(year, month);
}

const isValidMonth = (month: number): boolean => {
    return 0 < month;
}

/**
 * Split date to [Year, Month, Day].
 * @param stringDate string with format Year-Month-Day or Year/Month/Day.
 */
const splitDate = (stringDate: string): number[] => {
    const separatorDate: string = stringDate.includes(separatorDateTypeLine) ? separatorDateTypeLine : separatorDateTypeSlash;
    const dateSplited: string[] = stringDate.split(separatorDate);

    if (dateSplited.length !== 3) {    
        return [];
    }
    
    if (isStringMonthAndDayYearNumbers(dateSplited)) {
        dateSplited[1] = parseMonthToNumber(dateSplited[1]).toString();
    }
    
    if (isAllNumbers(dateSplited)) {
        const [year, month, day]: number[] = [+dateSplited[0], +dateSplited[1], +dateSplited[2]];
        if (isValidMonth(month) && isValidDay(year, month, day)) {
            return [year, month, day];
        }
    }

    return [];
}

const isInRange = (n: number, rangeBeginning: number, rangeEnding: number, includeEnding: boolean = true): boolean => {
    return includeEnding ? rangeBeginning <= n && n <= rangeEnding : rangeBeginning <= n && n < rangeEnding;
}

const isMonthDayInPeriodWithSameYear = ([monthInput, dayInput]: number[], [monthBegin, dayBegin]: number[], [monthEnd, dayEnd]: number[]): boolean => {
    if (monthInput === monthBegin && monthBegin === monthEnd) {
        return isInRange(dayInput, dayBegin, dayEnd, false);
    } else if (monthInput === monthBegin){
        return dayInput >= dayBegin;
    } else if (monthInput === monthEnd){
        return dayInput < dayEnd;
    } else {
        return isInRange(monthInput, monthBegin, monthEnd);
    }
}

const isMonthDayInPeriodYearBeggining = ([monthInput, dayInput]: number[], [monthBegin, dayBegin]: number[]): boolean => {
    if (monthInput === monthBegin) {
        return dayInput >= dayBegin;
    } else {
        return monthInput > monthBegin;
    }
}

const isMonthDayInPeriodYearEnding = ([monthInput, dayInput]: number[], [monthEnd, dayEnd]: number[]): boolean => {
    if (monthInput === monthEnd) {
        return dayInput < dayEnd;
    } else {
        return monthInput < monthEnd;
    }
}

const isAValidPeriod = ([yearBegin, monthBegin, dayBegin]: number[], [yearEnd, monthEnd, dayEnd]: number[]): boolean => {
    return yearBegin < yearEnd || monthBegin < monthEnd || dayBegin < dayEnd;
}

/**
 * Check if dateInput is between dateBeginning and dateEnding (dateBeginning <= dateInput < dateEnding).
 * @param dateInput date (with format Year-Month-Day or Year/Month/Day) to check whether it's in period or not.
 * @param dateBeginningSplit date (with format [Year, Month, Day]) initial of the period.
 * @param dateEndingSplit date (with format [Year, Month, Day]) ending of the period.
 */
const isDateInPeriod = (dateInput: string, dateBeginningSplit: number[], dateEndingSplit: number[]): boolean => {
    const dateInputSplit: number[] = splitDate(dateInput);

    if (dateInputSplit === []) {
        return false;
    }

    const [yearInput, monthInput, dayInput] = dateInputSplit;
    const [yearBegin, monthBegin, dayBegin] = dateBeginningSplit;
    const [yearEnd, monthEnd, dayEnd] = dateEndingSplit;
    
    if (yearInput === yearBegin && yearBegin === yearEnd) {
        return isMonthDayInPeriodWithSameYear([monthInput, dayInput], [monthBegin, dayBegin], [monthEnd, dayEnd]);
    } else if (yearInput === yearBegin) {
        return isMonthDayInPeriodYearBeggining([monthInput, dayInput], [monthBegin, dayBegin]);
    } else if (yearInput === yearEnd) {
        return isMonthDayInPeriodYearEnding([monthInput, dayInput], [monthEnd, dayEnd]);
    } else {
        return isInRange(yearInput, yearBegin, yearEnd);
    }
}

export const VALIDATION_TYPE = 'DATE_IN_PERIOD';

/**
 * Validate if dateInput is between dateBeginning and dateEnding (dateBeginning <= dateInput < dateEnding).
 * @param dateInput date (with format Year-Month-Day or Year/Month/Day) to check whether it's in period or not.
 * @param dateBeginning date (with format Year-Month-Day or Year/Month/Day) initial of the period.
 * @param dateEnding date (with format Year-Month-Day or Year/Month/Day) ending of the period.
 */
export const validateDateInPeriod = (dateInput: string, dateBeginning: string, dateEnding: string): FieldValidationResult => {
    const result = new FieldValidationResult();
    const dateBeginningSplit: number[] = splitDate(dateBeginning);
    const dateEndingSplit: number[] = splitDate(dateEnding);
    let valid: boolean = true;
    let invalidMessage: string = '';

    if (dateBeginningSplit === [] || dateEndingSplit === [] || !isAValidPeriod(dateBeginningSplit, dateEndingSplit)) {
        valid = false;
        invalidMessage = invalidPeriodMessage;
    } else if (!isDateInPeriod(dateInput, dateBeginningSplit, dateEndingSplit)) {
        valid = false;
        invalidMessage = invalidInputDateInPeriod;
    }

    result.type = VALIDATION_TYPE;
    result.succeeded = valid;
    result.errorMessage = valid ? '' : invalidMessage;

    return result;

}
