import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SlideNavPage } from './slide-nav.page';

describe('SlideNavPage', () => {
  let component: SlideNavPage;
  let fixture: ComponentFixture<SlideNavPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideNavPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SlideNavPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
