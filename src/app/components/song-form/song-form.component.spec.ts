import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongFormComponent } from './song-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('SongFormComponent', () => {
  let component: SongFormComponent;
  let fixture: ComponentFixture<SongFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SongFormComponent],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SongFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set initial values', () => {
    expect(component.songForm.get('name')?.value).toBe('');
    expect(component.songForm.get('type')?.value).toBe('');
    expect(component.songForm.get('singerList')?.value).toBe('');
  });

  it('should validate name field', () => {
    const nameControl = component.songForm.get('name');
    if (!nameControl) {
      fail();
      return;
    }
    nameControl.setValue('');
    expect(nameControl.valid).toBeFalsy();
  });

  it('should validate type field', () => {
    const typeControl = component.songForm.get('type');
    if (!typeControl) {
      fail();
      return;
    }
    typeControl.setValue('');
    expect(typeControl.valid).toBeFalsy();
  });

  it('should validate singerList field', () => {
    const singerListControl = component.songForm.get('singerList');
    if (!singerListControl) {
      fail();
      return;
    }
    singerListControl.setValue('');
    expect(singerListControl.valid).toBeFalsy();
  });

  it('should be valid with correct values', () => {
    component.songForm.setValue({
      name: 'Song 111',
      type: 'pop',
      singerList: 'A,B,C',
    });
    expect(component.songForm.valid).toBeTruthy();
  });
});
