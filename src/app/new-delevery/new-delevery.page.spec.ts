import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewDeleveryPage } from './new-delevery.page';

describe('NewDeleveryPage', () => {
  let component: NewDeleveryPage;
  let fixture: ComponentFixture<NewDeleveryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDeleveryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewDeleveryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
