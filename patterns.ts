// tslint:disable:comment-format
// tslint:disable:no-trailing-whitespace
// tslint:disable:quotemark
// tslint:disable:curly


import { IPattern } from "./modeles/interfaces/IPattern";
import { APattern } from "./modeles/Abstracts/APattern";

import { TypescriptStringPatternsProvider } from "./modeles/concreteClasses/TypescriptStringPatternsProvider";
import { ILanguageStringPatternsProvider } from "./modeles/interfaces/ILanguageStringPatternsProvider";

//-------

export class Pattern extends APattern implements IPattern {

}

//-------
export interface IClassPattern extends IPattern {

}

//-------
export interface IToken extends IPattern {
}
export abstract class AToken extends APattern {

} 

//-------
export interface IKeyword extends IToken {

}
export class Keyword extends AToken {
    constructor(protected keyword: string) {
        super(keyword);
        this.setMaxNbOccurences(1);
    }
}

//-------
// export interface IIdentifier extends IToken {

// }
// export abstract class AIdentifier extends AToken {

// }

//-------
// export class ExportKeyword extends AKeyword implements IKeyword {
// }
// export class AbstractClassKeyword extends AKeyword implements IKeyword {
    
// }

// //-------
// export class ClassStartToken extends AToken implements IToken {
    
// }
// export class ClassEndToken extends AToken implements IToken {
    
// }

// export class ClassTemplateTypeStartToken extends AToken implements IToken {
    
// }
// export class ClassTemplateTypeEndToken extends AToken implements IToken {
    
// }

//-------
// export class Identifier extends AIdentifier implements IIdentifier {
    
// }

//-------


// export ILanguageParserFactory {

//     getPatternsFactory(): 
// }

// export ITypescriptParserFactory {

//     getPatternsFactory(): 
// }


export interface IPatternsFactory {
    createSpace(): IPattern;
    createExportKeyword(): IKeyword;
  
}

export abstract class APatternsFactory<TYPE_languageStringPatternsProvider extends ILanguageStringPatternsProvider> {
    constructor(private languageStringPatternsProvider: TYPE_languageStringPatternsProvider) {

    }    

    createSpace(): IPattern {
        const retour: IPattern = new Pattern( this.languageStringPatternsProvider.getSpace() );
        return(retour);
    }    

    createExportKeyword(): IKeyword {
        const retour: IKeyword = new Keyword( this.languageStringPatternsProvider.getExportKeyword() );
        return(retour);
    }
   
}

export class TypescriptPatternsFactory 
    extends APatternsFactory<TypescriptStringPatternsProvider> 
    implements IPatternsFactory {
}   



export interface IPatternsBuilder {
    getClassPattern(): IPattern;

}

export abstract class APatternsBuilder {
    constructor(private patternsFactory: IPatternsFactory) {

    }

    protected getSpacePattern(): IPattern {
        const retour: IPattern = this.patternsFactory.createSpace();
        this.setupSpacePattern(retour);
        return(retour);        
    }
    private setupSpacePattern(spacePattern: IPattern): void {
        spacePattern.setNbOccurences(1);
    }
     
    protected getExportKeyword(): IKeyword {
        const retour: IKeyword = this.patternsFactory.createExportKeyword();
        this.wrapKeyword(retour);
        this.setupKeyword(retour);
        return(retour);
    }
    private wrapKeyword(keyword: IKeyword): void {
        keyword.precededBy( this.getSpacePattern() );
        keyword.followedBy( this.getSpacePattern() );
    }
    private setupKeyword(keyword: IKeyword): void {
        keyword.setMinNbOccurences(0);
    }

}    


export class TypescriptPatternsBuilder extends APatternsBuilder implements IPatternsBuilder {

    getClassPattern(): IPattern {
        const retour: IPattern = 
            this.getExportKeyword()
            .then();
    
        return(retour);
    }

    getSpace

}



//-------
// CODE CLIENT:



