import { IPattern } from "./IPattern";

export interface IPatternMatchingOccurence {

    getPattern(): IPattern;
    getStringToParseMatching(): string;
    getStringToParseMatchingLength(): number;
    getStringToParsePointerPosition(): number;

}