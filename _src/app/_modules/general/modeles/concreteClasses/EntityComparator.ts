import { IEntity, IComparator } from './../interfaces';

export class EntityComparator implements IComparator<IEntity> {
    
    testEquality(entite1: IEntity, entite2: IEntity): boolean {
        const retour: boolean = (entite1.id === entite2.id);
        return(retour);
    }

}