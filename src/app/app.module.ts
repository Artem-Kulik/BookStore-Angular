import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './components/categories-crud/categories/categories.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddCategoryComponent } from './components/categories-crud/add-category/add-category.component';
import { FormsModule } from '@angular/forms';
import { UpdateCategoryComponent } from './components/categories-crud/update-category/update-category.component';
import { StartComponent } from './components/start/start.component';
import { BooksComponent } from './components/books-crud/books/books.component';
import { AddBookComponent } from './components/books-crud/add-book/add-book.component';
import { UpdateBookComponent } from './components/books-crud/update-book/update-book.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CategoryBookComponent } from './components/categories-crud/category-book/category-book.component';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { TokenInterceptor } from './helpers/interceptor';

const customNotifierOption: NotifierOptions = {
  position: {horizontal: {position: 'right'}, vertical: {position: 'top'} }
}

@NgModule({
  declarations: [			
    AppComponent,
    CategoriesComponent,
    AddCategoryComponent,
    UpdateCategoryComponent,
    StartComponent,
    BooksComponent,
    AddBookComponent,
    UpdateBookComponent,
    CategoryBookComponent,
    RegisterComponent,
    LoginComponent,
    ProfileEditComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    NotifierModule.withConfig(customNotifierOption)
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
