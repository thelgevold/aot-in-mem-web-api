import { NgModule } from '@angular/core';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api/in-memory-web-api/in-memory-web-api.module';
import { InMemoryDataService } from './in-memory-db.service';
import { BrowserModule } from '@angular/platform-browser';
import { TestComponent } from './app.component';
import { HttpModule } from '@angular/http';
export var AppModule = (function () {
    function AppModule() {
    }
    AppModule.decorators = [
        { type: NgModule, args: [{
                    imports: [BrowserModule, HttpModule, InMemoryWebApiModule.forRoot(InMemoryDataService)],
                    bootstrap: [TestComponent],
                    declarations: [TestComponent]
                },] },
    ];
    /** @nocollapse */
    AppModule.ctorParameters = [];
    return AppModule;
}());
//# sourceMappingURL=app.module.js.map