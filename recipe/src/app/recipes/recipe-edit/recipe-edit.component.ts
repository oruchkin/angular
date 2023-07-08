import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { RecipeService } from "../recipe.service";
import { Ingredient } from "../../../shared/ingredient.model";
import { Recipe } from "../recipe.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);


    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount,
                [Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)]),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup<any>({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  onSubmit() {
    const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['desc'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']);

    // if (this.editMode) {
    //   this.recipeService.updateRecipe(this.id, newRecipe)
    // } else {
    //   this.recipeService.addRecipe(newRecipe)
    // }

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel()
  }

  get controlsTwo() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  get controls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  // onAddIngredient(): void {
  //   (this.recipeForm.get('ingredients') as FormArray).push(
  //     new FormGroup({
  //       'name': new FormControl(),
  //       'amount': new FormControl(),
  //     })
  //   );
  // }

  onAddIngredient(): void {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup<{ name: FormControl<string>, amount: FormControl<number> }>({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null,
          [Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }


  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }

}
