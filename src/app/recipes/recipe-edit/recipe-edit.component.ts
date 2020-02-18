import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Recipe} from '../recipe.model';
import {RecipesService} from '../recipes.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  index: number;
  editMode = false;
  editedRecipe: Recipe;
  recipeForm: FormGroup;

  private static buildIngredients(data) {
    const ingredientsCtrl = new FormArray([], Validators.required);
    for (const ing of data) {
      ingredientsCtrl.push(new FormGroup({
        'name': new FormControl(ing.name, Validators.required),
        'amount': new FormControl(ing.amount, Validators.required)
      }));
    }
    return ingredientsCtrl;
  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private recipesService: RecipesService) {
  }

  get controls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.editMode = params['id'] != null;
          this.index = +params['id'];
          this.initForm();
        }
      );
  }

  onSaveRecipe() {
    const recipe = new Recipe(this.recipeForm.value.recipeName,
      this.recipeForm.value.description,
      this.recipeForm.value.imageUrl,
      this.recipeForm.value.ingredients
    );
    if (this.editMode) {
      this.recipesService.updateRecipe(this.index, recipe);
    } else {
      this.recipesService.addRecipe(recipe);
    }
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index) ;
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        'name': new FormControl(null,  Validators.required),
        'amount': new FormControl(null,  Validators.required)
      })
    );
  }

  private initForm() {
    let recipeName = '';
    let imageUrl = '';
    let description = '';
    let ingredients = new FormArray([], Validators.required);
    if (this.editMode) {
      const editedRecipeData = this.getEditedRecipeData(recipeName, imageUrl, description);
      recipeName = editedRecipeData.recipeName;
      imageUrl = editedRecipeData.imageUrl;
      description = editedRecipeData.description;
      if (this.editedRecipe.ingredients) {
        ingredients = RecipeEditComponent.buildIngredients(this.editedRecipe.ingredients);
      }
    }
    this.recipeForm = new FormGroup({
        'recipeName': new FormControl(recipeName, Validators.required),
        'imageUrl': new FormControl(imageUrl, Validators.required),
        'description': new FormControl(description, Validators.required),
        'ingredients': ingredients
      }
    );
  }

  private getEditedRecipeData(recipeName: string, imageUrl: string, description: string) {
    this.editedRecipe = this.recipesService.getRecipe(this.index);
    recipeName = this.editedRecipe.name;
    imageUrl = this.editedRecipe.imagePath;
    description = this.editedRecipe.description;

    return {recipeName, imageUrl, description};
  }

}
