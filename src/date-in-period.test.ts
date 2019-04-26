import { myFunction } from './date-in-period';

describe('myFunction', () => {
  it('should return true', () => {
    // Arrage & Act & Assert
    // console.log(`WOLOLOOO... ${splitDate("1986/october/09")}`);
    // console.log(`WOLOLOOO... ${splitDate("1986-october-09")}`);
    // console.log(`WOLOLOOO... ${splitDate("1986-FeBRuary-28")}`);

    // console.log(`WOLOLOOO... ${isDateInPeriod("1986/10/09", "1986-FeBRuary-28", "1989-12-31")}`); // TRUE
    // console.log(`WOLOLOOO... ${isDateInPeriod("2019/5/21", "2019-5-28", "2019-6-17")}`); // FALSE
    // console.log(`WOLOLOOO... ${isDateInPeriod("2019/5/30", "2019-5-28", "2019-6-17")}`); // TRUE
    // console.log(`WOLOLOOO... ${isDateInPeriod("2018/12/31", "2018-12-25", "2019-01-6")}`); // TRUE
    // console.log(`WOLOLOOO... ${isDateInPeriod("2018-12-29", "2018-11-30", "2019-2-14")}`); // TRUE
    // console.log(`WOLOLOOO... ${isDateInPeriod("2019-2-12", "2018-11-30", "2019-2-14")}`); // TRUE
    // console.log(`WOLOLOOO... ${isDateInPeriod("2019-2-16", "2018-11-30", "2019-2-14")}`); // FALSE

    expect(myFunction(undefined)).toBeTruthy();
  });
});
