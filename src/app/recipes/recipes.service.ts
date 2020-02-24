import {Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  recipeChanged = new Subject<Recipe[]>();
  private recipes = [];

  constructor() {}

  getRecipes() {
    return this.recipes.slice();
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.refreshRecipes();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.refreshRecipes();
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.refreshRecipes();
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index,  1);
    this.refreshRecipes();
  }

  private refreshRecipes() {
    this.recipeChanged.next(this.recipes.slice());
  }
}
