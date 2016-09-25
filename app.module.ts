import { NgModule } from '@angular/core';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api/in-memory-web-api';
import { InMemoryDataService } from './in-memory-db.service';

@NgModule({
  imports: [InMemoryWebApiModule.forRoot(InMemoryDataService)]    
})
export class AppModule {
}