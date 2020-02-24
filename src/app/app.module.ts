import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {ShoppingEditComponent} from './shopping-list/shopping-edit/shopping-edit.component';
import {RecipesComponent} from './recipes/recipes.component';
import {RecipesListComponent} from './recipes/recipes-list/recipes-list.component';
import {RecipesItemComponent} from './recipes/recipes-item/recipes-item.component';
import {RecipeDetailComponent} from './recipes/recipe-detail/recipe-detail.component';
import {DropdownDirective} from './shared/dropdown.directive';
import {AppRoutingModule} from './app-routing.module';
import {RecipesStartComponent} from './recipes/recipes-start/recipes-start.component';
import {RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';
import {RecipesService} from './recipes/recipes.service';
import {HttpClientModule} from '@angular/common/http';

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
    DropdownDirective,
    RecipesStartComponent,
    RecipeEditComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [RecipesService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
