import { Component } from '@angular/core';
import { Recipe } from "../recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe('A Test recipe',
      'This is simply a test',
      'https://www.cookipedia.co.uk/wiki/images/4/47/Marmitako_%282%29_recipe.jpg'),
    new Recipe('A Test recipe',
      'This is simply a test',
      'https://www.cookipedia.co.uk/wiki/images/4/47/Marmitako_%282%29_recipe.jpg')
  ];

}
