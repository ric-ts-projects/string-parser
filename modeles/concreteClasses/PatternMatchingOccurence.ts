import { IPatternMatchingOccurence, IPattern } from './../interfaces';
import { Pattern } from '../../patterns';

export class PatternMatchingOccurence implements IPatternMatchingOccurence {

    constructor(
        private pattern: IPattern, 
        private stringToParseMatching: string,
        private stringToParsePointerPosition: number
    ) {

    }

    getPattern(): IPattern {
        return(this.pattern);
    }
    getStringToParseMatching(): string {
        return(this.stringToParseMatching);
    }
    getStringToParseMatchingLength(): number {
        return(this.getStringToParseMatching().length);
    }    
    getStringToParsePointerPosition(): number {
        return(this.stringToParsePointerPosition);
    }

}    