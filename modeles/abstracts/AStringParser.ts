import { IPattern, IPatternMatchingOccurence, IStringToParse } from "./../interfaces";
import { PatternMatchingOccurence } from "./PatternMatchingOccurence";

export abstract class AStringParser {

    //@return {Array<IPatternMatchingOccurence> | null} null si échec du match.
    getPatternMatchingOccurences(centralPattern: IPattern, stringToParse: IStringToParse): (Array<IPatternMatchingOccurence> | null) {
        let result: Array<IPatternMatchingOccurence> = [];

        stringToParse.savePointerPosition();

        const centralPatternPrecedingPatterns: Array<IPattern> = centralPattern.getPrecedingPatterns();
        const centralPatternFollowingPatterns: Array<IPattern> = centralPattern.getFollowingPatterns();

        const allPatterns: Array<IPattern> = []
                                            .concat(centralPatternPrecedingPatterns)
                                            .concat(centralPattern)
                                            .concat(centralPatternFollowingPatterns)
                                            ;
        
        let matchingOccurences: Array<IPatternMatchingOccurence>;
        for(const pattern of allPatterns) {
            matchingOccurences = (pattern === centralPattern) ?
                                     this.getCentralPatternMatchingOccurences(pattern, stringToParse)
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

    //@return {Array<IPatternMatchingOccurence> | null} null si échec du match.
    private getCentralPatternMatchingOccurences(centralPattern: IPattern, stringToParse: IStringToParse)
        : (Array<IPatternMatchingOccurence> | null) {

        let result: Array<IPatternMatchingOccurence> = null;
        if (!stringToParse.isPointerAtTheEnd()) {
            let isBadMatchingOccurencesNumber: boolean = false;
    
            let stringToParseMatchingOneStringPattern: string;
            let patternMatchingOccurence: IPatternMatchingOccurence;
            let isStringToParseMatchingOneStringPattern: boolean;

            result = [];
            stringToParse.savePointerPosition();
            do {
                stringToParseMatchingOneStringPattern = centralPattern.getStringToParseMatchingOneStringPattern(
                    stringToParse.getRemainingStringToParse()
                );
                
                isStringToParseMatchingOneStringPattern = (stringToParseMatchingOneStringPattern !== null);
                if (isStringToParseMatchingOneStringPattern)  {

                    patternMatchingOccurence = this.createPatternMatchingOccurence(
                        centralPattern, 
                        stringToParseMatchingOneStringPattern,
                        stringToParse.getPointerPosition()
                    );
                    result.push(patternMatchingOccurence);
                    
                    isBadMatchingOccurencesNumber = this.hasFoundTooManyMatchingOccurences(centralPattern, result);
    
                    stringToParse.incrementPointerPosition(stringToParseMatchingOneStringPattern.length);
                }            
    
            } while(isStringToParseMatchingOneStringPattern && !isBadMatchingOccurencesNumber && !stringToParse.isPointerAtTheEnd());
    
    
            if (!isBadMatchingOccurencesNumber) {
                isBadMatchingOccurencesNumber = this.hasFoundNotEnoughMatchingOccurences(centralPattern, result);
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
    
    private hasFoundTooManyMatchingOccurences(pattern: IPattern, matchingOccurences: Array<IPatternMatchingOccurence>): boolean {
        let result: boolean = false;

        if (pattern.isDefinedMaxOccurencesNumber()) {
            result = (matchingOccurences.length > pattern.getMaxOccurencesNumber());
        }

        return(result);
    }

    private hasFoundNotEnoughMatchingOccurences(pattern: IPattern, matchingOccurences: Array<IPatternMatchingOccurence>): boolean {
        const result: boolean =  (matchingOccurences.length < pattern.getMinOccurencesNumber());
        return(result);
    }


    // private createPatternMatchingOccurence(
    //     pattern: IPattern, 
    //     stringToParseMatching: string,
    //     stringToParsePointerPosition: number, 
    // ): IPatternMatchingOccurence {
    //     const result: IPatternMatchingOccurence = new PatternMatchingOccurence(
    //         pattern, 
    //         stringToParseMatching,
    //         stringToParsePointerPosition
    //     );
    //     return(result);
    // }

}