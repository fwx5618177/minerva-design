export const setupCode = `// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideMinerva } from 'minerva-design/angular';
import 'minerva-design/style.css';
import { ProfileComponent } from './profile.component';

bootstrapApplication(ProfileComponent, {
  providers: [provideMinerva({ theme: 'system', locale: 'en' })],
});`;

export const signalCode = `import { Component, signal } from '@angular/core';
import { MnButton, MnInput, MnUpload, type UploadItem } from 'minerva-design/angular';

@Component({
  selector: 'app-profile',
  imports: [MnButton, MnInput, MnUpload],
  template: \`
    <mn-input aria-label="Name" [value]="name()" (valueChange)="name.set($event ?? '')" />
    <mn-upload label="Attachments" multiple removable
      [value]="files()" (valueChange)="files.set($event)" />
    <button mnButton [disabled]="!name()" (click)="saved.set(name())">Save</button>
    <p role="status">{{ saved() }}</p>
  \`,
})
export class ProfileComponent {
  name = signal('');
  files = signal<UploadItem[]>([]);
  saved = signal('');
}`;

export const formsCode = `import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MnButton, MnInput, MnUpload, type UploadItem } from 'minerva-design/angular';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, MnButton, MnInput, MnUpload],
  template: \`
    <form [formGroup]="form" (ngSubmit)="save()">
      <mn-input aria-label="Email" type="email" [formControl]="email" />
      <mn-upload label="Attachments" multiple removable [formControl]="files" />
      <button mnButton type="submit" [disabled]="email.invalid">Save</button>
    </form>
    <p role="status">{{ saved() }}</p>
  \`,
})
export class SignupComponent {
  email = new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] });
  files = new FormControl<UploadItem[]>([], { nonNullable: true });
  form = new FormGroup({ email: this.email, files: this.files });
  saved = signal('');
  save() {
    if (this.email.valid) this.saved.set(this.email.value);
  }
}`;
