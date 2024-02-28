/**
 * @description ⚠️：此文件仅供主题插件使用，请不要在此文件中导出别的工具函数（仅在页面加载前运行）
 */

import {type multipleScopeVarsOptions} from "@pureadmin/theme";

/** 预设主题色 */
const themeColors = {
  default: {
    subMenuActiveText: "#fff",
    menuBg: "#304156",
    menuHover: "#4091f7",
    subMenuBg: "#0f2e47",
    subMenuActiveBg: "#4091f7",
    menuText: "rgb(254 254 254 / 65%)",
    sidebarLogo: "#304156",
    menuTitleHover: "#fff",
    menuActiveBefore: "#4091f7"
  },
  light: {
    subMenuActiveText: "#409eff",
    menuBg: "#fff",
    menuHover: "#e0ebf6",
    subMenuBg: "#fff",
    subMenuActiveBg: "#e0ebf6",
    menuText: "#7a80b4",
    sidebarLogo: "#fff",
    menuTitleHover: "#000",
    menuActiveBefore: "#4091f7"
  },
  dusk: {
    subMenuActiveText: "#fff",
    menuBg: "#e3a0a6",
    menuHover: "#e36563",
    subMenuBg: "rgba(194,192,192,0.5)",
    subMenuActiveBg: "#e36563",
    menuText: "rgb(254 254 254 / 65.1%)",
    sidebarLogo: "#e3a0a6",
    menuTitleHover: "#fff",
    menuActiveBefore: "#e36563"
  },
  volcano: {
    subMenuActiveText: "#fff",
    menuBg: "#e98c66",
    menuHover: "#e85f33",
    subMenuBg: "rgba(194,192,192,0.5)",
    subMenuActiveBg: "#e85f33",
    menuText: "rgb(254 254 254 / 65%)",
    sidebarLogo: "#e98c66",
    menuTitleHover: "#fff",
    menuActiveBefore: "#e85f33"
  },
  yellow: {
    subMenuActiveText: "#d25f00",
    menuBg: "#e2d587",
    menuHover: "#f6da4d",
    subMenuBg: "rgba(194,192,192,0.5)",
    subMenuActiveBg: "#f6da4d",
    menuText: "rgb(254 254 254 / 65%)",
    sidebarLogo: "#e2d587",
    menuTitleHover: "#fff",
    menuActiveBefore: "#f6da4d"
  },
  mingQing: {
    subMenuActiveText: "#fff",
    menuBg: "#80aeae",
    menuHover: "#61d9d9",
    subMenuBg: "rgba(194,192,192,0.5)",
    subMenuActiveBg: "#59bfc1",
    menuText: "#7a80b4",
    sidebarLogo: "#80aeae",
    menuTitleHover: "#fff",
    menuActiveBefore: "#61d9d9"
  },
  auroraGreen: {
    subMenuActiveText: "#fff",
    menuBg: "#547248",
    menuHover: "#738d6b",
    subMenuBg: "rgba(45,45,45,0.5)",
    subMenuActiveBg: "#738d6b",
    menuText: "#fff",
    sidebarLogo: "#547248",
    menuTitleHover: "#fff",
    menuActiveBefore: "#738d6b"
  },
  pink: {
    subMenuActiveText: "#d84493",
    menuBg: "#e284ba",
    menuHover: "#d84493",
    subMenuBg: "rgba(194,192,192,0.5)",
    subMenuActiveBg: "#d84493",
    menuText: "#fff",
    sidebarLogo: "#e284ba",
    menuTitleHover: "#fff",
    menuActiveBefore: "#d84493"
  },
  saucePurple: {
    subMenuActiveText: "#693ac9",
    menuBg: "#876ac2",
    menuHover: "#693ac9",
    subMenuBg: "#2d2d2d",
    subMenuActiveBg: "#693ac9",
    menuText: "#fff",
    sidebarLogo: "#876ac2",
    menuTitleHover: "#fff",
    menuActiveBefore: "#693ac9"
  }
};

/**
 * @description 将预设主题色处理成主题插件所需格式
 */
export const genScssMultipleScopeVars = (): multipleScopeVarsOptions[] => {
  const result = [] as multipleScopeVarsOptions[];
  Object.keys(themeColors).forEach(key => {
    result.push({
      scopeName: `layout-theme-${key}`,
      varsContent: `
        $subMenuActiveText: ${themeColors[key].subMenuActiveText} !default;
        $menuBg: ${themeColors[key].menuBg} !default;
        $menuHover: ${themeColors[key].menuHover} !default;
        $subMenuBg: ${themeColors[key].subMenuBg} !default;
        $subMenuActiveBg: ${themeColors[key].subMenuActiveBg} !default;
        $menuText: ${themeColors[key].menuText} !default;
        $sidebarLogo: ${themeColors[key].sidebarLogo} !default;
        $menuTitleHover: ${themeColors[key].menuTitleHover} !default;
        $menuActiveBefore: ${themeColors[key].menuActiveBefore} !default;
      `
    } as multipleScopeVarsOptions);
  });
  return result;
};
