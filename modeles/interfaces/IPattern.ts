import { IStringToParse } from "./IStringToParse";

export interface IPattern {

    setStringPattern(stringPattern: string): IPattern;
    setStringPatterns(stringPatterns: Array<string>): IPattern;
    addStringPattern(stringPattern: string): IPattern;

    precededBy(
        precedingByPattern: IPattern, 
        minOccurencesNumber: number, 
        maxOccurencesNumber?: number
    ): IPattern;
    followedBy(
        followingPattern: IPattern, 
        minOccurencesNumber: number, 
        maxOccurencesNumber?: number
    ): IPattern;

    setCaseSensitive(caseSensitive: boolean): IPattern;
    setMinOccurencesNumber(minOccurencesNumber: number): IPattern;
    setMaxOccurencesNumber(maxOccurencesNumber: number): IPattern;
    setOccurencesNumbers(minOccurencesNumber: number, maxOccurencesNumber?: number): IPattern;

    getOccurences(stringToParse: IStringToParse): Array<string>;
    
}