import { IPattern, IStringToParseMatching, IStringToParse } from "./../interfaces";
import { StringToParseMatchingArrayOrNull } from "./../types";


export abstract class AStringParser {

    //@return {Array<IStringToParseMatching> | null} null if matching fails.
    getPatternMatchingOccurences(centralPattern: IPattern, stringToParse: IStringToParse)
        : StringToParseMatchingArrayOrNull {

        let result: Array<IStringToParseMatching> = [];

        stringToParse.savePointerPosition();

        const centralPatternPrecedingPatterns: Array<IPattern> = centralPattern.getPrecedingPatterns();
        const centralPatternFollowingPatterns: Array<IPattern> = centralPattern.getFollowingPatterns();

        const allPatterns: Array<IPattern> = []
                                            .concat(centralPatternPrecedingPatterns)
                                            .concat(centralPattern)
                                            .concat(centralPatternFollowingPatterns)
                                            ;
        
        let matchingOccurences: Array<IStringToParseMatching>;
        for(const pattern of allPatterns) {
            matchingOccurences = (pattern === centralPattern) ?
                                     this.getPatternStringToParseMatchings(pattern, stringToParse)
                                 :
                                     this.getPatternMatchingOccurences(pattern, stringToParse)
                                 ;
            if ( matchingOccurences === null ) {
                break;
            }         
            result = result.concat( matchingOccurences );
        }
        
        if ( matchingOccurences === null ) {
            result = null;
            stringToParse.restoreLastSavedPointerPosition();

        } else {
            stringToParse.cancelLastSavedPointerPosition();
        }

        return(result);
    }

    //@return {Array<IStringToParseMatching> | null} null if matching fails.
    private getPatternStringToParseMatchings(pattern: IPattern, stringToParse: IStringToParse)
        : StringToParseMatchingArrayOrNull {

        let result: StringToParseMatchingArrayOrNull = null;
        if (!stringToParse.isPointerAtTheEnd()) {
            let isBadMatchingOccurencesNumber: boolean = false;
    
            let stringToParseMatchings: StringToParseMatchingArrayOrNull;
            let isStringToParseMatchings: boolean;

            result = [];
            stringToParse.savePointerPosition();
            do {
                stringToParseMatchings = pattern.getStringToParseMatchings(
                    stringToParse
                );
                
                isStringToParseMatchings = (stringToParseMatchings !== null);
                if (isStringToParseMatchings)  {

                    result = result.concat( stringToParseMatchings );
                    
                    isBadMatchingOccurencesNumber = this.hasFoundTooManyMatchingOccurences(pattern, result);
    
                    stringToParse.incrementPointerPosition(stringToParseMatchingOneStringPattern.length); ???
                }            
    
            } while(isStringToParseMatchings??? && !isBadMatchingOccurencesNumber && !stringToParse.isPointerAtTheEnd());
    
    
            if (!isBadMatchingOccurencesNumber) {
                isBadMatchingOccurencesNumber = this.hasFoundNotEnoughMatchingOccurences(pattern, result);
            }
    
            if (isBadMatchingOccurencesNumber) {
                result = null;
                stringToParse.restoreLastSavedPointerPosition();

            } else {
                stringToParse.cancelLastSavedPointerPosition();

            }
        }        

        return(result);
    }
    
    private hasFoundTooManyMatchingOccurences(pattern: IPattern, matchingOccurences: Array<IStringToParseMatching>): boolean {
        let result: boolean = false;

        if (pattern.isDefinedMaxOccurencesNumber()) {
            result = (matchingOccurences.length > pattern.getMaxOccurencesNumber());
        }

        return(result);
    }

    private hasFoundNotEnoughMatchingOccurences(pattern: IPattern, matchingOccurences: Array<IStringToParseMatching>): boolean {
        const result: boolean =  (matchingOccurences.length < pattern.getMinOccurencesNumber());
        return(result);
    }

}