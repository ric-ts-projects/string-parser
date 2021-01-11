import { IStringComparator } from './_modules/general/modeles/interfaces';
import { StringComparator } from './_modules/general/modeles/StringComparator';
import { GenericList } from './_modules';


export interface IPattern {
    getMatchingStringFromStringToParse(stringToParse: string): string;

    setMinOccurencesNumber(minOccurencesNumber: number): IPattern;
    getMinOccurencesNumber(): number;
    setMaxOccurencesNumber(maxOccurencesNumber: number): IPattern;
    getMaxOccurencesNumber(): number;
    isDefinedMaxOccurencesNumber(): boolean;
    setOccurencesNumbers(minOccurencesNumber: number, maxOccurencesNumber?: number): IPattern;    

}

export interface ISimplePattern extends IPattern {
    setString(string: string): ISimplePattern;
    getString(): string;

    setCaseSensitivity(caseSensitivity: boolean): ISimplePattern;
    isCaseSensitivity(): boolean;
}

export abstract class APattern implements IPattern {

    private static readonly PATTERN_MAX_OCCURENCES_NUMBER: number = 50;
    private static readonly PATTERN_MAX_OCCURENCES_NUMBER_NOT_DEFINED: number = null;

    private minOccurencesNumber: number = 1;
    private maxOccurencesNumber: number = APattern.PATTERN_MAX_OCCURENCES_NUMBER_NOT_DEFINED;

    constructor() {
    }

    abstract getMatchingStringFromStringToParse(stringToParse: string): string;
       

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

}


export abstract class ASimplePattern extends APattern implements ISimplePattern {
    private static defaultCaseSensitivity: boolean = true;
    
    private string: string;
    private caseSensitivity: boolean;

    
    static setDefaultCaseSensitivity(caseSensitivity: boolean): void {
        this.defaultCaseSensitivity = caseSensitivity;
    }
    
    constructor(string: string = "", caseSensitivity: boolean = ASimplePattern.defaultCaseSensitivity) {
        super();

        this.setString(string);
        this.setCaseSensitivity(caseSensitivity);
    }
    
    setString(string: string): ISimplePattern {
        if (string !== null) {
            this.string = string;
        }
        return(this);
    }
    getString(): string {
        return(this.string);
    }

    setCaseSensitivity(caseSensitivity: boolean): ISimplePattern {
        this.caseSensitivity = caseSensitivity;
        return(this);
    }
    isCaseSensitivity(): boolean {
        return(this.caseSensitivity);
    }    
}


export interface IStringPattern extends ISimplePattern {
    setMatchComparator(matchComparator: IStringComparator): IStringPattern;
}

export interface IRegExpStringPattern extends ISimplePattern {
}

export interface IStringPattern extends IPattern {
    setMatchComparator(matchComparator: IStringComparator): IStringPattern;
}
export class StringPattern extends ASimplePattern implements IStringPattern {

    private matchComparator: IStringComparator = null;

    setMatchComparator(matchComparator: IStringComparator): IStringPattern {
        this.matchComparator = matchComparator;
        return(this);
    }
    private getMatchComparator(): IStringComparator {
        if (this.matchComparator === null) {
            this.matchComparator = this.createStringComparator();
        }
        return(this.matchComparator);
    }
    private createStringComparator(): IStringComparator {
        const result: IStringComparator = new StringComparator();
        return(result);
    }

    getMatchingStringFromStringToParse(stringToParse: string): string {
        let result: string = "";

        const string: string = this.getString();
        if ((string !== "") && (stringToParse.length >= string.length)) {

            const stringToParseStart: string = stringToParse.substr(0, string.length);
            const match: boolean = this.getMatchComparator()
                                    .setCaseSensitivity(this.isCaseSensitivity())
                                    .testEquality(string, stringToParseStart);

            result = (match) ? stringToParseStart : "";

        }

        return (result);
    }
}


export class RegExpStringPattern extends ASimplePattern implements IRegExpStringPattern {

