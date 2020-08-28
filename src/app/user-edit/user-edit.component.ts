import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  userForm: FormGroup;
  id = '';
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  cpf = '';
  phone = '';
  birth = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();
  public emailPattern = '^([a-zA-Z0-9_\\.\\-])+\\@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9]{2,4})+$';

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getUser(this.route.snapshot.params['id']);
    this.userForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'email' : [null, Validators.required],
      'password' : [null, Validators.required],
      'confirmPassword' : [null, Validators.required],
      'cpf' : [null, [Validators.required, Validators.maxLength(14)]],
      'phone' : [null, Validators.required],
      'birthDate' : [null, Validators.required]
    });
  }

  getUser(id: any) {
    this.api.getUser(id).subscribe((data: any) => {
      this.id = data.id;
      this.userForm.setValue({
        name: data.name,
        email: data.email,
        password: data.password,
        cpf: data.cpf,
        phone: data.phone,
        birthDate: data.birthDate,
      });
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updateUser(this.id, this.userForm.value)
      .subscribe((res: any) => {
          const id = res.id;
          this.isLoadingResults = false;
          this.router.navigate(['/user-details', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  userDetails() {
    this.router.navigate(['/user-details', this.id]);
  }

  getPhoneMask(): string {
    return this.isTelephone() ? '0000-00009' : '00000-0000';
  }

  isTelephone(): boolean {
    return this.userForm.get('phone').value == null ? true : (this.userForm.get('phone').value).length < 9 ? true : false;
  }

}
