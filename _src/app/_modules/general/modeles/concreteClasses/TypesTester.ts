export class TypesTester {

    static isString(x: any): boolean {
        const retour: boolean = (x instanceof String) || (typeof(x) === "string");
        return(retour);
    }

    static isNotEmptyString(x: any, spacesAsEmpty: boolean = false): boolean {
        let retour: boolean = this.isString(x);

        if (retour) {
            if (spacesAsEmpty) {
                x = x.trim();
            }
            retour = (x !== "");
        }

        return(retour);
    }

    static isArray(x: any): boolean {
        const retour: boolean = Array.isArray(x);
        return(retour);
    }

}