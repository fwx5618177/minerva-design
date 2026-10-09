import { useTranslation } from "react-i18next";
import CodeBlock from "@layout/CodeBlock";
import styles from "@/docs/components/docs.module.scss";

const examples = [
  {
    id: "angular",
    language: "ts",
    code: `import { Component } from '@angular/core';
import { MnButton, MnSwitch, MnModal, provideMinerva } from 'minerva-design/angular';
import 'minerva-design/style.css';

@Component({
  standalone: true,
  imports: [MnButton, MnSwitch, MnModal],
  template: '<button mnButton (click)="open = true">Save</button><mn-modal [(open)]="open" title="Saved" />',
})
export class Example { open = false; }

// app.config.ts (bootstrap providers)
export const appConfig = { providers: [provideMinerva()] };`,
  },
  {
    id: "taro",
    language: "tsx",
    code: `import { useState } from 'react';
import { View, Text } from '@tarojs/components';
import { Button, Input, Switch, miniTokenClassNames } from 'minerva-design/taro';
import 'minerva-design/tokens.mini.css';
import 'minerva-design/taro/style.css';

export default function Example() {
  const [name, setName] = useState('');
  const [saved, setSaved] = useState('');
  const [checked, setChecked] = useState(false);
  return <View className={miniTokenClassNames()}>
    <Input value={name} onChange={setName} placeholder="Name" />
    <Switch checked={checked} onChange={setChecked} />
    <Button disabled={!name} onClick={() => setSaved(name)}>Save</Button>
    <Text>{saved}</Text>
  </View>;
}`,
  },
  {
    id: "uni",
    language: "html",
    code: `<script setup lang="ts">
import { ref } from 'vue';
import { Button, Input, Switch, miniTokenClassNames } from 'minerva-design/uni';
import 'minerva-design/tokens.mini.css';
import 'minerva-design/uni/style.css';
const name = ref('');
const saved = ref('');
const checked = ref(false);
</script>
<template>
  <view :class="miniTokenClassNames()">
    <Input v-model="name" placeholder="Name" />
    <Switch v-model:checked="checked" />
    <Button :disabled="!name" @click="saved = name">Save</Button>
    <text>{{ saved }}</text>
  </view>
</template>`,
  },
  {
    id: "weapp",
    language: "json",
    code: `{
  "usingComponents": {
    "mn-button": "minerva-design/button/index",
    "mn-input": "minerva-design/input/index",
    "mn-switch": "minerva-design/switch/index"
  }
}`,
  },
  {
    id: "weapp-events",
    language: "html",
    code: `<!-- After npm install and Build npm in WeChat DevTools -->
<view class="mn-root">
  <mn-input value="{{name}}" bind:change="onName" />
  <mn-switch checked="{{checked}}" bind:change="onChecked" />
  <mn-button label="Save" loading="{{saving}}" bind:click="onSave" />
</view>
<!-- app.wxss: @import "./miniprogram_npm/minerva-design/tokens.wxss"; -->`,
  },
  {
    id: "weapp-page",
    language: "js",
    code: `Page({
  data: { name: '', checked: false, saving: false },
  onName(event) { this.setData({ name: event.detail.value }); },
  onChecked(event) { this.setData({ checked: event.detail.checked }); },
  onSave() { wx.showToast({ title: this.data.name || "Saved", icon: "none" }); }
});`,
  },
];
export default function PlatformQuickStart() {
  const { t } = useTranslation();
  return (
    <section className={styles.section} aria-labelledby="native-start">
      <h2 id="native-start">{t("docs.platform-support.quickStartTitle")}</h2>
      <p className={styles.prose}>
        {t("docs.platform-support.quickStartText")}
      </p>
      {examples.map((example) => (
        <CodeBlock
          key={example.id}
          code={example.code}
          language={example.language}
          title={example.id}
        />
      ))}
    </section>
  );
}
