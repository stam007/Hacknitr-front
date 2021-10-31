import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../Services/http-service.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss'],
})
export class ConnectComponent implements OnInit {
  loginstatus = true;
  formData = new FormData();
  constructor(private httpservice: HttpServiceService) {}
  user_data = { username: '', email: '', name: '', password: '' };

  ngOnInit(): void {}

  connect() {
    this.formData.append('username', this.user_data['username']);
    this.formData.append('email', this.user_data['email']);
    this.formData.append('name', this.user_data['name']);
    this.formData.append('password', this.user_data['password']);
    if (this.loginstatus == false) {
      this.httpservice
        .post_form_data(this.formData, 'users/users/')
        .subscribe((data) => {
          console.log(data);
          localStorage.setItem(
            'username',
            JSON.stringify(this.user_data['username'])
          );

          localStorage.setItem(
            'password',
            JSON.stringify(this.user_data['password'])
          );
          this.httpservice.get_my_id();
          window.location.href = '/';
        });
    } else {
      this.httpservice
        .post_form_data(this.formData, 'users/users/login/')
        .subscribe((data) => {
          localStorage.setItem('user', JSON.stringify(data['id']));
          localStorage.setItem(
            'username',
            JSON.stringify(this.user_data['username'])
          );

          localStorage.setItem(
            'password',
            JSON.stringify(this.user_data['password'])
          );
          this.httpservice.get_my_id();
          window.location.href = '/';
        });
    }
  }
  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formData.append('image', file);
    } else {
      this.formData.append('image', '');
    }
  }
}
