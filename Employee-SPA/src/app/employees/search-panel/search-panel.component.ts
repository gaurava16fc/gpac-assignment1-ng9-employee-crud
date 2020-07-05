import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.css']
})
export class SearchPanelComponent implements OnInit {
  searchEmpname: string;
  constructor() { }

  ngOnInit(): void {
  }

  onSubmitSearchEmployee() {
    // to do something...
  }

}
