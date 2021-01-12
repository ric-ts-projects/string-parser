//import {TS_Class1} from "./A/TS_Class1.js"; //Heureusement, le compilo. ne tiendra pas 
                                            //compte de l'extension écrite (".js"), 
                                            //et lira juste "./A/TS_Class1"
                                            //donc en l'occurence "./A/TS_Class1.ts"
                                            //Mais bon, c'est pas très beau non plus :/
                                            //Intérêt: dans le code compilé (dist/...)
                                            //         on aura bien l'extension ".js" conservée !!

// import { GenericList } from "./_modules/general/modeles/concreteClasses/GenericList.js";

import { OrderedFullMatchPatternsList } from "./modeles/concreteClasses/OrderedFullMatchPatternsList.js";
export class Main {
    public run(): void {
        // const list1: GenericList<string> = new GenericList<string>();
        // list1.setAllowNullElement(true);
        // list1.addElements(Array("A",'B',"C",null));

        // const list2: GenericList<string> = new GenericList<string>();
        // list2.setAllowNullElement(true);
        // list2.addElementsFromList(list1);
        // list2.addElements(Array("D",'E',"F", null));        

        // console.log(list2);

        const pl: OrderedFullMatchPatternsList = new OrderedFullMatchPatternsList();
        console.log(pl);
    }        

}