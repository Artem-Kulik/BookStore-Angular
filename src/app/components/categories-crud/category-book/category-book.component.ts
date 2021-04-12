import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiCollectionResponse } from 'src/app/models/apiResponse';
import { BookDto } from 'src/app/models/bookDto';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-book',
  templateUrl: './category-book.component.html',
  styleUrls: ['./category-book.component.css']
})
export class CategoryBookComponent implements OnInit {

  books: Array<BookDto>;
  id: string;
  constructor(private route: ActivatedRoute, private categoryService: CategoryService,
    private spinner: NgxSpinnerService, private notifier:NotifierService) { }

  ngOnInit() {
    this.spinner.show()
    this.id = this.route.snapshot.paramMap.get('id');
    this.categoryService.getBooksByCategory(parseInt(this.id)).subscribe((res: ApiCollectionResponse) => {
      if (res.isSuccessful) {
        console.log(res.data);
        this.notifier.notify('info', res.data.length + ' books were loaded');
        this.books = res.data;
      }
    });

    setTimeout(() => {
      this.spinner.hide()
    }, 450);
  }

}
