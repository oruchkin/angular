import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../app/recipes/recipe.service";
import {Recipe} from "../app/recipes/recipe.model";
import {map, tap} from "rxjs";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  url: string;

  constructor(private http: HttpClient,
              private recipeService: RecipeService) {
    this.url = "https://recipe-course-2bb3e-default-rtdb.firebaseio.com/recipes.json";
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.url, recipes)
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return  this.http
      .get<Recipe[]>(this.url)
      .pipe(map(recipes => {
          return recipes.map(recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes)
        })
      )
      // .subscribe((recipes) => {
      //   this.recipeService.setRecipes(recipes)
      // })
  }

}
