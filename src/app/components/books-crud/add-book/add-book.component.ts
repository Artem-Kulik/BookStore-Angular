import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponse, ApiCollectionResponse } from 'src/app/models/apiResponse';
import { BookDto } from 'src/app/models/bookDto';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryDto } from 'src/app/models/categoryDto';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  newBook: BookDto = {
    id: -1,
    name: '',
    author: '',
    category: '',
    year: 0
  }; 
  
  categories: Array<CategoryDto>;

  constructor(private bookService: BookService, 
    private categoryService: CategoryService,
        private notifier:NotifierService,
        private router: Router ) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe((res: ApiCollectionResponse) => {
      if (res.isSuccessful) {
        console.log(res.data);
        this.categories = res.data;
      }
    });
  }

  onAdd(){
    this.bookService.addBook(this.newBook).subscribe( (res: ApiResponse) => {
      if(res.isSuccessful){        
        this.notifier.notify('success', 'Book was added');
        console.log(res.message);      
        this.router.navigate(['/book']);
      }
    });
  }
}
