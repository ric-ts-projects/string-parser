// tslint:disable:curly
import { TypesTester } from "./../../_modules/modeles/TypesTester";

import { IPattern } from "./../interfaces/IPattern";


export abstract class APattern implements IPattern {

    static readonly PATTERN_MAX_NB_OCCURENCES: number = 50;

    private precedingByPattern: IPattern = null;
    private followingPattern: IPattern = null;

    private minNbOccurences: number = 1;
    private maxNbOccurences: number = 1;
    private stringPatterns: Array<string> = [];

    constructor(stringPatterns: string | Array<string>) {
        if (TypesTester.isString(stringPatterns)) {
            this.setStringPattern(stringPatterns as string);

        } else {
            this.setStringPatterns(stringPatterns as Array<string>);
        }

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

    precededBy(precedingByPattern: IPattern): IPattern {
        this.precedingByPattern = precedingByPattern;
        return(this);
    }
    followedBy(followingPattern: IPattern): IPattern {
        this.followingPattern = followingPattern;
        return(this);
    }

    setMinNbOccurences(minNbOccurences: number): IPattern {
        this.minNbOccurences = minNbOccurences;
        this.checkValidNbOccurences();
        return(this);
    }
    setMaxNbOccurences(maxNbOccurences: number): IPattern {
        this.minNbOccurences = maxNbOccurences;
        this.checkValidNbOccurences();
        return(this);
    }
    setNbOccurences(minNbOccurences: number, maxNbOccurences: number = APattern.PATTERN_MAX_NB_OCCURENCES): IPattern {
        this.setMinNbOccurences(minNbOccurences);
        this.setMaxNbOccurences(maxNbOccurences);
        return(this);
    }

    isMatching(stringToParse: string): boolean {
        let retour: boolean = false;
        for(const stringPattern of this.stringPatterns) {
            retour = this.isStringToParseMatchingStringPattern(stringToParse, stringPattern);
            if (retour) {
               break;
            }
        }
        return(retour);
    }

    private isStringToParseMatchingStringPattern(stringToParse: string, stringPattern: string): boolean {
      let retour: boolean;
      const stringToParseStart: string= stringToParse.substr(0, stringPattern.length);
      retour = (stringToParseStart === stringPattern);
      return(retour);
    }


    // getMatchingStrings(stringToParse: string): Array<string> {
    //     const retour: Array<string> = true;
    //     return(retour);
    // }

    private checkValidNbOccurences(): void {
      const ok: boolean = this.testValidNbOccurences();
      if (!ok) {
          throw new Error(`Nombre d'occurences min=${this.minNbOccurences} ou max=${this.maxNbOccurences}, invalide.`);
      }
    }
    private testValidNbOccurences(): boolean {
        const retour: boolean = (
                                        (this.minNbOccurences >=0)
                                    &&
                                        (this.maxNbOccurences <= APattern.PATTERN_MAX_NB_OCCURENCES)
                                    &&
                                        (this.maxNbOccurences >= this.minNbOccurences)
                                );
        return(retour);
    }

}