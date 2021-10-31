import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HttpServiceService {
  baseurl = 'http://35.159.22.46:8000/';
  httpheader = new HttpHeaders({ 'Content-Type': 'application/json' });
  id_user = -1;

  public user_me = { id: '', username: '', name: '', email: '', image: '' };
  constructor(private http: HttpClient, private router: Router) {
    this.get_my_id();
  }
  post(type: any, tab: string): Observable<any> {
    const body = type;

    var result = this.http.post(this.baseurl + tab, body, {
      headers: this.httpheader,
    });

    return result;
  }
  post_form_data(type: any, tab: string): Observable<any> {
    const body = type;

    var result = this.http.post(this.baseurl + tab, body);

    return result;
  }
  post_form_data_h(type: any, tab: string): Observable<any> {
    const body = type;
    var username = JSON.parse(localStorage.getItem('username')!);
    var password = JSON.parse(localStorage.getItem('password')!);

    var httpheaderh = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    var result = this.http.post(this.baseurl + tab, body, {
      headers: httpheaderh,
    });

    return result;
  }
  get(tab: string): Observable<any> {
    var result = this.http.get(this.baseurl + tab, {
      headers: this.httpheader,
    });

    return result;
  }

  put(type: any, tab: string): Observable<any> {
    const body = type;

    var result = this.http.put(this.baseurl + tab, body, {
      headers: this.httpheader,
    });

    return result;
  }
  put_form_data(type: any, tab: string): Observable<any> {
    const body = type;

    var result = this.http.put(this.baseurl + tab, body);

    return result;
  }

  put_form_data_h(type: any, tab: string): Observable<any> {
    const body = type;
    var username = JSON.parse(localStorage.getItem('username')!);
    var password = JSON.parse(localStorage.getItem('password')!);

    var httpheaderh = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });

    var result = this.http.put(this.baseurl + tab, body, {
      headers: httpheaderh,
    });

    return result;
  }

  geth(tab: string): Observable<any> {
    var username = JSON.parse(localStorage.getItem('username')!);
    var password = JSON.parse(localStorage.getItem('password')!);

    var httpheader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    var result = this.http.get(this.baseurl + tab, {
      headers: httpheader,
    });

    return result;
  }

  delete(tab: string): Observable<any> {
    var result = this.http.delete(this.baseurl + tab, {
      headers: this.httpheader,
    });

    return result;
  }

  // localStorage.setItem('user', JSON.stringify(this.user));
  //  var tok = JSON.parse(localStorage.getItem('token')!);

  get_my_id() {
    this.id_user = JSON.parse(localStorage.getItem('user')!);
    if (!this.id_user) {
      this.router.navigate(['/connect']);
    } else {
      this.geth('api/users/' + this.id_user + '/').subscribe((data) => {
        this.user_me = data;
        console.log(data, 'vvvv');
      });
    }
  }
}
