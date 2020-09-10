import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Alert} from '../errorhandling';
import {EmitterAlertInterface} from './emitter-alert.interface';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class EmitterAlertService {
    public alerts: Array<any> = [];
    public params: any;

    private alertSource = new BehaviorSubject(this.alerts);
    currentSource = this.alertSource.asObservable();

    constructor() {
    }

    public addAlert(message: string) {
        const alert = new Alert(message, null);
        this.alerts.push(alert);
        this.alertSource.next(this.alerts);
    }

    public removeAlert(alert) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
        this.alertSource.next(this.alerts);
    }

    public addAlertError(error) {
        const alert = new Alert(null, error);
        this.alerts.push(alert);
        this.alertSource.next(this.alerts);
    }

    public addEmptyAlert(msg: string, type: string, params?: any) {
        const errorEmptyAlert: EmitterAlertInterface =  {
            error: {
                messages: [
                    { message: '' },
                    { message: msg }
                ]
            }
        };
        if (type === 'WARN') {
            errorEmptyAlert.error.statusCode = 400;
            errorEmptyAlert.error.severity = type;
            errorEmptyAlert.error.type = false;
        }
        if (type === 'ERROR') {
            errorEmptyAlert.error.statusCode = 500;
            errorEmptyAlert.error.severity = type;
            errorEmptyAlert.error.type = false;
        }

        const alert = new Alert(null, <HttpErrorResponse>errorEmptyAlert);
        this.alerts.push(alert);
        if (params) {
            this.alertSource.next([this.alerts, params]);
        } else {
            this.alertSource.next(this.alerts);
        }
    }
}
