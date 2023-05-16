import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { RecipeService } from "../app/recipes/recipe.service";
import { Recipe } from "../app/recipes/recipe.model";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../app/auth/auth.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  url: string;

  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {
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
    return this.http
      .get<Recipe[]>(this.url)
      .pipe(
        map(recipes => {
            return recipes.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
              }
            );
          }
        ),
        tap(recipes => {
            this.recipeService.setRecipes(recipes);
          }
        )
      );
  }

  // fetchRecipes3() {
  //   return this.http
  //     .get<Recipe[]>(this.url)
  //     .pipe(
  //       map(recipes => {
  //         return recipes.map(recipe => {
  //           return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
  //         });
  //       }),
  //       tap(recipes => {
  //         this.recipeService.setRecipes(recipes);
  //       })
  //     );
  // }


  //
  // fetchRecipes2() {
  //   return this.authService.user.pipe(
  //     take(1),
  //     exhaustMap(user => {
  //         return this.http
  //           .get<Recipe[]>(this.url, {
  //               params: new HttpParams().set(
  //                 'auth', user.token
  //               )
  //             }
  //           );
  //       }
  //     ),
  //     map(recipes => {
  //         return recipes.map(recipe => {
  //             return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
  //           }
  //         );
  //       }
  //     ),
  //     tap(recipes => {
  //         this.recipeService.setRecipes(recipes);
  //       }
  //     )
  //   );
  // }


}
