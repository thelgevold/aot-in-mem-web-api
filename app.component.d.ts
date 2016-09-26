import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
export declare class TestComponent {
    private http;
    heroes: any;
    constructor(http: Http);
    ngOnInit(): void;
}
