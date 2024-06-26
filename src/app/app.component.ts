import { Component } from '@angular/core';
import { Event } from './event';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'calendar-test';
  events : Event[] = [];  
  
  constructor(private http: HttpClient){ }

  ngOnInit() : void{
    this.http.get<Event[]>(
      "http://localhost:8080/calendar/events"
    ).subscribe(data => this.events = data);
  }
}
