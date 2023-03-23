import {Component, EventEmitter, Output} from '@angular/core';
import { Recipe } from "../recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('A Test recipe 1',
      'This is simply a test 1',
      'https://www.cookipedia.co.uk/wiki/images/4/47/Marmitako_%282%29_recipe.jpg'),
    new Recipe('A Test recipe 2',
      'This is simply a test 2',
      'https://www.cookipedia.co.uk/wiki/images/4/47/Marmitako_%282%29_recipe.jpg')
  ];

  onRecipeSelected(recipe: Recipe){
    this.recipeWasSelected.emit(recipe);
  }

}
