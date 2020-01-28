import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {ShoppingEditComponent} from './shopping-list/shopping-edit/shopping-edit.component';
import {RecipesComponent} from './recipes/recipes.component';
import {RecipesListComponent} from './recipes/recipes-list/recipes-list.component';
import {RecipesItemComponent} from './recipes/recipes-item/recipes-item.component';
import {RecipeDetailComponent} from './recipes/recipe-detail/recipe-detail.component';
import {DropdownDirective} from './shared/dropdown.directive';
import {ShoppingListService} from './shopping-list/shopping-list.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    RecipesComponent,
    RecipesListComponent,
    RecipesItemComponent,
    RecipeDetailComponent,
    DropdownDirective],
  imports: [BrowserModule, FormsModule],
  providers: [ShoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
