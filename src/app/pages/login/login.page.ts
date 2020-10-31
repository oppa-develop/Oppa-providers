import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as faker from 'faker/locale/es_MX'
import { AuthService } from 'src/app/providers/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup
  darkMode = false

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.loginForm = this.createLoginForm()
    if (localStorage.getItem('darkMode') === 'on') {
      document.body.setAttribute('data-theme', 'dark');
      this.darkMode = true
    } else {
      document.body.setAttribute('data-theme', 'light');
      this.darkMode = false
    }
  }

  login() {
    this.auth.login(this.loginForm.value)
  }

  createLoginForm() {
    return this.formBuilder.group({
      email: [faker.internet.email(), [Validators.required, Validators.email]],
      password: [faker.internet.password(), Validators.required]
    })
  }

}
