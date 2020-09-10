import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../shared/account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmitterAlertService } from '../shared/emitter-alert/emitter-alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertService: EmitterAlertService,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email' : [null, [Validators.required, Validators.email]],
      'password' : [null, Validators.required],
    });
  }

  async onFormSubmit() {
    try {
      const result = await this.accountService.login(this.loginForm.value);
      console.log('Login Efetuado');

      this.router.navigate(['']);
    } catch (error) {
      console.log(error);
      this.alertService.addEmptyAlert('Invalid Credentials', 'ERROR');
    }
  }

}
