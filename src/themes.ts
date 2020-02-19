import * as colors from './colors';
import {
  Breakpoints,
  PreciseFullTheme,
  ButtonThemeSettings,
  FlyoutStyling,
  MetroInfoTileStyling,
  AccordionCardStyling,
  ActionButtonThemeSettings,
} from './common';
import { distance } from './distance';
import { remCalc } from './utils/remCalc';

const colorCycle = [
  colors.indigo,
  colors.green,
  colors.orangeNeon,
  colors.brightLemon,
  colors.cyan,
  colors.grey1,
  colors.orange,
  colors.azur,
  colors.purpleRed,
  colors.greenNeon,
];

export const breakpoints: Breakpoints = {
  medium: 740, // tablet
  large: 980, // desktop
  xLarge: 1200, // hd desktop
  max: 1800, // full hd desktop
};

export const buttonPrimary: ButtonThemeSettings = {
  background: colors.cyan,
  hoverBackground: colors.ocean,
  focusBackground: colors.midnight,
  disabledBackground: colors.pinkSwan,
  text: colors.white,
  hoverText: colors.white,
  focusText: colors.white,
  disabledText: colors.white,
  border: 'none',
  hoverBorder: 'none',
  focusBorder: 'none',
  disabledBorder: 'none',
  lineHeightMedium: '22px',
  lineHeightSmall: '18px',
};

export const buttonSecondary: ButtonThemeSettings = {
  background: colors.white,
  hoverBackground: colors.white,
  focusBackground: colors.white,
  disabledBackground: colors.white,
  text: colors.cyan,
  hoverText: colors.ocean,
  focusText: colors.midnight,
  disabledText: colors.pinkSwan,
  border: `1px solid ${colors.cyan}`,
  hoverBorder: `1px solid ${colors.ocean}`,
  focusBorder: `1px solid ${colors.midnight}`,
  disabledBorder: `1px solid ${colors.pinkSwan}`,
  lineHeightMedium: '20px',
  lineHeightSmall: '16px',
};

export const actionButtonWarning: ActionButtonThemeSettings = {
  iconBackground: colors.purpleRed,
  hoverIconBackground: colors.purpleRed5,
  focusIconBackground: colors.purpleRed6,
};

export const flyout: FlyoutStyling = {
  maxHeight: '600px',
  maxWidth: '300px',
  background: colors.white,
  textColor: colors.black,
  fontSize: remCalc('16px'),
};

export const metroInfoTile: MetroInfoTileStyling = {
  textColor: colors.white,
  background: colors.azur,
  size: '150px',
};

export const accordionCard: AccordionCardStyling = {
  borderColor: colors.lighterGray,
  openedBorderColor: colors.tuna,
  openedHeaderBorderColor: colors.tuna,
  openedHeaderBackground: colors.whiterSmoke,
  headerBackground: colors.white,
  headerPadding: distance.medium,
};

export const light: PreciseFullTheme = {
  flyout,
  metroInfoTile,
  accordionCard,
  ui0: colors.cyan,
  ui1: colors.white,
  ui2: colors.whiterSmoke,
  ui3: colors.whiteSmoke,
  ui4: colors.lighterGray,
  ui5: colors.tuna,
  ui6: colors.ocean,
  ui7: colors.midnight,
  ui8: colors.skyBlue,
  text0: colors.cyan,
  text1: colors.eclipse,
  text2: colors.charcoal,
  text3: colors.pinkSwan,
  text4: colors.white,
  text5: colors.darkGray,
  text6: colors.black,
  text7: colors.white,
  buttonPrimary,
  buttonSecondary,
  actionButtonWarning,
  buttonIconPosition: 'right',
  primary: colors.pacificBlue,
  secondary: colors.lighterGray,
  textDisabled: colors.pinkSwan,
  inputDisabled: colors.whiterSmoke,
  inputError: colors.purpleRed,
  colorCycle,
  headingsPadding: '0 0 0.5rem 0',
  tagBackground: colors.darkGray,
  tagColor: colors.black,
  toggleHeadBackground: colors.brightBlue,
  toggleHeadActiveBackground: colors.azur,
  breakpoints,
  accordionLine: `1px solid ${colors.lighterGray}`,
  accordionPadding: `${distance.medium}`,
  accordionContentPadding: `${distance.small} ${distance.medium} ${distance.xlarge} ${remCalc('50px')}`,
  fontFamily: 'inherit',
  tableBorder: `1px solid ${colors.lighterGray}`,
  tableLayout: 'auto',
  tableHeadPadding: `${distance.medium} ${distance.large}`,
  badgeColor: 'orange',
  badgeBackground: 'white',
  notificationColorNone: colors.tuna,
  notificationColorSuccess: colors.lightGreen,
  notificationColorInfo: colors.cyan,
  notificationColorWarning: colors.brightLemon,
  notificationColorError: colors.purpleRed,
  notificationPadding: `${distance.small} ${distance.medium}`,
  notificationBorderWidth: `1px 1px 1px 5px`,
  notificationBoxShadow: `0 4px 8px 0 rgba(0, 0, 0, 0.1)`,
  notificationTitleFontSize: remCalc('16px'),
  notificationTitleLineHeight: `22px`,
  notificationTextFontSize: remCalc('16px'),
  notificationTextLineHeight: `22px`,
  notificationIconMarginRight: distance.medium,
  highlightColor: colors.brightLemon,
};
