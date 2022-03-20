import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChessFrameComponent } from './chess-frame.component';

describe('ChessFrameComponent', () => {
  let component: ChessFrameComponent;
  let fixture: ComponentFixture<ChessFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChessFrameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChessFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
