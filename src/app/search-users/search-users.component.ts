import { Component, OnInit } from '@angular/core';
import { GithubService } from './../github.service';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.css'],
  providers: [GithubService]
})
export class SearchUsersComponent implements OnInit {
  private location: string;
  private language: string;

  private results: any[] = [];
  private selected: boolean = false;
  private selectedUser: any;
  private error_text: string = '';

  constructor(
    private githubService: GithubService
  ) { }

  ngOnInit() {
  }

  search(location: string, language: string): void {
    this.selected = false;
    this.error_text = '';

    if (location || language) {
      this.location = location;
      this.language = language;

      this.githubService.userSearchByPlaceAndLanguage(location, language).subscribe(
        users => {
          this.results = users;
        },
        error => {
          this.results = [];
          this.error_text = 'Sorry, no users found!';
          console.log(error);
        }
      )
    }
  }

  getDetails(username: string): void {
    this.githubService.getDetailsByUsername(username).subscribe(
      details => {
        this.selectedUser = details;
        this.selected = true;
      },
      error => {
        this.selected = false;
        console.log(error);
      }
    )
  }
}
