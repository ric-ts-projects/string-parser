import { IComparator } from "./IComparator";

export interface IStringComparator extends IComparator<string> {

    setCaseSensitivity(caseSensitivity: boolean): IStringComparator;

}
