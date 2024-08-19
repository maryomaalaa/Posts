import { I18n } from "i18next";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $t: I18n["t"];
  }
}
