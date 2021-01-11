// import { IStringComparator } from './_modules/general/modeles/interfaces';
// import { StringComparator } from './_modules/general/modeles/StringComparator';
// import { GenericList } from './_modules';
// import { IStringToParse } from './modeles/interfaces';

















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

