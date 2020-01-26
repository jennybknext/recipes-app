import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayRecipes = true;
  onRecipesSelected() {
    this.displayRecipes = true;
  }

  onShoppingListSelected() {
    this.displayRecipes = false;
  }
}
