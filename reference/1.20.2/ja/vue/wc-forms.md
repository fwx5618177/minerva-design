# フォーム

Minerva のコントロールはフォーム関連付けカスタム要素です：FormData、required と制約検証、setCustomValidity、form.reset()、<fieldset disabled>、<label for>、:invalid、ローカライズされたメッセージ。

Package: minerva-design@1.20.2

Renderer: vue

Locale: ja

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

### フォーム関連付け要素

フォームコントロールは ElementInternals に基づくフォーム関連付けカスタム要素です。 内では、隠し input やラッパーなしでネイティブの input と同様に振る舞います。次の要素がフォームに参加します：

 もフォーム関連付け要素です。type="submit" は requestSubmit() を通じて所属するフォームを送信し（そのため検証と submit リスナーが実行されます）、type="reset" はフォームをリセットします。既定の type は "button" で、何もしません。

### name、値、FormData

各コントロールに name を指定します。その値は  とまったく同じように、new FormData(form) とネイティブの送信に含まれます：

name は送信される値のキーです。チェックボックスとスイッチは、チェックされているときにのみ value（既定は "on"）を送信するため、同じ name を持つ複数のチェックボックスはリストになります（FormData.getAll()）。

value 属性（チェックボックスとスイッチでは checked）は初期値で、value / checked プロパティは現在の値です。複数のエントリーを送信するコントロールもあります（タグ入力はタグごとに 1 つ送信します）。各コントロールが送信する内容は、それぞれのコンポーネントのページに記載されています。

コントロール、または祖先の  に disabled を指定すると、編集できなくなり、送信と検証の対象から外れます（isDisabled はその両方を反映します）。

ユーザーがページに戻ったとき（bfcache）や自動入力の際には、フォーム関連付けのコールバックを通じてブラウザが値を復元します。

### ラベル

ネイティブの input と同様に、 や要素を囲む  がコントロールの名前になります。要素の labels プロパティにそれらが一覧され、ラベルのテキストは shadow root 内のコントロールに転送され、ラベルをクリックするとコントロールにフォーカスが移ります。要素に指定した aria-label、aria-labelledby、aria-describedby も動作します（id は shadow root を越えられないため、テキストに解決されます）。

### 制約検証

required、minlength / maxlength、pattern、min / max、type（email、url...）はネイティブの input と同様に動作します。各要素は制約検証 API（validity、validationMessage、willValidate、checkValidity()、reportValidity()、setCustomValidity()）を公開しており、form.checkValidity()、form.reportValidity()、および送信は Minerva のコントロールも考慮します。無効なコントロールがあると submit イベントはブロックされ、ブラウザがコントロールの横にメッセージを表示します。

form.reset() はすべてのコントロールを value または checked 属性の値に戻し、setCustomValidity() で設定したメッセージをクリアします。独自のエラースタイルを解除するには、フォームの reset イベントを監視してください。

### 無効なコントロールのスタイル

:invalid と :valid 疑似クラスはネイティブの input と同様にフォーム関連付け要素にもマッチするため、ページからスタイルを指定できます。ユーザーが何も操作していないうちからフィールドが赤くならないように、送信が試みられた後にスタイルを適用します：

組み込みのエラー状態はプロパティで指定します。テキストフィールド、セレクト、スイッチなどのコントロールでは invalid、チェックボックスとラジオでは error です。赤い枠線を表示し、aria-invalid を設定します。 は 1 つのコントロールをラベル、ヘルパーテキスト、エラーメッセージで囲み、invalid / required / disabled の状態をコントロールに渡します。

### ローカライズされたメッセージ

ネイティブに相当するものがないコントロール（セレクト、チェックボックス、スイッチ、ラジオグループ、評価、アップロード、時刻ピッカー、カスケーダー...）は、Minerva 独自の検証メッセージ（"Please select an item in the list."、"Please check this box if you want to proceed."...）を報告します。これらはサポートするすべての言語に翻訳されており、スコープの lang 属性または  に従います。テキストフィールドは内部のネイティブ input に委譲するため、メッセージはブラウザの言語でブラウザから提供されます。

```html
<form id="profile">
  <fieldset id="details">
    <legend>Profile</legend>

    <label for="name">Name</label>
    <minerva-input id="name" name="name" required minlength="2"></minerva-input>

    <label for="bio">Bio</label>
    <minerva-textarea id="bio" name="bio" maxlength="200"></minerva-textarea>

    <label for="role">Role</label>
    <minerva-select id="role" name="role" placeholder="Choose a role" required>
      <minerva-option value="dev">Developer</minerva-option>
      <minerva-option value="design">Designer</minerva-option>
    </minerva-select>

    <minerva-checkbox name="skills" value="ts" checked>TypeScript</minerva-checkbox>
    <minerva-checkbox name="skills" value="css">CSS</minerva-checkbox>
    <minerva-switch name="public" value="yes">Public profile</minerva-switch>
  </fieldset>

  <minerva-button type="submit">Save</minerva-button>
  <minerva-button type="reset" variant="ghost">Reset</minerva-button>
</form>
```

```ts
const form = document.querySelector("#profile");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  data.get("name"); // "Ada"
  data.getAll("skills"); // ["ts"]: unchecked boxes are not submitted
  data.get("public"); // null, or "yes" when the switch is on
});

// disable every control of the fieldset: not editable, not submitted, not validated
document.querySelector("#details").disabled = true;
```

```ts
const name = document.querySelector("#name");

name.required; // true
name.validity.valueMissing; // true while empty
name.validationMessage; // "Please fill out this field."
name.checkValidity(); // false, fires "invalid" on the element
name.reportValidity(); // same, and shows the message next to the control
form.checkValidity(); // checks the Minerva controls with the native ones

// custom rules: any non-empty message makes the control invalid
name.addEventListener("minerva-change", async () => {
  const taken = await isNameTaken(name.value);
  name.setCustomValidity(taken ? "This name is already taken." : "");
});

// form.reset(): values back to their value / checked attributes,
// custom validity cleared
form.reset();
```

```css
/* :invalid / :valid match the elements like native inputs */
form.was-validated :invalid {
  outline: 2px solid var(--danger-color);
  outline-offset: 2px;
}

/* or switch on the built-in error style (invalid; "error" on
   checkboxes and radios) once the user tried to submit */
```

```ts
// "invalid" does not bubble: listen in the capture phase
form.addEventListener("invalid", (event) => {
  form.classList.add("was-validated");
  event.target.invalid = true; // red border + aria-invalid
}, true);

form.addEventListener("minerva-change", (event) => {
  if (form.classList.contains("was-validated")) {
    event.target.invalid = !event.target.validity.valid;
  }
});
```

```html
<!-- built-in messages follow lang or <minerva-config locale> -->
<minerva-config locale="fr">
  <form>
    <minerva-select name="pays" required aria-label="Pays">…</minerva-select>
    <!-- validationMessage: "Veuillez sélectionner un élément de la liste." -->
  </form>
</minerva-config>
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
