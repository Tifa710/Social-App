import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedcontentComponent } from './feedcontent.component';

describe('FeedcontentComponent', () => {
  let component: FeedcontentComponent;
  let fixture: ComponentFixture<FeedcontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedcontentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedcontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
