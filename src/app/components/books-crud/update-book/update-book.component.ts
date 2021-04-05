import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ApiCollectionResponse, ApiResponse, ApiSingleResponse } from 'src/app/models/apiResponse';
import { BookDto } from 'src/app/models/bookDto';
import { CategoryDto } from 'src/app/models/categoryDto';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {

  Edit: BookDto = {
    id: -1,
    name: '',
    author: '',
    category: '',
    year: 0
  };
  id: string;
  categories: Array<CategoryDto>;

  constructor(private route: ActivatedRoute,
    private routerback: Router,
    private categoryService: BookService,
    private categoryService1: CategoryService,
    private notifier: NotifierService) { }

  ngOnInit() {
    this.categoryService1.getCategories().subscribe((res: ApiCollectionResponse) => {
      if (res.isSuccessful) {
        console.log(res.data);
        this.categories = res.data;
      }
    });
    this.id = this.route.snapshot.paramMap.get('id');
    this.categoryService.getBook(parseInt(this.id)).subscribe((res: ApiSingleResponse) => {
      if (res.isSuccessful) {
        this.Edit = res.data
      }
    });
  }

  onEdit() {
    this.categoryService.editBook(this.Edit).subscribe((res: ApiResponse) => {
      if (res.isSuccessful) {
        console.log(res.message);
        this.notifier.notify('success', 'Categoty was updated');
        this.routerback.navigate(['/book']);
      }
    });
  }
}
