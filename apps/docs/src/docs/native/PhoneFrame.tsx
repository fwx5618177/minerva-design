// A phone mockup for the React Native previews: bezel, status bar, a
// scrollable screen (the app content, through react-native-web) and the
// host of the RN modals (dialogs, sheets), all clipped to the screen.
import React, { useState } from "react";
import { MinervaProvider } from "minerva-design/native";
import { useThemeMode } from "@/theme/ThemeModeContext";
import { ModalHostContext } from "./modalHost";
import styles from "./phone.module.scss";

/** Status bar and home indicator heights: the safe-area insets of the preview */
const INSETS = { top: 44, bottom: 20, left: 0, right: 0 };

export interface PhoneFrameProps {
  /** Accessible name of the preview */
  label: string;
  children: React.ReactNode;
}

const PhoneFrame: React.FC<PhoneFrameProps> = ({ label, children }) => {
  const { resolved, palette } = useThemeMode();
  const [host, setHost] = useState<HTMLElement | null>(null);
  const dark = resolved !== "light";
  return (
    <figure
      className={styles.phone}
      data-dark={dark || undefined}
      aria-label={label}
    >
      <div className={styles.screen}>
        <div className={styles.statusBar} aria-hidden>
          <span>9:41</span>
          <span className={styles.notch} />
          <span className={styles.battery} />
        </div>
        <MinervaProvider
          theme={dark ? "dark" : "light"}
          palette={palette === "default" ? undefined : palette}
          insets={INSETS}
        >
          <ModalHostContext.Provider value={host}>
            <div className={styles.content} data-native-screen="">
              {children}
            </div>
          </ModalHostContext.Provider>
        </MinervaProvider>
        <div ref={setHost} className={styles.modalHost} />
        <div className={styles.homeIndicator} aria-hidden />
      </div>
    </figure>
  );
};

export default PhoneFrame;
