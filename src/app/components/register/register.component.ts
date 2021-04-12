import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiResponse } from 'src/app/models/apiResponse';
import { RegisterDto } from 'src/app/models/registerDto';
import { UserService } from 'src/app/services/User.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService,
    private spinner: NgxSpinnerService,
    private notifier:NotifierService,
    private router: Router) { }

  prop: RegisterDto = {
    fullName: '',
    age: 0,
    phoneNumber: '',
    email:'',
    password: '',
    image: 'Image'
  };

  ngOnInit() {
    
  }

  Register(){
    console.log(this.prop);
    this.notifier.notify('info', 'Register in process...');

    this.userService.Register(this.prop).subscribe((res: ApiResponse) => {
      if (res.isSuccessful) {
        console.log(res.message);
        this.notifier.notify('success', 'You successful registered');
        this.router.navigate(['/login']);
      }
      else{
        this.notifier.notify('error', 'You weren`t register');
      }
    });
  }

}
