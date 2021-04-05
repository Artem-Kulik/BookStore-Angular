import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCollectionResponse, ApiSingleResponse } from 'src/app/models/apiResponse';
import { CategoryDto } from 'src/app/models/categoryDto';
import { CategoryService } from 'src/app/services/category.service';
import { ApiResponse } from 'src/app/models/apiResponse';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  Edit: CategoryDto = {
    id: -1,
    name: ''
  };

  id: string;

  constructor(private route: ActivatedRoute,
              private routerback: Router,
              private categoryService: CategoryService,
              private notifier: NotifierService)  { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.categoryService.getCategory(parseInt(this.id)).subscribe((res:ApiSingleResponse) => {
      if(res.isSuccessful){
        this.Edit = res.data
      }
    });
  }

  onEdit(){
this.categoryService.editCategory(this.Edit).subscribe( (res: ApiResponse) => {
      if(res.isSuccessful){
        console.log(res.message);
        this.notifier.notify('success', 'Categoty was updated');
        this.routerback.navigate(['/category']);
      }
    });
  }

}
