# Angular

Native standalone Angular components, signals and Angular Forms from minerva-design/angular.

Package: minerva-design@1.24.4

Renderer: uni

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.24.4",
  "sourceCommit": "580bc03aa319a78f6f653ee0f9610fe236a93d38",
  "sourceDigest": "sha256:b9a39dcfe8b09a5d0967efee074963c408a37abb72fbe1d4c7a1eda21075df1d",
  "referenceSourceDigest": "sha256:25c00e4ed9c1ea1a2744aa521b6deba862ac402384cb19f4e7d069b72a5172c6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.24.4/types.json) or getType() from minerva-design/contracts.

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
