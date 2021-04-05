// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';
// import { AddCategoryComponent } from './components/categories-crud/add-category/add-category.component';

// import { CategoriesComponent } from './components/categories-crud/categories/categories.component';

// import { BooksComponent } from './components/books-crud/books/books.component';
// import { UpdateCategoryComponent } from './components/categories-crud/update-category/update-category.component';


// const routes: Routes = [
//   { path: '', component: BooksComponent },
//   { path: 'add-category', component: AddCategoryComponent },
//   { path: 'update-category/:id', component: UpdateCategoryComponent}
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCategoryComponent } from './components/categories-crud/add-category/add-category.component';
import { CategoriesComponent } from './components/categories-crud/categories/categories.component';
import { UpdateCategoryComponent } from './components/categories-crud/update-category/update-category.component';
import { BooksComponent } from './components/books-crud/books/books.component';
import { AddBookComponent } from './components/books-crud/add-book/add-book.component';
import { StartComponent } from './components/start/start.component';
import { UpdateBookComponent } from './components/books-crud/update-book/update-book.component';
import { CategoryBookComponent } from './components/categories-crud/category-book/category-book.component';


const routes: Routes = [
  { path: '', component: StartComponent },
  {
    path: 'category',
    children: [
      { path: '', component: CategoriesComponent },
      { path: 'add-category', component: AddCategoryComponent },
      { path: 'update-category/:id', component: UpdateCategoryComponent },
      { path: 'category-book/:id', component: CategoryBookComponent }
    ]
  },
  {
    path: 'book',
    children: [
      { path: '', component: BooksComponent },
      { path: 'add-book', component: AddBookComponent },
      { path: 'update-book/:id', component: UpdateBookComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

