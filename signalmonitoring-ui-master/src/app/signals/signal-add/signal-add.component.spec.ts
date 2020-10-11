/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SignalAddComponent } from './signal-add.component';

describe('SignalAddComponent', () => {
  let component: SignalAddComponent;
  let fixture: ComponentFixture<SignalAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignalAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
