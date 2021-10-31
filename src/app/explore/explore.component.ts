import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../Services/http-service.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
})
export class ExploreComponent implements OnInit {
  List_Pub = [];
  constructor(private httpservice: HttpServiceService) {}

  ngOnInit(): void {
    this.httpservice
      .geth('social/publications/all_publications/')
      .subscribe((data) => {
        console.log(data, 'ggg');
        this.List_Pub = data['results'];
      });
  }
}
