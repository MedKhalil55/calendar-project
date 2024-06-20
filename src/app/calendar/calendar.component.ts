import { Component } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddEventModalComponent } from '../add-event-modal/add-event-modal.component';
import { isSameDay, isSameMonth } from 'date-fns';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

  title = 'calendar-test';
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Week;
  Calendarview = CalendarView;

  events: CalendarEvent[] = [];
  activeDayIsOpen = false;
  refresh = new Subject<void>();

  constructor(public dialog: MatDialog) {
    const event1 = {
      title: "cours",
      start: new Date("2024-06-20T10:30"),
      end: new Date("2024-06-20T16:30"),
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      }
    };
    const event2 = {
      title: "cours de sport",
      start: new Date("2024-06-20T17:30"),
      end: new Date("2024-06-20T19:30"),
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      }
    };
    this.events.push(event1, event2);
  }

  setView(view: CalendarView): void {
    this.view = view;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventClicked(event: any): void {
    console.log(event);
  }

  eventTimesChanged(event: any): void {
    console.log(event);
    event.event.start = event.newStart;
    event.event.end = event.newEnd;
    this.refresh.next();
  }

  openModal(): void {
    const dialogRef = this.dialog.open(AddEventModalComponent, {
      width: '400px',
      data: { title: '', start: new Date(), end: new Date() }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newEvent: CalendarEvent = {
          title: result.title,
          start: result.start,
          end: result.end,
          draggable: true,
          resizable: {
            beforeStart: true,
            afterEnd: true
          }
        };
        this.events.push(newEvent);
        this.refresh.next();
      }
    });
  }

}
