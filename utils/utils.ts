import { dbIngredients } from "../database";
import { ICartProduct, IProduct } from "../interfaces";

export const getStock= async (product: ICartProduct | IProduct) => {
    let neededIngredients = product.recipe.map( ingredient => ingredient );
    let stockedIngredients = await dbIngredients.getAllIngredients();
    let usedIngredients = stockedIngredients.filter( ingredient => neededIngredients.find( neededIngredient => neededIngredient.ingrediente.nombre === ingredient.nombre ) );

    let stock = neededIngredients.map( ingredient => {
        let usedIngredient = usedIngredients.find( usedIngredient => usedIngredient.nombre === ingredient.ingrediente.nombre );
        return usedIngredient ? usedIngredient.inStock / ingredient.cantidad : 0;
        }
    );
    
    return Math.trunc(Math.min(...stock));
}