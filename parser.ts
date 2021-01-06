export interface IElement {

    canHaveChild(): boolean;
    extractStartMarker(stringToParse: IStringToParse): string | null;
    extractEndMarker(stringToParse: IStringToParse): string | null;


    getPossibleSiblingElements(): Array<IElement>;
}

export interface ISimpleElement extends IElement {

}

export interface IBlockElement extends IElement {

}


export abstract class AElement {
    protected abstract beginsWithStartMarker(stringToParse: IStringToParse): boolean;
    protected abstract beginsWithEndMarker(stringToParse: IStringToParse): boolean;

    extractStartMarker(stringToParse: IStringToParse): boolean {
        const retour: boolean = this.beginsWithStartMarker(stringToParse);
        if (stringToParse.) {

        }
    }
    extractEndMarker(stringToParse: IStringToParse): boolean;

}

/*
export class SimpleElement extends AElement implements IElement {
    canHaveChild(): boolean {
        return(false);
    }
}

export class CompositeElement extends AElement implements IElement {
    canHaveChild(): boolean {
        return(true);
    }
}
*/

export interface ITreeItem {

}

export interface ITreeSimpleItem extends ITreeItem {

}

export interface ITreeBlockItem extends ITreeItem {

}

export abstract class ATreeItem {

}

export abstract class ATreeSimpleItem extends ATreeItem {

}

export abstract class ATreeBlockItem extends ATreeItem {

}

export class TreeSimpleItem extends ATreeSimpleItem implements ITreeItem {
}
export class TreeBlockItem extends ATreeBlockItem implements ITreeItem {
}

export class TreeRootBlockItem extends TreeBlockItem implements ITreeItem {

}

export interface ITreeItemFactory {
    // createBlock()
}


export interface ITreeBuilder {

    addElement(element: IElement): ITreeBuilder;

}

export abstract class ATreeBuilder /*implements ITreeBuilder*/ {

    private currentBlockItem: ITreeBlockItem;

    constructor() {
        this.currentBlockItem = new TreeRootBlockItem();
    }


    addElement(element: IElement): ITreeBuilder {
        if (element.canHaveChild()) {
            this.addBlockElement(element);

        } else {
            this.addSimpleElement(element);
        }
        return(this);
    }

    p
}


export interface IStringToParse {
    setString(string: string): IStringToParse;

    isPointerAtTheEnd(): boolean;

    // resetPointerPosition(pointerPosition: number): IStringToParse;
    setPointerPosition(pointerPosition: number): IStringToParse;
    incrementPointerPosition(increment: number): IStringToParse;
}

export interface IStringParser {
    setString(stringToParse: string): IStringParser;
}

export class StringToParse implements IStringToParse {
    private string: string;

    private pointerPosition: number;
    private minPointerPosition: number = 0;
    private maxPointerPosition: number;


    constructor(string: string = "") {
        this.setString(string);
    }

    setString(string: string): IStringToParse {
        this.string = string;
        this.setMaxPointerPosition();
        this.resetPointerPosition();
        return(this);
    }

    private setMaxPointerPosition(): IStringToParse {
      this.maxPointerPosition = this.string.length -1;
      return(this);
    }

    private resetPointerPosition(): IStringToParse {
        this.setPointerPosition(0);
        return(this);
    }

    setPointerPosition(pointerPosition: number): IStringToParse {
        this.pointerPosition = pointerPosition;
        this.checkValidPointerPosition();
        return(this);
    }

    incrementPointerPosition(increment: number): StringToParse {
        this.setPointerPosition(this.pointerPosition + increment);
        return(this);
    }

    isPointerAtTheEnd(): boolean {
        const retour: boolean = (this.pointerPosition === this.maxPointerPosition);
        return(retour);
    }

    private checkValidPointerPosition(): void {
        if (this.pointerPosition > this.maxPointerPosition) {
            throw new Error( this.getPointerPositionOverflowMessage() );

        } else if (this.pointerPosition < this.minPointerPosition) {
            throw new Error( this.getPointerPositionOverflowMessage() );
        }
    }

    private getPointerPositionOverflowMessage(): string {
      const retour: string = `Impossible de pointer en position ${this.pointerPosition} ; Intervalle autorisé : `+
                             `[ ${this.minPointerPosition}, ${this.maxPointerPosition} ].`;
      return(retour);
    }

}


export abstract class AStringParser /*implements IStringParser*/ {

    private treeBuilder: ITreeBuilder;
    private string: IStringToParse;

    constructor(treeBuilder: ITreeBuilder, stringToParse: string = "") {
        this.setTreeBuilder(treeBuilder);
        this.setString(stringToParse);
    }

    setString(stringToParse: string): IStringParser {
        this.string = this.createStringToParseObject(stringToParse);
        return(this);
    }

    private setTreeBuilder(treeBuilder: ITreeBuilder): IStringParser {
      this.treeBuilder = treeBuilder;
      return(this);
    }

    private createStringToParseObject(stringToParse: string): IStringToParse {
        const retour: IStringToParse = new StringToParse(stringToParse);
        return(retour);
    }

    xxx(): void {
        const element: IElement;
        let startMarker: string, endMarker: string;

        while(!this.string.isPointerAtTheEnd()) {

            if ( (startMarker = element.extractStartMarker(this.string)) !== null ) {
                this.string.incrementPointerPosition( startMarker.length );

            }

            if ( (endMarker = element.extractEndMarker(this.string)) !== null ) {
                this.string.incrementPointerPosition( endMarker.length );
            }

            this.treeBuilder.addElement(element);

        }
    }
}

