import {Component, OnDestroy, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import {RecipesService} from '../recipes.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  private recipesListSubsc: Subscription;

  constructor(private recipesService: RecipesService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipes = this.recipesService.getRecipes();
    this.recipesListSubsc = this.recipesService.recipeChanged
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
    });
  }

  ngOnDestroy() {
    this.recipesListSubsc.unsubscribe();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
