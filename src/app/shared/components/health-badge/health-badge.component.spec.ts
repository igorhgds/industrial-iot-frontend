import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { HealthBadgeComponent } from './health-badge.component';
import { HealthStatus } from '../../../core/models/domain.enums';

describe('HealthBadgeComponent', () => {
  let component: HealthBadgeComponent;
  let componentRef: ComponentRef<HealthBadgeComponent>;
  let fixture: ComponentFixture<HealthBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthBadgeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HealthBadgeComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
  });

  it('should create the component', () => {
    componentRef.setInput('status', HealthStatus.OPERATIONAL);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display OPERACIONAL and emerald classes when status is OPERATIONAL', () => {
    componentRef.setInput('status', HealthStatus.OPERATIONAL);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('OPERACIONAL');
    expect(compiled.querySelector('span')?.className).toContain('text-emerald-400');
  });

  it('should display ATENÇÃO and amber classes when status is WARNING', () => {
    componentRef.setInput('status', HealthStatus.WARNING);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('ATENÇÃO');
    expect(compiled.querySelector('span')?.className).toContain('text-amber-400');
  });

  it('should display CRÍTICO and red pulsing dot when status is CRITICAL', () => {
    componentRef.setInput('status', HealthStatus.CRITICAL);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('CRÍTICO');
    expect(compiled.querySelector('span')?.className).toContain('text-red-400');
    expect(compiled.querySelector('.animate-pulse')).toBeTruthy();
  });
});
