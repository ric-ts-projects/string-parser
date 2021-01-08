export interface IPattern {

    setStringPattern(stringPattern: string): IPattern;
    setStringPatterns(stringPatterns: Array<string>): IPattern;
    addStringPattern(stringPattern: string): IPattern;

    precededBy(precedingByPattern: IPattern): IPattern;
    followedBy(followingPattern: IPattern): IPattern;

    setMinNbOccurences(minNbOccurences: number): IPattern;
    setMaxNbOccurences(maxNbOccurences: number): IPattern;
    setNbOccurences(minNbOccurences: number, maxNbOccurences?: number): IPattern;

    isMatching(stringToParse: string): boolean;

}