import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    private router: Router
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
    console.log(this.loginForm.value)
    this.router.navigate(['/sidemenu/home'])
  }

  createLoginForm() {
    return this.formBuilder.group({
      email: ['a@a', [Validators.required, Validators.email]],
      password: ['aaaaaaa', Validators.required]
    })
  }

}
