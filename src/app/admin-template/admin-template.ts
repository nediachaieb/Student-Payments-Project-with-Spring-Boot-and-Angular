import {Component} from '@angular/core';
import {Authentication} from '../services/authentication';

@Component({
  selector: 'app-admin-template',
  standalone: false,
  templateUrl: './admin-template.html',
  styleUrl: './admin-template.css',
})
export class AdminTemplate {
  constructor(public authService: Authentication) {
  }

  ngOnInit() {

  }

  logout() {
    this.authService.logout()
  }

}
