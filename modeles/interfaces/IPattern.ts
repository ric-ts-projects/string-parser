import { IStringToParse } from "./IStringToParse";

export interface IPattern {

    setStringPattern(stringPattern: string): IPattern;
    setStringPatterns(stringPatterns: Array<string>): IPattern;
    addStringPattern(stringPattern: string): IPattern;

    precededBy(
        precedingPattern: IPattern | Array<IPattern>
    ): IPattern;
    getPrecedingPatterns(): Array<IPattern>;

    followedBy(
        followingPattern: IPattern | Array<IPattern>
    ): IPattern;
    getFollowingPatterns(): Array<IPattern>;

    setCaseSensitive(caseSensitive: boolean): IPattern;

    setMinOccurencesNumber(minOccurencesNumber: number): IPattern;
    getMinOccurencesNumber(): number;
    setMaxOccurencesNumber(maxOccurencesNumber: number): IPattern;
    getMaxOccurencesNumber(): number;
    isDefinedMaxOccurencesNumber(): boolean;
    setOccurencesNumbers(minOccurencesNumber: number, maxOccurencesNumber?: number): IPattern;

    //@return {string | null} null si échec du match.
    getStringToParseMatchingOneStringPattern(stringToParse: string): (string | null);
    
}