import { IPattern, IPatternMatchingOccurence, IStringToParse } from "./../interfaces";
import { PatternMatchingOccurence } from "./PatternMatchingOccurence";

export abstract class AStringParser {

    //@return {Array<IPatternMatchingOccurence> | null} null si échec du match.
    getPatternMatchingOccurences(centralPattern: IPattern, stringToParse: IStringToParse): (Array<IPatternMatchingOccurence> | null) {
        let retour: Array<IPatternMatchingOccurence> = [];

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
            retour = retour.concat( matchingOccurences );
        }
        
        if ( matchingOccurences === null ) {
            retour = null;
            stringToParse.restoreLastSavedPointerPosition();

        } else {
            stringToParse.cancelLastSavedPointerPosition();
        }

        return(retour);
    }

    //@return {Array<IPatternMatchingOccurence> | null} null si échec du match.
    private getCentralPatternMatchingOccurences(centralPattern: IPattern, stringToParse: IStringToParse)
        : (Array<IPatternMatchingOccurence> | null) {

        let retour: Array<IPatternMatchingOccurence> = null;
        if (!stringToParse.isPointerAtTheEnd()) {
            let isBadMatchingOccurencesNumber: boolean = false;
    
            let stringToParseMatchingOneStringPattern: string;
            let patternMatchingOccurence: IPatternMatchingOccurence;
            let isStringToParseMatchingOneStringPattern: boolean;

            retour = [];
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
                    retour.push(patternMatchingOccurence);
                    
                    isBadMatchingOccurencesNumber = this.hasFoundTooManyMatchingOccurences(centralPattern, retour);
    
                    stringToParse.incrementPointerPosition(stringToParseMatchingOneStringPattern.length);
                }            
    
            } while(isStringToParseMatchingOneStringPattern && !isBadMatchingOccurencesNumber && !stringToParse.isPointerAtTheEnd());
    
    
            if (!isBadMatchingOccurencesNumber) {
                isBadMatchingOccurencesNumber = this.hasFoundNotEnoughMatchingOccurences(centralPattern, retour);
            }
    
            if (isBadMatchingOccurencesNumber) {
                retour = null;
                stringToParse.restoreLastSavedPointerPosition();

            } else {
                stringToParse.cancelLastSavedPointerPosition();

            }
        }        

        return(retour);
    }
    
    private hasFoundTooManyMatchingOccurences(pattern: IPattern, matchingOccurences: Array<IPatternMatchingOccurence>): boolean {
        let retour: boolean = false;

        if (pattern.isDefinedMaxOccurencesNumber()) {
            retour = (matchingOccurences.length > pattern.getMaxOccurencesNumber());
        }

        return(retour);
    }

    private hasFoundNotEnoughMatchingOccurences(pattern: IPattern, matchingOccurences: Array<IPatternMatchingOccurence>): boolean {
        const retour: boolean =  (matchingOccurences.length < pattern.getMinOccurencesNumber());
        return(retour);
    }


    private createPatternMatchingOccurence(
        pattern: IPattern, 
        stringToParseMatching: string,
        stringToParsePointerPosition: number, 
    ): IPatternMatchingOccurence {
        const retour: IPatternMatchingOccurence = new PatternMatchingOccurence(
            pattern, 
            stringToParseMatching,
            stringToParsePointerPosition
        );
        return(retour);
    }

}