import { IStringComparator } from './../interfaces';


export class StringComparator implements IStringComparator {

    private static defaultCaseSensitivity: boolean = true;

    private caseSensitivity: boolean;

    static setDefaultCaseSensitivity(caseSensitivity: boolean): void {
        this.defaultCaseSensitivity = caseSensitivity;
    }


    constructor(caseSensitivity: boolean = StringComparator.defaultCaseSensitivity) {
        this.setCaseSensitivity(caseSensitivity);
    }
    
    setCaseSensitivity(caseSensitivity: boolean): IStringComparator {
        this.caseSensitivity = caseSensitivity;
        return(this);
    }

    isCaseSentivity(): boolean {
        return(this.caseSensitivity);
    }

    testEquality(string1: string, string2: string): boolean {
        let result: boolean;

        if (!this.caseSensitivity) {
            string1 = string1.toUpperCase();
            string2 = string2.toUpperCase();
        }

        result = (string1 === string2);

        return (result);
    }

}