import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{r as t}from"./native-preview-BRFLbKzw.js";import{o as n,t as r}from"./react-vendor-CVmG4vV9.js";import{Dt as i,Ot as a}from"./io5-BqFjv7-4.js";import{n as o,t as s}from"./Alert-BG5G94IQ.js";import{n as c,t as l}from"./CodeBlock-C3JALRK0.js";import{i as u,r as d}from"./DemoBlock-BLFoxU1o.js";import{n as f,t as p}from"./DocPage-DpI9GKki.js";var m,h,g;function _(){return(_=e((()=>{m=`// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideMinerva } from 'minerva-design/angular';
import 'minerva-design/style.css';
import { ProfileComponent } from './profile.component';

bootstrapApplication(ProfileComponent, {
  providers: [provideMinerva({ theme: 'system', locale: 'en' })],
});`,h=`import { Component, signal } from '@angular/core';
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
}`,g=`import { Component, signal } from '@angular/core';
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
}`})))()}function v(){let{t:e}=a(),t=t=>e(`docs.angular.${t}`);return(0,y.jsx)(p,{id:`angular`,intro:(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(s,{color:`info`,children:[t(`scope`),` `,(0,y.jsx)(r,{to:`/platform-support`,children:t(`matrix`)})]}),[[`setup`,m],[`signals`,h],[`forms`,g]].map(([e,n])=>(0,y.jsxs)(`section`,{className:d.section,"aria-labelledby":e,children:[(0,y.jsx)(`h2`,{id:e,children:t(`${e}.title`)}),(0,y.jsx)(`p`,{className:d.prose,children:t(`${e}.text`)}),(0,y.jsx)(l,{code:n,language:`ts`})]},e)),(0,y.jsxs)(`p`,{className:d.prose,children:[t(`upload`),` `]}),(0,y.jsxs)(`p`,{className:d.prose,children:[t(`preview`),` `,(0,y.jsx)(r,{to:`/wc-angular`,children:t(`wcGuide`)})]})]})})}var y;function b(){return(b=e((()=>{i(),n(),o(),c(),f(),u(),_(),y=t()})))()}b();export{v as default};