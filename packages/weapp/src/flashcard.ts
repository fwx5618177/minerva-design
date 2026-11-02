// Flashcard of the native WeChat build: a two-sided study card that flips
// between a front (prompt) and a back (answer) with a CSS 3D rotation. Tap
// the card to flip it; the faces are the `front` / `back` slots (or the
// plain-text `front` / `back` properties) and the `footer` slot sits below
// the card (not flipped).
import { nativeTranslate } from "./configuration";

type Instance = Pick<
  WechatMiniprogram.Component.TrivialInstance,
  "data" | "setData" | "triggerEvent"
>;
const flag = (value = false) => ({ type: Boolean, value });
const text = (value = "") => ({ type: String, value });

/** `minHeight` as CSS: numbers (and numeric strings) are px */
const cssLength = (value: unknown) =>
  typeof value === "number" || /^\d+(\.\d+)?$/.test(String(value))
    ? `${value}px`
    : String(value || "12rem");

function sync(self: Instance) {
  if (!self.data.initialized) {
    self.setData({
      initialized: true,
      localFlipped: Boolean(self.data.defaultFlipped),
    });
  }
  const flipped: boolean =
    self.data.flipped === null || self.data.flipped === undefined
      ? self.data.localFlipped
      : Boolean(self.data.flipped);
  const caption = (value: unknown, key: string) =>
    value === null || value === undefined
      ? nativeTranslate(self, key)
      : String(value);
  const front = caption(self.data.frontLabel, "flashcard.frontLabel");
  const back = caption(self.data.backLabel, "flashcard.backLabel");
  const face =
    (flipped ? back : front) ||
    nativeTranslate(
      self,
      flipped ? "flashcard.backLabel" : "flashcard.frontLabel",
    );
  self.setData({
    current: flipped,
    minHeightStyle: cssLength(self.data.minHeight),
    labels: {
      front,
      back,
      hint: self.data.hint || nativeTranslate(self, "flashcard.hint"),
      card:
        self.data.ariaLabel ||
        nativeTranslate(self, "flashcard.label", { face }),
    },
  });
}

export const flashcardTemplate = `<view class="mn-flashcard mn-variant-{{variant}} mn-size-{{size}} {{axis === 'x' ? 'mn-axis-x' : ''}} {{current ? 'mn-flipped' : ''}} {{disabled ? 'mn-disabled' : ''}}" style="--flashcard-min-height: {{minHeightStyle}}"><view class="mn-flashcard__card {{flipOnClick ? 'mn-interactive' : ''}}" role="{{flipOnClick ? 'button' : 'group'}}" aria-pressed="{{flipOnClick ? current : ''}}" aria-disabled="{{flipOnClick && disabled}}" aria-label="{{labels.card}}" bindtap="onFlip"><view class="mn-flashcard__inner"><view class="mn-flashcard__face mn-flashcard__front {{current ? 'mn-hidden-face' : ''}}" aria-hidden="{{current}}"><text wx:if="{{labels.front}}" class="mn-flashcard__label">{{labels.front}}</text><view class="mn-flashcard__content"><text wx:if="{{front}}">{{front}}</text><slot name="front"/></view><text wx:if="{{showHint && flipOnClick && labels.hint}}" class="mn-flashcard__hint">{{labels.hint}}</text></view><view class="mn-flashcard__face mn-flashcard__back {{current ? '' : 'mn-hidden-face'}}" aria-hidden="{{!current}}" aria-live="polite"><text wx:if="{{labels.back}}" class="mn-flashcard__label">{{labels.back}}</text><view class="mn-flashcard__content"><text wx:if="{{back}}">{{back}}</text><slot name="back"/></view></view></view></view><view class="mn-flashcard__footer"><slot name="footer"/></view></view>`;

export const flashcardProperties = {
  front: text(),
  back: text(),
  frontLabel: { type: null, value: null },
  backLabel: { type: null, value: null },
  hint: text(),
  showHint: flag(),
  flipped: { type: null, value: null },
  defaultFlipped: flag(),
  flipOnClick: flag(true),
  disabled: flag(),
  axis: text("y"),
  variant: text("elevated"),
  size: text("medium"),
  minHeight: { type: null, value: "12rem" },
  ariaLabel: text(),
};

export const flashcardMethods = {
  onFlip(this: Instance) {
    if (!this.data.flipOnClick || this.data.disabled) return;
    const next = !this.data.current;
    if (this.data.flipped === null || this.data.flipped === undefined)
      this.setData({ localFlipped: next });
    this.triggerEvent("flippedchange", { flipped: next });
    sync(this);
  },
};

export const flashcardExtra = {
  data: {
    initialized: false,
    localFlipped: false,
    current: false,
    minHeightStyle: "12rem",
    labels: {},
  },
  observers: {
    "flipped,defaultFlipped,frontLabel,backLabel,hint,minHeight,ariaLabel,localeLanguage":
      function (this: Instance) {
        sync(this);
      },
  },
  lifetimes: {
    attached(this: Instance) {
      sync(this);
    },
  },
};
