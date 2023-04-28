import { Recipe } from "./recipe.model";
import { Injectable } from "@angular/core";
import { Ingredient } from "../../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Tasty Schnitzel',
      'A super tasty shnitzel, awesome',
      'https://vsemrecept.ru/wp-content/uploads/2017/07/%D1%88%D0%BD%D0%B8%D1%86%D0%B0%D0%BD%D1%8F%D0%BC%D0%B0.jpg',
      [
        new Ingredient('Meat', 3),
        new Ingredient('French Fries', 22)
      ]),
    new Recipe('Burger',
      'It is so unhealthy, but taste good',
      'https://s3.eu-central-1.amazonaws.com/www.burgerking.com.mx/wp-content/uploads/sites/3/2021/02/24095839/1200x800_13_XTreme-1-1.png',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Big meat', 5)
      ])
  ];

  constructor(private slService: ShoppingListService) {
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice())
  }

}
