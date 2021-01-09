// tslint:disable:curly
import { TypesTester } from "./../../_modules";

import { IPattern, IStringToParse } from "./../interfaces";


export abstract class APattern implements IPattern {

    private static readonly PATTERN_MAX_OCCURENCES_NUMBER: number = 50;
    private static readonly PATTERN_MAX_OCCURENCES_NUMBER_NOT_DEFINED: number = null;

    private static caseSensitive: boolean = true;

    private precedingByPattern: IPattern = null;
    private followingPattern: IPattern = null;
    private allGetMatchingOccurencesMethods: Array<Function> = [];

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
        this.defineAllGetMatchingOccurencesMethods();

    }
    
    private setDefaultCaseSensitivity(): void {
        this.setCaseSensitive(APattern.caseSensitive);

    }

    private defineAllGetMatchingOccurencesMethods(): void {
        this.allGetMatchingOccurencesMethods = [
            this.getPrecedingPatternMatchingOccurences,
            this.getPatternMatchingOccurences,
            this.getFollowingPatternMatchingOccurences
        ];
    }

    setCaseSensitive(caseSensitive: boolean): IPattern {
        this.caseSensitive = caseSensitive;
        return(this);
    }

    static setCaseSensitive(caseSensitive: boolean): void {
        this.caseSensitive = caseSensitive;
    }    

    setStringPattern(stringPattern: string): IPattern {
        this.setStringPatterns( Array(stringPattern) );
        return(this);
    }

    setStringPatterns(stringPatterns: Array<string>): IPattern {
        this.resetStringPatterns();
        for (const stringPattern of stringPatterns) {
            this.addStringPattern(stringPattern);
        }
        return(this);
    }

    addStringPattern(stringPattern: string): IPattern {
        if (TypesTester.isNotEmptyString(stringPattern)) {
            this.stringPatterns.push(stringPattern);

        } else throw new Error("Not empty string expected.");
        return(this);
    }

    private resetStringPatterns(): void {
      this.stringPatterns = [];
    }

    precededBy(
        precedingByPattern: IPattern, 
        minOccurencesNumber: number, 
        maxOccurencesNumber: number = APattern.PATTERN_MAX_OCCURENCES_NUMBER_NOT_DEFINED
    ): IPattern {
        this.precedingByPattern = precedingByPattern;
        this.precedingByPattern.setOccurencesNumbers(minOccurencesNumber, maxOccurencesNumber);
        return(this);
    }
    followedBy(
        followingPattern: IPattern, 
        minOccurencesNumber: number, 
        maxOccurencesNumber: number = APattern.PATTERN_MAX_OCCURENCES_NUMBER_NOT_DEFINED
    ): IPattern {
        this.followingPattern = followingPattern;
        this.followingPattern.setOccurencesNumbers(minOccurencesNumber, maxOccurencesNumber);
        return(this);
    }

    setMinOccurencesNumber(minOccurencesNumber: number): IPattern {
        this.minOccurencesNumber = minOccurencesNumber;
        this.checkValidNbOccurences();
        return(this);
    }
    setMaxOccurencesNumber(maxOccurencesNumber: number): IPattern {
        this.minOccurencesNumber = maxOccurencesNumber;
        this.checkValidNbOccurences();
        return(this);
    }
    setOccurencesNumbers(minOccurencesNumber: number, maxOccurencesNumber: number = APattern.PATTERN_MAX_OCCURENCES_NUMBER_NOT_DEFINED): IPattern {
        this.setMinOccurencesNumber(minOccurencesNumber);
        this.setMaxOccurencesNumber(maxOccurencesNumber);
        return(this);
    }

    getMatchingOccurences(stringToParse: IStringToParse): (Array<string> | null) {
        let retour: Array<string> = [];

        stringToParse.savePointerPosition();
        
        let matchingOccurences: Array<string>;
        for(let getMatchingOccurencesMethod of this.allGetMatchingOccurencesMethods) {
            getMatchingOccurencesMethod = getMatchingOccurencesMethod.bind(this);
            matchingOccurences = getMatchingOccurencesMethod(stringToParse);
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

    private getPrecedingPatternMatchingOccurences(stringToParse: IStringToParse): (Array<string> | null) {
        const retour: Array<string> = (this.precedingByPattern !== null) ?
                                        this.precedingByPattern.getMatchingOccurences(stringToParse)
                                      :
                                        []
                                      ;
        return(retour);
    }

    private getFollowingPatternMatchingOccurences(stringToParse: IStringToParse): (Array<string> | null) {
        const retour: Array<string> = (this.followingPattern !== null) ?
                                        this.followingPattern.getMatchingOccurences(stringToParse)
                                      :
                                        []
                                      ;
        return(retour);
    }    

    //@return {Array<string> | null} null si échec du match.
    private getPatternMatchingOccurences(stringToParse: IStringToParse): (Array<string> | null) {
        let retour: Array<string> = null;
        if (!stringToParse.isPointerAtTheEnd()) {
            let isBadMatchingOccurencesNumber: boolean = false;
    
            let stringToParseMatchingOneStringPattern: string;
            let isStringToParseMatchingOneStringPattern: boolean;

            retour = [];
            stringToParse.savePointerPosition();
            do {
                stringToParseMatchingOneStringPattern = this.getStringToParseMatchingOneStringPattern(stringToParse);
                
                isStringToParseMatchingOneStringPattern = (stringToParseMatchingOneStringPattern !== null);
                if (isStringToParseMatchingOneStringPattern)  {

                    retour.push(stringToParseMatchingOneStringPattern);
                    
                    isBadMatchingOccurencesNumber = this.hasFoundTooManyMatchingOccurences(retour);
    
                    stringToParse.incrementPointerPosition(stringToParseMatchingOneStringPattern.length);
                }            
    
            } while(isStringToParseMatchingOneStringPattern && !isBadMatchingOccurencesNumber && !stringToParse.isPointerAtTheEnd());
    
    
            if (!isBadMatchingOccurencesNumber) {
                isBadMatchingOccurencesNumber = this.hasFoundNotEnoughMatchingOccurences(retour);
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

    private getStringToParseMatchingOneStringPattern(stringToParse: IStringToParse): (string | null) {
        let retour: string = null;

        for(const stringPattern of this.stringPatterns) {
            retour = this.getStringToParseMatchingStringPattern(stringToParse, stringPattern);

            if (retour !== null) {
                break;
            }
    
        }    

        return(retour);
    }

    private getStringToParseMatchingStringPattern(stringToParse: IStringToParse, stringPattern: string): (string | null) {
      let retour: string;
      
      let matching: boolean;
      const stringToParseStart: string = stringToParse.getStringFromPointerPosition(stringPattern.length);
      if (this.caseSensitive) {
        matching = (stringToParseStart === stringPattern);

      } else {
        matching = (stringToParseStart.toUpperCase() === stringPattern.toUpperCase());

      }

      retour = (matching)? stringToParseStart : null;

      return(retour);
    }

    private hasFoundTooManyMatchingOccurences(matchingOccurences: Array<string>): boolean {
        let retour: boolean = false;

        if (this.isDefinedMaxOccurencesNumber()) {
            retour = (matchingOccurences.length > this.maxOccurencesNumber);
        }

        return(retour);
    }

    private hasFoundNotEnoughMatchingOccurences(matchingOccurences: Array<string>): boolean {
        const retour: boolean =  (matchingOccurences.length < this.minOccurencesNumber);
        return(retour);
    }    

    private isDefinedMaxOccurencesNumber(): boolean {
        const retour: boolean = (this.maxOccurencesNumber !==APattern.PATTERN_MAX_OCCURENCES_NUMBER_NOT_DEFINED);
        return(retour);
    }


    private checkValidNbOccurences(): void {
      const ok: boolean = this.testValidNbOccurences();
      if (!ok) {
          throw new Error(`Nombre d'occurences min=${this.minOccurencesNumber} ou max=${this.maxOccurencesNumber}, invalide.`);
      }
    }
    private testValidNbOccurences(): boolean {
        const retour: boolean = (
                                        (this.minOccurencesNumber >=0)
                                    &&
                                        (this.maxOccurencesNumber <= APattern.PATTERN_MAX_OCCURENCES_NUMBER)
                                    &&
                                        (this.maxOccurencesNumber >= this.minOccurencesNumber)
                                );
        return(retour);
    }

}