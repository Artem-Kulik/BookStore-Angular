import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiCollectionResponse, ApiResponse } from 'src/app/models/apiResponse';
import { CategoryDto } from 'src/app/models/categoryDto';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Array<CategoryDto>;

  constructor(private categoryService: CategoryService,
    private spinner: NgxSpinnerService,
    private notifier:NotifierService) { }

  ngOnInit() {
    this.spinner.show()
    this.loadCategories();
    setTimeout(() => {
      this.spinner.hide()
    }, 750);
  }

  onDelete(id: number) {
    this.categoryService.deleteCategory(id).subscribe((res: ApiResponse) => {
      if (res.isSuccessful) {
        console.log(res.message);
        this.notifier.notify('success', 'Category was removed');
        this.loadCategories();
      }
      else{
        this.notifier.notify('error', 'You can`t remove this category!');
      }
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((res: ApiCollectionResponse) => {
      if (res.isSuccessful) {
        console.log(res.data)
        this.notifier.notify('info', res.data.length + ' categories were loaded');
        this.categories = res.data;
      }
    });
  }

}
