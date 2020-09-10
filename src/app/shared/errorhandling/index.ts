// ---------------------------------------------------------------------
// COMMON ERROR HANDLING

import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

export interface VivereErrorMessage {
    message: string;
}

export interface VivereError {
    messages: VivereErrorMessage[];
    statusCode: number;
    timestamp: string;
    path: string;
    errorId: string;
    exception: string;
    severity: VivereErrorSeverity;
    type: VivereErrorType;
}

export enum VivereErrorSeverity {
    ERROR = 'ERROR',
    WARN = 'WARN'
}

export enum VivereErrorType {
    BUSINESS = 'BUSINESS',
    SYSTEM = 'SYSTEM'
}

export class Alert {
    type: string;
    message: string;
    error: VivereError;

    constructor(message: string, error: HttpErrorResponse) {
        if (error == null) {
            this.type = 'success';
            // message must be translated
            this.message = message;
        } else {
            // default type is error
            this.type = 'danger';
            // checking VivereError - Standardized errors in the backend
            this.error = error.error as VivereError;
            if (this.error && this.error.statusCode) {
                // CHANGE SEVERITY IF APPLICABLE
                if (this.error.severity === VivereErrorSeverity.WARN) {
                    this.type = 'warning';
                }
                // message
                this.message = this.error.messages[0].message +
                    this.error.messages[1].message;

                // TRID for system errors
                if (this.error.type === VivereErrorType.SYSTEM) {
                    const headers: HttpHeaders = error.headers;
                    if (headers.get('X-TRID')) {
                        this.message = this.message + ' (ID Transacao: ' + headers.get('X-TRID') + ')';
                    }
                }
            } else {
                // For Bad Request, it uses the message passed by the client
                if (error.status === 400 && message != null) {
                    this.message = message;
                } else {
                    // otherwise a predefined message
                    this.message = 'System is unavailable. Please try it later.';
                }
            }
        }
    }
}
