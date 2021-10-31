import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HttpServiceService } from '../Services/http-service.service';

declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  formData = new FormData();
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoHeight: true,
    autoWidth: true,
    navText: ['', ''],
    margin: -15,
    dots: false,
    navSpeed: 700,

    nav: false,
  };
  constructor(public httpservice: HttpServiceService) {}
  List_Users = [];
  List_Story = [];
  List_Pub = [];

  story = { title: '', image: '', video: '', story: true };
  ihave_story = false;
  ngOnInit(): void {
    this.httpservice.get('users/users/').subscribe((data) => {
      this.List_Users = data['results'];
      console.log(data);
    });

    this.httpservice
      .geth('social/publications/friends_stories/')
      .subscribe((data) => {
        console.log(data, 'rrrr');
        this.List_Story = data['results'];
      });

    this.httpservice
      .geth('social/publications/all_publications/')
      .subscribe((data) => {
        console.log(data, 'kkk');
        this.List_Pub = data['results'];
      });

    this.httpservice
      .geth('social/publications/?story=true')
      .subscribe((data) => {
        console.log(data, 'hhhk');
        if (data['results'].length > 0) {
          this.ihave_story = false;
        }
      });
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formData.append('image', file);
      this.formData.append('story', 'true');
    } else {
      this.formData.append('image', '');
    }
  }

  add_story() {
    this.httpservice
      .post_form_data_h(this.formData, 'social/publications/')
      .subscribe((data) => {
        this.ihave_story = false;
        $('#exampleModalstory').modal('hide');
      });
  }
}
