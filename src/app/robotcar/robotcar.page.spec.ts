import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RobotcarPage } from './robotcar.page';

describe('RobotcarPage', () => {
  let component: RobotcarPage;
  let fixture: ComponentFixture<RobotcarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RobotcarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RobotcarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
