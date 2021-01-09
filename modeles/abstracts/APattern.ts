// tslint:disable:curly
import { TypesTester } from "./../../_modules";

import { IPattern, IStringToParse } from "./../interfaces";


export abstract class APattern implements IPattern {

    private static readonly PATTERN_MAX_OCCURENCES_NUMBER: number = 50;
    private static readonly PATTERN_MAX_OCCURENCES_NUMBER_NOT_DEFINED: number = null;

    private static caseSensitive: boolean = true;

    private precedingByPattern: IPattern = null;
    private followingPattern: IPattern = null;

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

        this.setCaseSensitive(APattern.caseSensitive);

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

    getOccurences(stringToParse: IStringToParse): Array<string> {
        const retour: Array<string> = [].concat( 
                                            this.getPrecedingPatternOccurences(stringToParse),
                                            this.getSelfOccurences(stringToParse),
                                            this.getFollowingPatternOccurences(stringToParse)
                                        );
//@TODO : en cas de tableau vide, comment gérer...
        return(retour);
    }

    private getPrecedingPatternOccurences(stringToParse: IStringToParse): Array<string> {
        const retour: Array<string> = (this.precedingByPattern !== null) ?
                                        this.precedingByPattern.getOccurences(stringToParse)
                                      :
                                        []
                                      ;
        return(retour);
    }

    private getFollowingPatternOccurences(stringToParse: IStringToParse): Array<string> {
        const retour: Array<string> = (this.followingPattern !== null) ?
                                        this.followingPattern.getOccurences(stringToParse)
                                      :
                                        []
                                      ;
        return(retour);
    }    

    private getSelfOccurences(stringToParse: IStringToParse): Array<string> {
        let retour: Array<string> = [];
        if (!stringToParse.isPointerAtTheEnd()) {
            let badMatch: boolean = false;
    
            let stringToParseMatchingStringPattern: string;
            const isDefinedMaxOccurencesNumber: boolean = this.isDefinedMaxOccurencesNumber();
            let tooManyOccurences: boolean = false;
            let occurenceMatchingOneStringPattern: boolean;

            stringToParse.savePointerPosition();

            do {
                
                occurenceMatchingOneStringPattern = false;
                for(const stringPattern of this.stringPatterns) {
                    stringToParseMatchingStringPattern = this.getStringToParseMatchingStringPattern(stringToParse, stringPattern);
                    occurenceMatchingOneStringPattern = (stringToParseMatchingStringPattern !== null);
    
                    if (occurenceMatchingOneStringPattern) {
                        retour.push(stringToParseMatchingStringPattern);
                        break;
                        
                    }
    
                }
    
                if (occurenceMatchingOneStringPattern) {
                    
                    if (isDefinedMaxOccurencesNumber) {
                        tooManyOccurences = (retour.length > this.maxOccurencesNumber);
                        if (tooManyOccurences) {
                            badMatch = true;
                            break;
                        }
                    }
    
                    stringToParse.incrementPointerPosition(stringToParseMatchingStringPattern.length);
    
                }            
    
            } while(occurenceMatchingOneStringPattern && !stringToParse.isPointerAtTheEnd());
    
    
            if (!badMatch) {
                badMatch = (retour.length < this.minOccurencesNumber);
            }
    
            if (badMatch) {
                retour = [];
                stringToParse.restoreSavedPointerPosition();
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