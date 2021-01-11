import { StringToParseMatchingArrayOrNull } from "./../types";
import { AOrderedPatternsList } from "./../abstracts";

export class OrderedFullMatchPatternsList extends AOrderedPatternsList {
    mustStopSearchingMatching(stringToParseMatchings: StringToParseMatchingArrayOrNull): boolean {
        const result: boolean = (stringToParseMatchings === null);
        return(result);
    }
}