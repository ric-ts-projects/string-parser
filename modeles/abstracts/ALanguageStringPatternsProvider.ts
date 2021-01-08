
export abstract class ALanguageStringPatternsProvider {

   getSpace(): string {
       const retour: string = " ";
       return(retour);
   }

   getCR(): string {
       const retour: string = "\n";
       return(retour);
   }
   getLF(): string {
       const retour: string = "\r";
       return(retour);
   }

    getLineCommentStart(): string {
        const retour: string = "//";
        return(retour);
    }
    getBlockCommentStart(): string {
        const retour: string = "/*";
        return(retour);
    }
    getBlockCommentEnd(): string {
        const retour: string = "*/";
        return(retour);
    }

    getStringDelimiter(): string {
        const retour: string = "\"";
        return(retour);
    }
    getStringDelimiterAlias(): string {
        const retour: string = "'";
        return(retour);
    }

}