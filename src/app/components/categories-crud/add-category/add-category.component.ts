import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ApiResponse } from 'src/app/models/apiResponse';
import { CategoryDto } from 'src/app/models/categoryDto';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  newCategory: CategoryDto = {
    id: -1,
    name: ''
  };

  constructor(private categoryService: CategoryService, private router: Router, private notifier:NotifierService) { }

  ngOnInit() {
  }

  onAdd(){
    this.categoryService.addCategory(this.newCategory).subscribe( (res: ApiResponse) => {
      if(res.isSuccessful){
        console.log(res.message);
        this.notifier.notify('success', 'Category was added');
        this.router.navigate(['/category']);
      }
    });
  }

}
