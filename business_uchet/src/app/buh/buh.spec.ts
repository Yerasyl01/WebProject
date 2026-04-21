import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Buh } from './buh';

describe('Buh', () => {
  let component: Buh;
  let fixture: ComponentFixture<Buh>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Buh],
    }).compileComponents();

    fixture = TestBed.createComponent(Buh);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
