import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CourierPage } from './courier.page';

describe('CourierPage', () => {
  let component: CourierPage;
  let fixture: ComponentFixture<CourierPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourierPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CourierPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
