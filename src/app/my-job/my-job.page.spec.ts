import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyJobPage } from './my-job.page';

describe('MyJobPage', () => {
  let component: MyJobPage;
  let fixture: ComponentFixture<MyJobPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyJobPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyJobPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
