import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Test recipe 1', 'test blabla', 'https://mommyshomecooking.com/wp-content/uploads/2018/03/Easy-Whole-30-Chicken-and-Asparagus-Skillet-1-768x1075.jpg'),
    new Recipe('Test recipe 2', 'test blu blu', 'https://www.fifteenspatulas.com/wp-content/uploads/2015/12/Oreo-Truffles-Easy-Dessert-Recipes-Fifteen-Spatulas-2-640x960.jpg'),
    new Recipe('Test recipe 3', 'test aaaaaa', 'https://static.parade.com/wp-content/uploads/2019/10/Mini-Cherry-Cheesecakes-Recipe.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

}
