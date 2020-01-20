import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoGraphComponent } from './crypto-graph.component';

describe('CryptoGraphComponent', () => {
  let component: CryptoGraphComponent;
  let fixture: ComponentFixture<CryptoGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CryptoGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
