import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BettersListComponent } from './betters-list.component';

describe('BettersListComponent', () => {
  let component: BettersListComponent;
  let fixture: ComponentFixture<BettersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BettersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BettersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
