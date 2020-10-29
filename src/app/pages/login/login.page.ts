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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.createLoginForm()
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
