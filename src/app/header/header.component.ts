import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() recipesSelected = new EventEmitter<boolean>();
  @Output() shoppingListSelected = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  onRecipesSelected() {
    this.recipesSelected.emit(true);
  }

  onShoppingListSelected() {
  this.shoppingListSelected.emit(true);
  }

}
