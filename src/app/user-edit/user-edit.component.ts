import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  userForm: FormGroup;
  id = '';
  name = '';
  email = '';
  cpf = '';
  phone = '';
  birth = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private api: ApiService, 
    private formBuilder: FormBuilder,
    private alertService: EmitterAlertService,
  ) { }

  ngOnInit() {
    this.getUser(this.route.snapshot.params['id']);
    this.userForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'email' : [null, [Validators.required, Validators.email]],
      'cpf' : [null, [Validators.required, Validators.maxLength(14)]],
      'phone' : [null, Validators.required],
      'birth_date' : [null, Validators.required]
    });
  }

  getUser(id: any) {
    this.api.getUser(id).subscribe((data: any) => {
      console.log(data);
      this.id = data.id;
      this.userForm.setValue({
        name: data.name,
        email: data.email,
        cpf: data.cpf,
        phone: data.phone,
        birth_date: data.birth_date,
      });
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updateUser(this.id, this.userForm.value)
      .subscribe((res: any) => {
          const id = res.id;
          this.isLoadingResults = false;
          this.alertService.addAlert('User updated successfully');
          this.router.navigate(['/users']);
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
