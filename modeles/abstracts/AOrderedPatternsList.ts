import { IPattern, IStringToParse } from "./../interfaces";
import { StringToParseMatchingArrayOrNull } from "./../types";
import { APatternsList } from "./APatternsList"



export abstract class AOrderedPatternsList extends APatternsList {
    
    protected abstract mustStopSearchingMatching(stringToParseMatchings: StringToParseMatchingArrayOrNull): boolean;

    getStringToParseMatchings(stringToParse: IStringToParse): StringToParseMatchingArrayOrNull {
        let result: StringToParseMatchingArrayOrNull = null;

        this.list.each<StringToParseMatchingArrayOrNull>(
            (pattern: IPattern): StringToParseMatchingArrayOrNull => {
                const stringToParseMatchings: StringToParseMatchingArrayOrNull = 
                    pattern.getStringToParseMatchings(stringToParse);
                return(stringToParseMatchings);
            },

            (pattern: IPattern, stringToParseMatchings: StringToParseMatchingArrayOrNull): void => {
                if (stringToParseMatchings !== null) {
                    if (result === null) {
                        result = [];
                    }

                    result = result.concat ( stringToParseMatchings );

                }
            },

            (stringToParseMatchings: StringToParseMatchingArrayOrNull): boolean => {
                let breakLoop: boolean;
                breakLoop = this.mustStopSearchingMatching(stringToParseMatchings);
                return(breakLoop);
            }
        );

        return(result);
    }

}