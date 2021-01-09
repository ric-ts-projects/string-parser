export interface IStringToParse {
    
    setString(string: string): IStringToParse;
    getStringFromPointerPosition(lengthToRead: number): string;
    // getRemainingStringToParse(): string;
    
    isPointerAtTheEnd(): boolean;
    
    savePointerPosition(): IStringToParse;
    restoreSavedPointerPosition(): IStringToParse;

    setPointerPosition(pointerPosition: number): IStringToParse;
    incrementPointerPosition(increment: number): IStringToParse;
}