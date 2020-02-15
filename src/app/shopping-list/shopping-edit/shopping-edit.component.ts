import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('slForm') slForm: NgForm;
  editMode = false;
  editedItemIndex: number;
  subscription: Subscription;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing
      .subscribe(
        (index: number) => {
          this.editMode = true;
          this.editedItemIndex = index;
          this.editedItem = this.shoppingListService.getIngredient(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        }
      );
  }

  onAddOrEditItem(form: NgForm) {
    const formValue = form.value;
    const newValue = new Ingredient(formValue.name, formValue.amount);
    if (this.editMode) {
      this.shoppingListService.editIngredient(this.editedItemIndex, newValue);
    } else {
      this.shoppingListService.addIngredient(newValue);
    }
    this.onClear();
  }

  onDeleteItem() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
