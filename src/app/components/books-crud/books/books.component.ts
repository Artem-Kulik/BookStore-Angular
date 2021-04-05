import { Component, OnInit } from '@angular/core';
import { ApiCollectionResponse, ApiResponse } from 'src/app/models/apiResponse';
import { BookDto } from 'src/app/models/bookDto';
import { BookService } from 'src/app/services/book.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: Array<BookDto>;

  constructor(private bookService: BookService,
    private spinner: NgxSpinnerService, private notifier:NotifierService) { }

  ngOnInit() {
    this.spinner.show()
    this.loadCategories();
    setTimeout(() => {
      this.spinner.hide()
    }, 450);
    
  }

  onDelete(id: number){
    this.bookService.deleteBook(id).subscribe( (res: ApiResponse) => {
      if(res.isSuccessful){
        console.log(res.message);
        this.notifier.notify('success', 'Books was removed');
        this.loadCategories();
      }
    });
  }

  loadCategories(){
    this.bookService.getBooks().subscribe( (res: ApiCollectionResponse) => {
      if(res.isSuccessful){
        console.log(res.data)
        this.notifier.notify('info', res.data.length + ' books were loaded');

        this.books = res.data;        
      }
    });
  }

  sortByName(){
    this.bookService.getBookSortedByName().subscribe( (res: ApiCollectionResponse) => {
      if(res.isSuccessful){
        console.log(res.data)
        this.notifier.notify('info', 'Books were sorted by name');
        this.books = res.data       
      }
    });
  }

  sortByAuthor(){
    this.bookService.getBookSortedByAuthor().subscribe( (res: ApiCollectionResponse) => {
      if(res.isSuccessful){
        console.log(res.data)
        this.notifier.notify('info', 'Books were sorted by author');
        this.books = res.data;       
      }
    });
  } 

  sortByCategory(){
    this.bookService.getBookSortedByCategory().subscribe( (res: ApiCollectionResponse) => {
      if(res.isSuccessful){
        console.log(res.data)
        this.notifier.notify('info', 'Books were sorted by category');
        this.books = res.data;       
      }
    });
  }  
  
  sortByYear(){
    this.bookService.getBookSortedByYear().subscribe( (res: ApiCollectionResponse) => {
      if(res.isSuccessful){
        console.log(res.data)
        this.notifier.notify('info', 'Books were sorted by year');
        this.books = res.data;       
      }
    });
  }
}
