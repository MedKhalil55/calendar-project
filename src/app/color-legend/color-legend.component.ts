import { Component } from '@angular/core';

@Component({
  selector: 'app-color-legend',
  templateUrl: './color-legend.component.html',
  styleUrls: ['./color-legend.component.scss']
})
export class ColorLegendComponent {

  categories = [
    { name: 'Category 1', color: '#1e90ff' },
    { name: 'Category 2', color: '#32CD32' },
    { name: 'Category 3', color: '#FFA500' }
  ];

}
