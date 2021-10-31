import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../Services/http-service.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {
  constructor(public httpservice: HttpServiceService) {}

  List_Plants = [];
  my_profile = { publications: 0, am_follow: 0, follow_me: 0 };
  List_Pub = [];

  ngOnInit(): void {
    this.httpservice.geth('social/publications/').subscribe((data) => {
      this.List_Plants = data['results'];
      console.log(data, 'fdddd');
    });

    this.httpservice.geth('social/publications/').subscribe((data) => {
      this.List_Pub = data['results'];
    });
    this.httpservice.geth('users/users/my_profile/').subscribe((data) => {
      this.my_profile = data;
    });
  }
}
