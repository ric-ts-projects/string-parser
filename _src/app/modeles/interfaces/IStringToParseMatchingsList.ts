import { IGenericList } from "./../../_modules";
import { IStringToParseMatching } from "./IStringToParseMatching";

export interface IStringToParseMatchingsList extends IGenericList<IStringToParseMatching> {
    getTotalLength(): number;
}



