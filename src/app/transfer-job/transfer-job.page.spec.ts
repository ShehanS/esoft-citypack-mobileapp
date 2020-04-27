import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransferJobPage } from './transfer-job.page';

describe('TransferJobPage', () => {
  let component: TransferJobPage;
  let fixture: ComponentFixture<TransferJobPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferJobPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransferJobPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
