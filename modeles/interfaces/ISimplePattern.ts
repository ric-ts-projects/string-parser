import { IPattern } from "./IPattern";

export interface ISimplePattern extends IPattern {

    setCaseSensitive(caseSensitive: boolean): ISimplePattern;

    defineStringPatterns(stringPatterns: Array<string>): ISimplePattern;
    defineStringPattern(stringPattern: string): ISimplePattern;
    addStringPatterns(stringPatterns: Array<string>): ISimplePattern;
    addStringPattern(stringPattern: string): ISimplePattern;

    // //@return {string | null} null si échec du match.
    // getStringToParseMatchingOneStringPattern(stringToParse: string): (string | null);
    
}