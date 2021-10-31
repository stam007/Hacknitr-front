import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HttpServiceService } from '../Services/http-service.service';
declare var $: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  formData = new FormData();
  disable_link = false;
  List_Users = [];
  constructor(private router: Router, public httpservice: HttpServiceService) {
    const navEndEvent$ = router.events.pipe(
      filter((e) => e instanceof NavigationEnd)
    );

    navEndEvent$.subscribe(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });

      this.check_link();
    });
  }
  public textArea: string = '';
  public isEmojiPickerVisible!: boolean;
  pub = { title: '', image: '', quantity: '' };
  public addEmoji(event: any) {
    this.textArea = `${this.textArea}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
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
  ngOnInit(): void {
    this.httpservice.get('users/users/').subscribe((data) => {
      this.List_Users = data['results'];
      console.log(data);
    });
  }
  check_link() {
    this.disable_link = false;
    $('#home')
      .removeClass('bi-house-door-fill active_link')
      .addClass('bi-house-door');

    $('#order').removeClass('bi-basket-fill active_link').addClass('bi-basket');

    $('#explore')
      .removeClass('bi-compass-fill active_link')
      .addClass('bi-compass');

    if (this.router.url.includes('order')) {
      $('#order')
        .removeClass('bi-basket')
        .addClass('bi-basket-fill active_link');
    } else if (this.router.url.includes('explore')) {
      $('#explore')
        .removeClass('bi-compass')
        .addClass('bi-compass-fill active_link');
    } else if (this.router.url.includes('profile')) {
      console.log('profile');
    } else if (this.router.url.includes('connect')) {
      this.disable_link = true;
    } else {
      $('#home')
        .removeClass('bi-house-door')
        .addClass('bi-house-door-fill active_link');
    }
  }

  add_publication() {
    this.formData.append('title', this.pub['title']);
    this.formData.append('quantity', this.pub['quantity']);
    this.httpservice
      .post_form_data_h(this.formData, 'social/publications/')
      .subscribe((data) => {
        $('#exampleModalCenter').modal('hide');
      });
  }
}
