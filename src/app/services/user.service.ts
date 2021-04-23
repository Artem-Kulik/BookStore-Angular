import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCollectionResponse, ApiResponse, ApiSingleResponse, ApiTokenResponse } from '../models/apiResponse';
import { EditDto } from '../models/editDto';
import { LoginDto } from '../models/loginDto';
import { RegisterDto } from '../models/registerDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) { }
  Register(x: RegisterDto):  Observable<ApiResponse> {
    console.log(x);
    return this.http.post<ApiResponse>('https://localhost:44357/api/account/register', x);
  }

  Login(x: LoginDto):  Observable<ApiResponse> {
    return this.http.post<ApiTokenResponse>('https://localhost:44357/api/account/login', x);
  }

  getUser(id: string):  Observable<ApiResponse> {
    return this.http.get<ApiSingleResponse>('https://localhost:44357/api/account/' + id);
  }

  editUser(x: EditDto):  Observable<ApiResponse> {
    return this.http.post<ApiResponse>('https://localhost:44357/api/account/edit', x);
  }
  
  UploadPhoto(id: string, file: FormData):  Observable<ApiResponse> {
    this.headers.append('Contect-Type', 'multipart/form-data');
    return this.http.post<ApiResponse>('http://localhost:4200/api/image/uploadImage/'+id, file, {headers: this.headers})
  }
}
