import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ShellComponent } from './shell.component';

describe('ShellComponent', () => {
  let component: ShellComponent;
  let fixture: ComponentFixture<ShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShellComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the shell component', () => {
    expect(component).toBeTruthy();
  });

  it('should start with sidebar expanded and toggle collapse state', () => {
    expect(component.isCollapsed()).toBe(false);

    component.toggleSidebar();
    expect(component.isCollapsed()).toBe(true);

    component.toggleSidebar();
    expect(component.isCollapsed()).toBe(false);
  });

  it('should display SSE connection indicator', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('CONECTADO (SSE)');
  });
});
