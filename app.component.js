import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
export var TestComponent = (function () {
    function TestComponent(http) {
        this.http = http;
    }
    TestComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.http.get('/api/heroes').toPromise().then(function (r) {
            _this.heroes = r.json().data;
            console.log(_this.heroes);
        });
    };
    TestComponent.decorators = [
        { type: Component, args: [{
                    selector: 'test',
                    template: '<div *ngFor="let hero of heroes">{{hero.name}}</div>'
                },] },
    ];
    /** @nocollapse */
    TestComponent.ctorParameters = [
        { type: Http, },
    ];
    return TestComponent;
}());
//# sourceMappingURL=app.component.js.map