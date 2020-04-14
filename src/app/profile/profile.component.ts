import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as config from '../app-config.json';

const GRAPH_ENDPOINT = config.resources.graphApi.resourceUri;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.http.get(GRAPH_ENDPOINT).toPromise()
      .then(profile => {
          this.profile = profile;
      });
  }
}
