import React from "react";
import { RouterProvider } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { ConfigProvider } from "@minerva/lib-core";
import i18n from "@i18n/config";
import router from "./router";
import { ThemeModeProvider } from "./theme/ThemeModeContext";

const App: React.FC = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeModeProvider>
        {(resolvedTheme) => (
          <ConfigProvider theme={resolvedTheme}>
            <RouterProvider router={router} />
          </ConfigProvider>
        )}
      </ThemeModeProvider>
    </I18nextProvider>
  );
};

export default App;