    getMatchingStringFromStringToParse(stringToParse: string): string {
        let result: string = "";

        const string: string = this.getString();
        if ((string !== "") && (stringToParse.length > 0)) {

            const regExp: RegExp = this.getRegExp();
            const match: Array<string> = stringToParse.match(regExp);

            result = (match !== null) ? match[0] : "";

        }

        return (result);
    }

    private getRegExp(): RegExp {
        const regExpOption: string = (this.isCaseSensitivity()) ? "i" : "";
        const regExpString: string = this.getString();
        const result: RegExp = new RegExp(`^${regExpString}`, regExpOption);
        return (result);
    }    

}

export interface IPatternsList {
    definePatterns(patterns: Array<IPattern>): IPatternsList;
    definePattern(pattern: IPattern): IPatternsList;
    addPatterns(patterns: Array<IPattern>): IPatternsList;
    addPattern(pattern: IPattern): IPatternsList;    
}

export abstract class APatternsList extends APattern implements IPattern, IPatternsList {

    protected list: GenericList<IPattern>;

    constructor() {
        super();

        this.list = new GenericList<IPattern>();
        this.list.setAllowNullElement(false);
    }
    
    definePatterns(patterns: Array<IPattern>): IPatternsList {
        if (patterns !== null) {
            this.list.clear();
            this.addPatterns(patterns);
        }
        return(this);
    }

    definePattern(pattern: IPattern): IPatternsList {
        if (pattern !== null) {
            this.definePatterns(Array(pattern));
        }
        return(this);         
    }

    addPatterns(patterns: Array<IPattern>): IPatternsList {
        if (patterns !== null) {
            this.list.addElements(patterns);
        }
        return(this);        
    }

    addPattern(pattern: IPattern): IPatternsList {
        if (pattern !== null) {
            this.list.addElement(pattern);
        }
        return(this); 
    }    

}

export abstract class OrderedPatternsList extends APatternsList {
    
    protected abstract mustStopSearchingMatching(matchingStringFromStringToParse: string): boolean;

    getMatchingStringFromStringToParse(stringToParse: string): string {
        const result:string = "";

        this.list.each<string>(
            (pattern: IPattern, index: number): string => {
                const matchingStringFromStringToParse: string = pattern.getMatchingStringFromStringToParse(stringToParse);
                return(matchingStringFromStringToParse);
            },

            (matchingStringFromStringToParse: string): void => {
                if (matchingStringFromStringToParse !== "") {
                    this.treatMatchingStringFromStringToParse(matchingStringFromStringToParse, result);
                }
            },

            (matchingStringFromStringToParse: string): boolean => {
                let breakLoop: boolean;
                breakLoop = this.mustStopSearchingMatching(matchingStringFromStringToParse);
                return(breakLoop);
            }
        );

        return(result);
    }

    private treatMatchingStringFromStringToParse(
        matchingStringFromStringToParse: string,
        resultToUpdate: string
    ): void {

    }

}

export class OrderedFullMatchPatternsList extends OrderedPatternsList {
    mustStopSearchingMatching(matchingStringFromStringToParse: string): boolean {
        const result: boolean = (matchingStringFromStringToParse === "");
        return(result);
    }
}

export class OrderedOneMatchPatternsList extends OrderedPatternsList {
    mustStopSearchingMatching(matchingStringFromStringToParse: string): boolean {
        const result: boolean = (matchingStringFromStringToParse !== "");
        return(result);
    }
}


//***********************************************************
// export interface IElement {

//     canHaveChild(): boolean;
//     extractStartMarker(stringToParse: IStringToParse): string | null;
//     extractEndMarker(stringToParse: IStringToParse): string | null;


//     getPossibleSiblingElements(): Array<IElement>;
// }

// export interface ISimpleElement extends IElement {

// }

// export interface IBlockElement extends IElement {

// }


// export abstract class AElement {
//     protected abstract beginsWithStartMarker(stringToParse: IStringToParse): boolean;
//     protected abstract beginsWithEndMarker(stringToParse: IStringToParse): boolean;

