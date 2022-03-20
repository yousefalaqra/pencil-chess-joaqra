import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MirrorPlayersNameComponent } from './mirror-players-name.component';

describe('MirrorPlayersNameComponent', () => {
  let component: MirrorPlayersNameComponent;
  let fixture: ComponentFixture<MirrorPlayersNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MirrorPlayersNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MirrorPlayersNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
