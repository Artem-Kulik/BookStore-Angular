import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCollectionResponse, ApiResponse, ApiSingleResponse } from '../models/apiResponse';
import { BookDto } from '../models/bookDto';

@Injectable({
  providedIn: 'root'
})
export class BookService {

constructor(private http: HttpClient) { }

  getBooks(): Observable<ApiResponse>{
    return this.http.get<ApiCollectionResponse>('https://localhost:44357/api/book');
  }

  deleteBook(id: number): Observable<ApiResponse>{
    return this.http.delete<ApiResponse>('https://localhost:44357/api/book?id=' + id);
  }

  addBook(book: BookDto): Observable<ApiResponse>{
    return this.http.post<ApiResponse>('https://localhost:44357/api/book', book);
  }

  editBook(book: BookDto): Observable<ApiResponse>{
    return this.http.put<ApiResponse>('https://localhost:44357/api/book', book);
  }  

  getBook(id:number): Observable<ApiResponse>{
    return this.http.get<ApiSingleResponse>('https://localhost:44357/api/book/' + id);
  }

  getBookSortedByName(): Observable<ApiResponse>{
    return this.http.get<ApiSingleResponse>('https://localhost:44357/api/book/sortByName');
  }

  getBookSortedByAuthor(): Observable<ApiResponse>{
    return this.http.get<ApiSingleResponse>('https://localhost:44357/api/book/sortByAuthor');
  } 
  
  getBookSortedByYear(): Observable<ApiResponse>{
    return this.http.get<ApiSingleResponse>('https://localhost:44357/api/book/sortByYear');
  }

  getBookSortedByCategory(): Observable<ApiResponse>{
    return this.http.get<ApiSingleResponse>('https://localhost:44357/api/book/sortByCategory');
  }
}
