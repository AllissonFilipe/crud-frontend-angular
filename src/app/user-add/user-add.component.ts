import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { EmitterAlertService } from '../shared/emitter-alert/emitter-alert.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  userForm: FormGroup;
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  cpf = '';
  phone = '';
  birth_date = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();
  public emailPattern = '^([a-zA-Z0-9_\\.\\-])+\\@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9]{2,4})+$';

  constructor(
    private router: Router, 
    private api: ApiService, 
    private formBuilder: FormBuilder,
    private alertService: EmitterAlertService,
  ) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'email' : [null, [Validators.required, Validators.email]],
      'password' : [null, Validators.required],
      'confirmPassword' : [null, Validators.required],
      'cpf' : [null, [Validators.required, Validators.maxLength(14)]],
      'phone' : [null, Validators.required],
      'birth_date' : [null, Validators.required]
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    if(this.userForm.get('password').value === this.userForm.get('confirmPassword').value) {
      this.api.addUser(this.userForm.value)
      .subscribe((res: any) => {
          const id = res.id;
          this.isLoadingResults = false;
          this.alertService.addAlert('User created successfully');
          this.router.navigate(['/users']);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
      });
    } else {
      this.isLoadingResults = false;
      this.alertService.addEmptyAlert('Password and Confirm Password fields do not match', 'ERROR');
    }
  }

  getPhoneMask(): string {
    return this.isTelephone() ? '0000-00009' : '00000-0000';
  }

  isTelephone(): boolean {
    return this.userForm.get('phone').value == null ? true : (this.userForm.get('phone').value).length < 9 ? true : false;
  }

}

