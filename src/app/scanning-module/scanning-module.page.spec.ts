import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScanningModulePage } from './scanning-module.page';

describe('ScanningModulePage', () => {
  let component: ScanningModulePage;
  let fixture: ComponentFixture<ScanningModulePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanningModulePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScanningModulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
