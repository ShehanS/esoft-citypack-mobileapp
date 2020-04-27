import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JobCompletePage } from './job-complete.page';

describe('JobCompletePage', () => {
  let component: JobCompletePage;
  let fixture: ComponentFixture<JobCompletePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobCompletePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JobCompletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
