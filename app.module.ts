import { NgModule } from '@angular/core';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api/in-memory-web-api/in-memory-web-api.module';
import { InMemoryDataService } from './in-memory-db.service';
import { BrowserModule } from '@angular/platform-browser';
import { TestComponent } from './app.component';
import { HttpModule }    from '@angular/http';

@NgModule({
  imports: [BrowserModule, HttpModule, InMemoryWebApiModule.forRoot(InMemoryDataService)],
  bootstrap: [ TestComponent ],
  declarations: [ TestComponent ]
})
export class AppModule {

}