# Angular

Native standalone Angular components, signals and Angular Forms from minerva-design/angular.

Package: minerva-design@1.20.3

Renderer: wc

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "ea7fb3e1f55d184b7d737316e9ae829f4f7ff223",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:4cf6057856184f16240d0d22153ec370842fc7a2dfaaa66364e189fed89e6ca3"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

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
