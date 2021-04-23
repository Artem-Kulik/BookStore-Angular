import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiResponse, ApiSingleResponse } from 'src/app/models/apiResponse';
import { EditDto } from 'src/app/models/editDto';
import { RegisterDto } from 'src/app/models/registerDto';
import { UserService } from 'src/app/services/User.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  constructor(private userService: UserService,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService,
    private router: Router,
    private route: ActivatedRoute,) { }

  prop: EditDto = {
    id: "-1",
    fullName: '',
    age: 0,
    phoneNumber: '',
    email: '',
    image: 'Image'
  };

  id: string;

  path: string = "http://localhost:4200/Images/";

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id == null) this.id = localStorage.getItem("Id");
    localStorage.setItem("Id", this.id);
    this.userService.getUser(this.id).subscribe((res: ApiSingleResponse) => {
      if (res.isSuccessful) {
        console.log(res.data);
        this.prop = res.data;
      }
      else {
        this.notifier.notify('error', 'Something goes wrong');
      }
    });
  }

  Edit() {
    this.router.navigate(['/edit-profile', { id: this.id }]);
  }

  LogOff(){
    localStorage.removeItem("Token");
    localStorage.removeItem("Id");
    this.router.navigate(['/login']);
  }
}
