import { IRegExpStringPattern, IStringToParse, IStringToParseMatching } from "./../interfaces";
import { StringToParseMatchingArrayOrNull } from "./../types";
import { ASimplePattern } from "./../abstracts";


export class RegExpStringPattern extends ASimplePattern implements IRegExpStringPattern {

    getStringToParseMatchings(stringToParse: IStringToParse): StringToParseMatchingArrayOrNull {
        let result: StringToParseMatchingArrayOrNull = null;

        const string: string = this.getString();
        const stringToParseAsString: string = stringToParse.getRemainingStringToParse();
        if ((string !== "") && (stringToParseAsString.length > 0)) {

            const regExp: RegExp = this.getRegExp();
            const match: Array<string> = stringToParseAsString.match(regExp);

            if (match !== null) {
                const stringToParseMatching: IStringToParseMatching = this.createStringToParseMatchingObject(
                    this,
                    match[0],
                    stringToParse.getPointerPosition()
                );
                result = Array(stringToParseMatching);
            }            

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
