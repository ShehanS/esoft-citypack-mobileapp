import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-slide-nav',
  templateUrl: './slide-nav.page.html',
  styleUrls: ['./slide-nav.page.scss'],
})
export class SlideNavPage implements OnInit {

  constructor() { }
  mode = new FormControl('over');
  ngOnInit() {
  }

}
