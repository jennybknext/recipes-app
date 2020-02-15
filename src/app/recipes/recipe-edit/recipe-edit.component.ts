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
      this.router.navigate(['/recipes', this.index]);
    } else {
      this.recipesService.addRecipe(recipe);
      this.router.navigate(['/recipes']);
    }
  }

  onCancel() {
    this.router.navigate(['/recipes']);
  }

  private initForm() {
    let recipeName = '';
    let imageUrl = '';
    let description = '';
    const ingredients = new FormArray([]);
    if (this.editMode) {
      const editedRecipeData = this.getEditedRecipeData(recipeName, imageUrl, description, ingredients);
      recipeName = editedRecipeData.recipeName;
      imageUrl = editedRecipeData.imageUrl;
      description = editedRecipeData.description;
    }
    this.recipeForm = new FormGroup({
        'recipeName': new FormControl(recipeName, Validators.required),
        'imageUrl': new FormControl(imageUrl, Validators.required),
        'description': new FormControl(description, Validators.required),
        'ingredients': ingredients
      }
    );
  }

  private getEditedRecipeData(recipeName: string, imageUrl: string, description: string, ingredients) {
    this.editedRecipe = this.recipesService.getRecipe(this.index);
    recipeName = this.editedRecipe.name;
    imageUrl = this.editedRecipe.imagePath;
    description = this.editedRecipe.description;
    if (this.editedRecipe.ingredients) {
      for (const ing of this.editedRecipe.ingredients) {
        ingredients.push(new FormGroup({
          'name': new FormControl(ing.name),
          'amount': new FormControl(ing.amount)
        }));
      }
    }
    return {recipeName, imageUrl, description};
  }
}
