import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector:'test',
  template:'<div *ngFor="let hero of heroes">{{hero.name}}</div>'
})
export class TestComponent {
  heroes: any;
  constructor(private http: Http){

  }
  ngOnInit() {
    this.http.get('/api/heroes').toPromise().then((r: any) => {
      this.heroes = r.json().data;
      console.log(this.heroes);
    })
  }
}