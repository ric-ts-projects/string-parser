import { IPattern, IStringToParse, IStringToParseMatching } from "./../interfaces";
import { StringToParseMatchingArrayOrNull } from "./../types";

import { StringToParseMatching } from "./../concreteClasses";


export abstract class APattern implements IPattern {

    private static readonly PATTERN_MAX_OCCURENCES_NUMBER: number = 50;
    private static readonly PATTERN_MAX_OCCURENCES_NUMBER_NOT_DEFINED: number = null;

    private minOccurencesNumber: number = 1;
    private maxOccurencesNumber: number = APattern.PATTERN_MAX_OCCURENCES_NUMBER_NOT_DEFINED;

    constructor() {
    }

    abstract getStringToParseMatchings(stringToParse: IStringToParse): StringToParseMatchingArrayOrNull;
       

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


    isDefinedMaxOccurencesNumber(): boolean {
        const result: boolean = (this.maxOccurencesNumber !== APattern.PATTERN_MAX_OCCURENCES_NUMBER_NOT_DEFINED);
        return (result);
    }


    private checkValidNbOccurences(): void {
        const ok: boolean = this.testValidNbOccurences();
        if (!ok) {
            throw new Error(`Nombre d'occurences min=${this.minOccurencesNumber} ou max=${this.maxOccurencesNumber}, invalide.`);
        }
    }
    private testValidNbOccurences(): boolean {
        const result: boolean = (
            (this.minOccurencesNumber >= 0)
            &&
            (this.maxOccurencesNumber <= APattern.PATTERN_MAX_OCCURENCES_NUMBER)
            &&
            (this.maxOccurencesNumber >= this.minOccurencesNumber)
        );
        return (result);
    }


    protected createStringToParseMatchingObject(
        pattern: IPattern, 
        stringToParseMatching: string,
        stringToParsePointerPosition: number, 
    ): IStringToParseMatching {
        const masterPattern: IPattern = (pattern === this)? null : this;
        const result: IStringToParseMatching = new StringToParseMatching(
            masterPattern,
            pattern, 
            stringToParseMatching,
            stringToParsePointerPosition
        );
        return(result);
    }    

}