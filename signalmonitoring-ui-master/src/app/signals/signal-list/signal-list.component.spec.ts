/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SignalListComponent } from './signal-list.component';

describe('SignalListComponent', () => {
  let component: SignalListComponent;
  let fixture: ComponentFixture<SignalListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignalListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
