import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OfferedPage } from './offered.page';

describe('OfferedPage', () => {
  let component: OfferedPage;
  let fixture: ComponentFixture<OfferedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OfferedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
