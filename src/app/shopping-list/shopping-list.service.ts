import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 3),
    new Ingredient('Tomatoes', 10)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.refreshIngredients();
  }
  editIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.refreshIngredients();
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push( ...ingredients);
    this.refreshIngredients();
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.refreshIngredients();
  }

  private refreshIngredients() {
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
