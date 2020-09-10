// import {async, ComponentFixture, TestBed} from '@angular/core/testing';
// import {CommonModule} from '@angular/common';
// import {FormsModule} from '@angular/forms';
// import {TranslateFakeLoader, TranslateLoader, TranslateModule} from '@ngx-translate/core';
// import {Observable} from 'rxjs/Observable';
// import {NgbAccordionModule, NgbAlertModule, NgbDropdownModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
// import {Alert} from '../../errorhandling';
// import {EmitterAlertService} from './emitter-alert.service';
// import {EmitterAlertComponent} from './emitter-alert.component';
// import {EmitterAlertInterface} from './emitter-alert.interface';

// class MockEmitterAlertService extends EmitterAlertService {
//     public alerts = [];
//     public load = true;

//     addAlert(): Observable<any> {
//         this.alerts.push(null);
//         return Observable.of(this.load);
//     }

//     removeAlert(alert): Observable<any> {
//         this.alerts = [];
//         return Observable.throw(this.load);
//     }

//     addAlertError(): Observable<any> {
//         this.alerts.push(null);
//         return Observable.throw(this.load);
//     }

//     addEmptyAlert(msg, type): Observable<any> {
//         this.alerts = [];
//         return Observable.throw(this.load);
//     }
// }

// describe('EmitterAlertComponent', () => {
//     let component: EmitterAlertComponent;
//     let fixture: ComponentFixture<EmitterAlertComponent>;
//     const alertService: EmitterAlertService = new EmitterAlertService();

//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             declarations: [EmitterAlertComponent],
//             imports: [
//                 CommonModule,
//                 FormsModule,
//                 TranslateModule.forRoot({
//                     loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
//                 }),
//                 NgbDropdownModule.forRoot(),
//                 NgbAccordionModule.forRoot(),
//                 NgbAlertModule.forRoot(),
//                 NgbPaginationModule.forRoot()
//             ],
//             providers: [{
//                 provide: EmitterAlertService, useClass: MockEmitterAlertService
//             }]
//         })
//             .compileComponents()
//             .then(() => {
//                 fixture = TestBed.createComponent(EmitterAlertComponent);
//                 component = fixture.componentInstance;
//                 fixture.detectChanges();
//             });
//     }));

//     it('should create', () => {
//         expect(component).toBeDefined();
//     });

//     it('should create a alert', () => {
//         alertService.alerts = [];

//         alertService.addAlert('Novo Erro');

//         expect(alertService.alerts.length).toBe(1);
//     });

//     it('should remove a alert', () => {
//         alertService.alerts = [null];

//         alertService.removeAlert(null);

//         expect(alertService.alerts.length).toBe(0);
//     });

//     it('should create a alert type of error', () => {
//         alertService.alerts = [];

//         alertService.addAlertError(null);

//         expect(alertService.alerts.length).toBe(1);
//     });

//     it('should create a alert type emptys', () => {
//         alertService.alerts = [];

//         alertService.addEmptyAlert('ALERT@Warning', 'WARN');

//         expect(alertService.alerts.length).toBe(1);
//     });

//     it('should close a alert', () => {
//         const emitterAlertService: MockEmitterAlertService
//             = fixture.debugElement.injector.get(EmitterAlertService) as MockEmitterAlertService;
//         const alertSpy = spyOn(emitterAlertService, 'removeAlert');
//         const alert = new Alert(null, null);

//         component.closeAlert(alert);

//         expect(alertSpy).toHaveBeenCalledWith(alert);
//     });
// });
