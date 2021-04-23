import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiResponse, ApiTokenResponse } from 'src/app/models/apiResponse';
import { LoginDto } from 'src/app/models/loginDto';
import { RegisterDto } from 'src/app/models/registerDto';
import { UserService } from 'src/app/services/User.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService,
    private spinner: NgxSpinnerService,
    private notifier:NotifierService,
    private router: Router) { }

  ngOnInit() {
  }

  // prop: LoginDto = {
  //   email:'a',
  //   password: 'a'
  // };

  prop: RegisterDto = {
    fullName: 'a',
    age: 1,
    phoneNumber: 'a',
    email:'a',
    password: 'a',
    image: 'Image'
  };


  Login(){
    this.userService.Login(this.prop).subscribe((res: ApiTokenResponse) => {
      if (res.isSuccessful) {
        localStorage.setItem("Token", res.token);   
        this.router.navigate(['/start', {id: res.message}]);            
      }
      else{
        this.notifier.notify('error', 'Error login or password');
      }
    });   
  }
}
