//@TODO: RichardP, utiliser le IComparateur<T> (encore non exporté),  de TransV, quand Transv sera de nouveau modifiable.
export interface IComparator<T> {
    testEquality(item1: T, item2: T): boolean;
}
