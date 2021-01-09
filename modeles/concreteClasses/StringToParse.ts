import { IStringToParse } from "./../interfaces";


export class StringToParse implements IStringToParse {
    private string: string;

    private pointerPosition: number;
    private lastSavedPointerPosition: number = null;
    private minPointerPosition: number = 0;
    private maxPointerPosition: number;


    constructor(string: string = "") {
        this.setString(string);
    }

    setString(string: string): IStringToParse {
        this.string = string;
        this.setMaxPointerPosition();
        this.resetPointerPosition();
        return (this);
    }

    // getRemainingStringToParse(): string {
    //     const retour: string = this.string.substr(this.pointerPosition);
    //     return(retour);
    // }

    getStringFromPointerPosition(lengthToRead: number): string {
        const retour: string = this.string.substr(this.pointerPosition, lengthToRead);
        return(retour);
    }    

    savePointerPosition(): IStringToParse {
        this.lastSavedPointerPosition = this.pointerPosition;
        return(this);
    }
    
    restoreSavedPointerPosition(): IStringToParse {
        if (this.lastSavedPointerPosition !== null) {
            this.pointerPosition = this.lastSavedPointerPosition;
        }
        return(this);
    }    

    private setMaxPointerPosition(): IStringToParse {
        this.maxPointerPosition = this.string.length - 1;
        return (this);
    }

    private resetPointerPosition(): IStringToParse {
        this.setPointerPosition(0);
        return (this);
    }

    setPointerPosition(pointerPosition: number): IStringToParse {
        this.pointerPosition = pointerPosition;
        this.checkValidPointerPosition();
        return (this);
    }

    incrementPointerPosition(increment: number): StringToParse {
        this.setPointerPosition(this.pointerPosition + increment);
        return (this);
    }

    isPointerAtTheEnd(): boolean {
        const retour: boolean = (this.pointerPosition === this.maxPointerPosition);
        return (retour);
    }

    private checkValidPointerPosition(): void {
        if (this.pointerPosition > this.maxPointerPosition) {
            throw new Error(this.getPointerPositionOverflowMessage());

        } else if (this.pointerPosition < this.minPointerPosition) {
            throw new Error(this.getPointerPositionOverflowMessage());
        }
    }

    private getPointerPositionOverflowMessage(): string {
        const retour: string = `Impossible de pointer en position ${this.pointerPosition} ; Intervalle autorisé : ` +
            `[ ${this.minPointerPosition}, ${this.maxPointerPosition} ].`;
        return (retour);
    }

}