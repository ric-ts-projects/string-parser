import { IComparator } from './../interfaces';
import { FilterType } from './../types';



export interface IGenericList<ElementType> {

    setAllowNullElement(allowNullElement: boolean): void;

    defineElements(elements: Array<ElementType>): boolean;

    getElements(): Array<ElementType>;

    getElementsMatchingFilter(filter: FilterType<ElementType>): Array<ElementType>;

    getFirstElementMatchingFilter(filter: FilterType<ElementType>): ElementType;

    getIndexOfFirstElementMatchingFilter(filter: FilterType<ElementType>): number;
    
    modifyFirstElementMatchingFilter(sourceElement: ElementType, filter: FilterType<ElementType>): boolean;

    testIfExistsElementMatchingFilter(filter: FilterType<ElementType>): boolean;
    
    removeElementsMatchingFilter(filter: FilterType<ElementType>): boolean;
    
    removeElementMatchingFilter(filter: FilterType<ElementType>): boolean;

   
    getFirstElementEqualTo(targetElement: ElementType, comparator?: IComparator<ElementType>): ElementType;
    
    getIndexOfFirstElementEqualTo(targetElement: ElementType, comparator?: IComparator<ElementType>): number;

    modifyFirstElementEqualTo(
        sourceElement: ElementType, 
        targetElement: ElementType, 
        comparator?: IComparator<ElementType>
    ): boolean;

    testIfExistsElementEqualTo(targetElement: ElementType, comparator?: IComparator<ElementType>): boolean;
    
    addNewElement(element: ElementType, comparator?: IComparator<ElementType>): void;

    addElements(elements: Array<ElementType>): void;

    addElementsFromList(elementsList: IGenericList<ElementType>): void;

    addElement(element: ElementType): void;

    clear(): void;

    removeElementsEqualTo(targetElements: Array<ElementType>, comparator?: IComparator<ElementType>): boolean;

    removeElementEqualTo(targetElement: ElementType, comparator?: IComparator<ElementType>): boolean;

    getElementsNumber(): number;

    each<CallBackReturnType>( 
        fCallBack: ((element: ElementType, index?: number) => CallBackReturnType),
        fBreakLoop?: ((callBackReturnedValue: CallBackReturnType) => boolean)
    ): void;
   
}
