import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { User } from '../user';
import { EmitterAlertService } from '../shared/emitter-alert/emitter-alert.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  user: User = { id: '', name: '', email: '', password: '', cpf: '', phone: '', birth_date: null };
  isLoadingResults = true;

  constructor(
    private route: ActivatedRoute, 
    private api: ApiService, 
    private router: Router,
    private alertService: EmitterAlertService,
  ) { }

  ngOnInit() {
    this.getUserDetails(this.route.snapshot.params['id']);
  }

  getUserDetails(id: any) {
    this.api.getUser(id)
      .subscribe((data: any) => {
        this.user = data;
        console.log(this.user);
        this.isLoadingResults = false;
      });
  }

  deleteUser(id: any) {
    this.isLoadingResults = true;
    this.api.deleteUser(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.alertService.addAlert('User successfully deleted');
          this.router.navigate(['/users']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

}
