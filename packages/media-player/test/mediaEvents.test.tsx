// @vitest-environment happy-dom
import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MediaPlayer } from "../src";

afterEach(cleanup);

describe("media errors", () => {
  it.each([false, true])(
    "uses the native MediaError with custom chrome = %s",
    (customChrome) => {
      const onError = vi.fn();
      const { container } = render(
        <MediaPlayer
          src="clip.mp4"
          onError={onError}
          renderChrome={customChrome ? () => null : undefined}
        />,
      );
      const video = container.querySelector("video")!;
      fireEvent.error(video);
      expect(onError).not.toHaveBeenCalled();
      Object.defineProperty(video, "error", {
        configurable: true,
        value: { code: 3 },
      });
      fireEvent.error(video);
      expect(onError).toHaveBeenCalledOnce();
      expect(onError.mock.calls[0]?.[0]).toMatchObject({ code: "decode" });
    },
  );
});