//     extractStartMarker(stringToParse: IStringToParse): boolean {
//         const retour: boolean = this.beginsWithStartMarker(stringToParse);
//         if (stringToParse.) {

//         }
//     }
//     extractEndMarker(stringToParse: IStringToParse): boolean;

// }

// /*
// export class SimpleElement extends AElement implements IElement {
//     canHaveChild(): boolean {
//         return(false);
//     }
// }

// export class CompositeElement extends AElement implements IElement {
//     canHaveChild(): boolean {
//         return(true);
//     }
// }
// */

// export interface ITreeItem {

// }

// export interface ITreeSimpleItem extends ITreeItem {

// }

// export interface ITreeBlockItem extends ITreeItem {

// }

// export abstract class ATreeItem {

// }

// export abstract class ATreeSimpleItem extends ATreeItem {

// }

// export abstract class ATreeBlockItem extends ATreeItem {

// }

// export class TreeSimpleItem extends ATreeSimpleItem implements ITreeItem {
// }
// export class TreeBlockItem extends ATreeBlockItem implements ITreeItem {
// }

// export class TreeRootBlockItem extends TreeBlockItem implements ITreeItem {

// }

// export interface ITreeItemFactory {
//     // createBlock()
// }


// export interface ITreeBuilder {

//     addElement(element: IElement): ITreeBuilder;

// }

// export abstract class ATreeBuilder /*implements ITreeBuilder*/ {

//     private currentBlockItem: ITreeBlockItem;

//     constructor() {
//         this.currentBlockItem = new TreeRootBlockItem();
//     }


//     addElement(element: IElement): ITreeBuilder {
//         if (element.canHaveChild()) {
//             this.addBlockElement(element);

//         } else {
//             this.addSimpleElement(element);
//         }
//         return (this);
//     }

//     p
// }




// export interface IStringParser {
//     setString(stringToParse: string): IStringParser;
// }




// export abstract class AStringParser /*implements IStringParser*/ {

//     private treeBuilder: ITreeBuilder;
//     private string: IStringToParse;

//     constructor(treeBuilder: ITreeBuilder, stringToParse: string = "") {
//         this.setTreeBuilder(treeBuilder);
//         this.setString(stringToParse);
//     }

//     setString(stringToParse: string): IStringParser {
//         this.string = this.createStringToParseObject(stringToParse);
//         return (this);
//     }

//     private setTreeBuilder(treeBuilder: ITreeBuilder): IStringParser {
//         this.treeBuilder = treeBuilder;
//         return (this);
//     }

//     private createStringToParseObject(stringToParse: string): IStringToParse {
//         const retour: IStringToParse = new StringToParse(stringToParse);
//         return (retour);
//     }

//     xxx(): void {
//         let element: IElement;
//         let foundElementMatching: boolean = false;

//         while (!this.string.isPointerAtTheEnd()) {

//             foundElementMatching = false;
//             while ((element = this.getNextPossibleElement()) !== null) {

//                 if (element.isBloc
//                 si element match as start marker
//                     if this.curret

//                 foundElementMatching = this.testElementMatching(element);
//                 if (foundElementMatching) {
//                     this.currentBlock.addElement(element);
//                     break;
//                 }
//             }

//             if (!foundElementMatching) {
//                 this.string.incrementPointerPosition(1);
//             }

//         }

//     }


//     private testElementMatching(element: IElement): boolean {

//         let retour: boolean;

//         let foundMarker: string;

//         if ((foundMarker = element.extractStartMarker(this.string)) !== null) {
            

//         } else if ((foundMarker = element.extractEndMarker(this.string)) !== null) {
//             this.treeBuilder.addElement(element);

//         }

//         retour = (foundMarker !== null);
//         if (retour) {
//             this.string.incrementPointerPosition(foundMarker.length);

//         }

//         return (retour);
//     }

//     private getNextPossibleElement(): IElement {

//     }

// }

