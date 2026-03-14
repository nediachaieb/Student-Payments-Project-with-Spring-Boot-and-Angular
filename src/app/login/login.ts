import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {Authentication} from '../services/authentication';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit{

  public loginFormGroup! : FormGroup;
  constructor(private fb : FormBuilder,
              private autService: Authentication,
              private router : Router) {
  }
  ngOnInit() {
    this.loginFormGroup = this.fb.group({
      username : this.fb.control(''),
      password : this.fb.control('')
    });
  }

  login() {
    let username = this.loginFormGroup.value.username;
    let password = this.loginFormGroup.value.password;
    let auth = this.autService.login(username, password);
    if (auth == true) {
      this.router.navigateByUrl("/admin")
    }
  }
}
