import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ElementSchemaRegistry } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiResponse, ApiSingleResponse } from 'src/app/models/apiResponse';
import { EditDto } from 'src/app/models/editDto';
import { RegisterDto } from 'src/app/models/registerDto';
import { UserService } from 'src/app/services/User.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  constructor(private userService: UserService,
    private spinner: NgxSpinnerService,
    private notifier:NotifierService,
    private router: Router,
    private route: ActivatedRoute) { }

    formData: FormData = new FormData();

    prop: EditDto = {
      id: "-1",
      fullName: 'a',
      age: 1,
      phoneNumber: 'a',
      email:'a',
      image: 'Image'
    };
  
    id: string;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.userService.getUser(this.id).subscribe((res:ApiSingleResponse) => {
      if(res.isSuccessful){
        this.prop = res.data
      }
    });
  }

  Edit(){
    this.userService.editUser(this.prop).subscribe((res:ApiResponse) => {
      if(res.isSuccessful){
        this.notifier.notify('success', 'Profile was updated');      
        this.Back();
      }
    });
  }

  Back(){
    this.router.navigate(['/start', {id: this.id}]);      
  }


  uploadPhoto(files: FileList){
    if(files.item && files.item(0))
    {
      this.formData.append('file', files.item(0));
    }
    this.userService.UploadPhoto(this.id, this.formData).subscribe((res: ApiResponse)=>{
      if(res.isSuccessful){
                
      }
    })
  }
  
}
