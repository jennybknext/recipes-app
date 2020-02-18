import {Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  recipeChanged = new Subject<Recipe[]>();
  private recipes = [
    new Recipe('Test recipe 1',
      'test blabla',
      'https://mommyshomecooking.com/wp-content/uploads/2018/03/Easy-Whole-30-Chicken-and-Asparagus-Skillet-1-768x1075.jpg',
      [
        new Ingredient('Sugar', 1),
        new Ingredient('Eggs', 2)
      ]),
    new Recipe('Test recipe 2',
      'test blu blu',
      'https://www.fifteenspatulas.com/wp-content/uploads/2015/12/Oreo-Truffles-Easy-Dessert-Recipes-Fifteen-Spatulas-2-640x960.jpg',
      [
        new Ingredient('Flour', 2),
        new Ingredient('Eggs', 1)
      ]),
    new Recipe('Test recipe 3',
      'test aaaaaa',
      'https://static.parade.com/wp-content/uploads/2019/10/Mini-Cherry-Cheesecakes-Recipe.jpg',
      [
        new Ingredient('Cacao', 1),
        new Ingredient('Vanilla', 1)
      ])
  ];

  constructor() {}

  getRecipes() {
    return this.recipes.slice();
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
