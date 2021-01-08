import { ILanguageStringPatternsProvider } from "./../interfaces/ILanguageStringPatternsProvider";
import { ALanguageStringPatternsProvider } from "./../Abstracts/ALanguageStringPatternsProvider";

export class TypescriptStringPatternsProvider extends ALanguageStringPatternsProvider
 implements ILanguageStringPatternsProvider {

    getExportKeyword(): string {
        const retour: string = "export";
        return(retour);
    }

    private getAbstractKeyword(): string {
        const retour: string = "abstract";
        return(retour);
    }
    getAbstractClassKeyword(): string {
        const retour: string = this.getAbstractKeyword();
        return(retour);
    }
    getAbstractMemberKeyword(): string {
        const retour: string = this.getAbstractKeyword();
        return(retour);
    }
    getAbstractMethodKeyword(): string {
        const retour: string = this.getAbstractKeyword();
        return(retour);
    }

    getClassKeyword(): string {
        const retour: string = "class";
        return(retour);
    }

}