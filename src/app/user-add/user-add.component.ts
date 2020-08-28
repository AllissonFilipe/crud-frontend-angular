import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

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
  birthDate = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();
  public emailPattern = '^([a-zA-Z0-9_\\.\\-])+\\@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9]{2,4})+$';

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'email' : [null, Validators.required, Validators.email],
      'password' : [null, Validators.required],
      'confirmPassword' : [null, Validators.required],
      'cpf' : [null, [Validators.required, Validators.maxLength(14)]],
      'phone' : [null, Validators.required],
      'birthDate' : [null, Validators.required]
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.addUser(this.userForm.value)
      .subscribe((res: any) => {
          const id = res._id;
          this.isLoadingResults = false;
          this.router.navigate(['/user-details', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

  getPhoneMask(): string {
    return this.isTelephone() ? '0000-00009' : '00000-0000';
  }

  isTelephone(): boolean {
    return this.userForm.get('phone').value == null ? true : (this.userForm.get('phone').value).length < 9 ? true : false;
  }

}

