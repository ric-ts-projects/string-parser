import { IStringComparator } from "./../../_modules";
import { ISimplePattern } from "./ISimplePattern";

export interface IStringPattern extends ISimplePattern {
    setMatchComparator(matchComparator: IStringComparator): IStringPattern;
}