# Angular

Native standalone Angular components, signals and Angular Forms from minerva-design/angular.

Package: minerva-design@1.20.2

Renderer: vue

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.2",
  "sourceCommit": "8d5d0df3644b1fa1c267b3dd6809b0e7eb1ce75b",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:b329acf9d5eb6cf4b4b42169ce925c67b033f581b616664bf07fc6d664de45f0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.2/types.json) or getType() from minerva-design/contracts.

## Documentation

The native Angular package is available. Implemented components and platform differences are listed in the support matrix.

Platform support

### Setup

Install minerva-design and the Angular peer versions declared by the package. Import the shared stylesheet once and bootstrap provideMinerva for theme and locale.

### Signals and native imports

Import standalone directives and components directly. MnButton enhances a native button; MnInput and MnUpload expose typed value models. CUSTOM_ELEMENTS_SCHEMA is not needed.

### Angular Forms

The native input and upload components include ControlValueAccessor support. Use ReactiveFormsModule or FormsModule directly; no custom value-accessor directive is required. Disabled, touched and value updates participate in the Angular form.

Upload selects and validates local files. The application handles network transfers: listen to filesSelected and update each UploadItem status as the transfer progresses.

Every component-page Angular tab runs native standalone Angular components with interactive inputs and outputs. Examples are compiled ahead of time with strict template checks; the displayed source matches the live preview. The separate Web Components guide remains available for custom-element integration.

Web Components in Angular

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
