import { Component, OnInit } from '@angular/core';
import { EmitterAlertService } from './emitter-alert.service';
import { Alert } from '../errorhandling';
import { isArray } from 'util';

@Component({
    selector: 'app-emitter-alert',
    templateUrl: './emitter-alert.component.html',
    styleUrls: ['./emitter-alert.component.scss']
})
export class EmitterAlertComponent implements OnInit {

    public alerts: Array<any> = [];
    public params: any;

    constructor(private alertService: EmitterAlertService) { }

    ngOnInit() {
        this.alertService.currentSource.subscribe((alerts) => {
            if (isArray(alerts[0])) {
                this.alerts = alerts[0];
                this.params = alerts[1];
            } else {
                this.alerts = alerts;
            }
        });
    }

    public closeAlert(alert: Alert) {
        this.alertService.removeAlert(alert);
    }

}
