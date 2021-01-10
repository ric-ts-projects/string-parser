// tslint:disable:curly
import { TypesTester } from "./../../_modules";

import { IPattern } from "./../interfaces";


export abstract class APattern implements IPattern {

    private static readonly PATTERN_MAX_OCCURENCES_NUMBER: number = 50;
    private static readonly PATTERN_MAX_OCCURENCES_NUMBER_NOT_DEFINED: number = null;

    private static caseSensitive: boolean = true;

    private precedingPatterns: Array<IPattern> = [];
    private followingPatterns: Array<IPattern> = [];

    private stringPatterns: Array<string> = [];
    private caseSensitive: boolean = true;
    private minOccurencesNumber: number = 1;
    private maxOccurencesNumber: number = APattern.PATTERN_MAX_OCCURENCES_NUMBER_NOT_DEFINED;

    constructor(stringPatterns: string | Array<string>) {
        if (TypesTester.isString(stringPatterns)) {
            this.setStringPattern(stringPatterns as string);

        } else {
            this.setStringPatterns(stringPatterns as Array<string>);
        }

        this.setDefaultCaseSensitivity();
    }

    private setDefaultCaseSensitivity(): void {
        this.setCaseSensitive(APattern.caseSensitive);

    }

    setCaseSensitive(caseSensitive: boolean): IPattern {
        this.caseSensitive = caseSensitive;
        return (this);
    }

    static setCaseSensitive(caseSensitive: boolean): void {
        this.caseSensitive = caseSensitive;
    }

    setStringPattern(stringPattern: string): IPattern {
        this.setStringPatterns(Array(stringPattern));
        return (this);
    }

    setStringPatterns(stringPatterns: Array<string>): IPattern {
        this.resetStringPatterns();
        for (const stringPattern of stringPatterns) {
            this.addStringPattern(stringPattern);
        }
        return (this);
    }

    addStringPattern(stringPattern: string): IPattern {
        if (TypesTester.isNotEmptyString(stringPattern)) {
            this.stringPatterns.push(stringPattern);

        } else throw new Error("Not empty string expected.");
        return (this);
    }

    private resetStringPatterns(): void {
        this.stringPatterns = [];
    }

    precededBy(
        precedingPattern: IPattern | Array<IPattern>
    ): IPattern {
        if (precedingPattern !== null) {
            const precedingPatterns: Array<IPattern> =
                (Array.isArray(precedingPattern)) ?
                    precedingPattern
                    :
                    Array(precedingPattern)
                ;

            this.addPrecedingPatterns(precedingPatterns);
        }
        return (this);
    }
    private addPrecedingPatterns(precedingPatterns: Array<IPattern>): void {
        if (precedingPatterns !== null) {
            precedingPatterns.reverse();
            for (const precedingPattern of precedingPatterns) {
                this.addPrecedingPattern(precedingPattern);
            }
        }
    }
    private addPrecedingPattern(precedingPattern: IPattern): void {
        if (precedingPattern !== null && precedingPattern !== this) {
            this.precedingPatterns.unshift(precedingPattern);
        }
    }
    getPrecedingPatterns(): Array<IPattern> {
        return (this.precedingPatterns);
    }

    followedBy(
        followingPattern: IPattern | Array<IPattern>
    ): IPattern {
        if (followingPattern !== null) {
            const followingPatterns: Array<IPattern> =
                (Array.isArray(followingPattern)) ?
                    followingPattern
                    :
                    Array(followingPattern)
                ;

            this.addFollowingPatterns(followingPatterns);
        }
        return (this);
    }
    private addFollowingPatterns(followingPatterns: Array<IPattern>): void {
        if (followingPatterns !== null) {
            for (const followingPattern of followingPatterns) {
                this.addFollowingPattern(followingPattern);
            }
        }
    }
    private addFollowingPattern(followingPattern: IPattern): void {
        if (followingPattern !== null && followingPattern !== this) {
            this.followingPatterns.push(followingPattern);
        }
    }
    getFollowingPatterns(): Array<IPattern> {
        return (this.followingPatterns);
    }


    setMinOccurencesNumber(minOccurencesNumber: number): IPattern {
        this.minOccurencesNumber = minOccurencesNumber;
        this.checkValidNbOccurences();
        return (this);
    }
    getMinOccurencesNumber(): number {
        return (this.minOccurencesNumber);
    }
    setMaxOccurencesNumber(maxOccurencesNumber: number): IPattern {
        this.minOccurencesNumber = maxOccurencesNumber;
        this.checkValidNbOccurences();
        return (this);
    }
    getMaxOccurencesNumber(): number {
        return (this.maxOccurencesNumber);
    }
    setOccurencesNumbers(minOccurencesNumber: number, maxOccurencesNumber: number = APattern.PATTERN_MAX_OCCURENCES_NUMBER_NOT_DEFINED): IPattern {
        this.setMinOccurencesNumber(minOccurencesNumber);
        this.setMaxOccurencesNumber(maxOccurencesNumber);
        return (this);
    }

    //@return {string | null} null si échec du match.
    getStringToParseMatchingOneStringPattern(stringToParse: string): (string | null) {
        let retour: string = null;

        for (const stringPattern of this.stringPatterns) {
            retour = this.getStringToParseMatchingStringPattern(stringToParse, stringPattern);

            if (retour !== null) {
                break;
            }

        }

        return (retour);
    }

    //@return {string | null} null si échec du match.
    private getStringToParseMatchingStringPattern(stringToParse: string, stringPattern: string): (string | null) {
        let retour: string;

        let matching: boolean;
        let stringToParseStart: string = stringToParse.substr(0, stringPattern.length);
        let stringToParseStartToCompare: string = stringToParseStart;

        if (!this.caseSensitive) {
            stringPattern = stringPattern.toUpperCase();
            stringToParseStartToCompare = stringToParseStartToCompare.toUpperCase();
        }

        matching = (stringToParseStartToCompare === stringPattern);

        retour = (matching) ? stringToParseStart : null;

        return (retour);
    }

    isDefinedMaxOccurencesNumber(): boolean {
        const retour: boolean = (this.maxOccurencesNumber !== APattern.PATTERN_MAX_OCCURENCES_NUMBER_NOT_DEFINED);
        return (retour);
    }


    private checkValidNbOccurences(): void {
        const ok: boolean = this.testValidNbOccurences();
        if (!ok) {
            throw new Error(`Nombre d'occurences min=${this.minOccurencesNumber} ou max=${this.maxOccurencesNumber}, invalide.`);
        }
    }
    private testValidNbOccurences(): boolean {
        const retour: boolean = (
            (this.minOccurencesNumber >= 0)
            &&
            (this.maxOccurencesNumber <= APattern.PATTERN_MAX_OCCURENCES_NUMBER)
            &&
            (this.maxOccurencesNumber >= this.minOccurencesNumber)
        );
        return (retour);
    }

}