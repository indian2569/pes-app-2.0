import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthorizedComponent } from './unauthorized.component';

describe('UnauthorizedComponent', () => {
  let fixture: ComponentFixture<UnauthorizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnauthorizedComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UnauthorizedComponent);
    fixture.detectChanges();
  });

  it('tells the user they have no access', () => {
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Na túto stránku nemáte prístup.');
  });
});
