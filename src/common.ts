export interface Breakpoints {
  medium: number;
  large: number;
}

export interface AccordionCardStyling {
  /**
   * Border color in closed state.
   */
  borderColor: string;
  /**
   * Border color in opened state.
   */
  openedBorderColor: string;
  /**
   * Border of header block when card is expanded.
   */
  openedHeaderBorderColor: string;
  /**
   * Background of header block when card is expanded.
   */
  openedHeaderBackground: string;
  /**
   * Background of header block when card is not expanded.
   */
  headerBackground: string;
  /**
   * Padding of header block.
   */
  headerPadding: string;
}

export interface MetroInfoTileStyling {
  /**
   * MetroInfoTile text color.
   */
  textColor: string;
  /**
   * MetroInfoTile background color.
   */
  background: string;
  /**
   * MetroInfoTile size (will always be square, size x size).
   */
  size: string;
}

export interface FlyoutStyling {
  /**
   * Flyout maximum width.
   */
  maxWidth: string;
  /**
   * Flyout maximum height.
   */
  maxHeight: string;
  /**
   * Flyout backgound color.
   */
  background: string;
  /**
   * Flyout text color.
   */
  textColor: string;
  /**
   * Flyout text font size.
   */
  fontSize: string;
}

export interface ButtonThemeSettings {
  /**
   * Color of a button background.
   */
  background: string;
  /**
   * Color of a hoveredbutton background.
   */
  hoverBackground: string;
  /**
   * Color of a focused button background.
   */
  focusBackground: string;
  /**
   * Color of a disabled button background.
   */
  disabledBackground: string;
  /**
   * Color of the text in a button.
   */
  text: string;
  /**
   * Color of the text in a hovered button.
   */
  hoverText: string;
  /**
   * Color of the text in a focused button.
   */
  focusText: string;
  /**
   * Color of the text in a disabled button.
   */
  disabledText: string;
  /**
   * Border of a button.
   */
  border: string;
  /**
   * Border of a hovered button.
   */
  hoverBorder: string;
  /**
   * Border of a focused button.
   */
  focusBorder: string;
  /**
   * Border of a disabled button.
   */
  disabledBorder: string;
  /**
   * Line height of a medium (default) button.
   */
  lineHeightMedium: string;
  /**
   * Line height of a small button.
   */
  lineHeightSmall: string;
}

export type PreciseThemeColors = {
  /**
   * Theme color UI0.
   */
  ui0: string;
  /**
   * Theme color UI1.
   */
  ui1: string;
  /**
   * Theme color UI2.
   */
  ui2: string;
  /**
   * Theme color UI3.
   */
  ui3: string;
  /**
   * Theme color UI4.
   */
  ui4: string;
  /**
   * Theme color UI5.
   */
  ui5: string;
  /**
   * Theme color UI6.
   */
  ui6: string;
  /**
   * Theme color UI7.
   */
  ui7: string;
  /**
   * Theme color UI8.
   */
  ui8: string;
  /**
   * Theme color TEXT0.
   */
  text0: string;
  /**
   * Theme color TEXT1.
   */
  text1: string;
  /**
   * Theme color TEXT2.
   */
  text2: string;
  /**
   * Theme color TEXT3.
   */
  text3: string;
  /**
   * Theme color TEXT4.
   */
  text4: string;
  /**
   * Theme color TEXT5.
   */
  text5: string;
  /**
   * Theme color TEXT6, which is the color of ordinary text.
   */
  text6: string;
  /**
   * Theme color TEXT7.
   */
  text7: string;
};

export interface PreciseFullTheme extends PreciseThemeColors {
  /**
   * Padding for accordion items header.
   */
  accordionPadding: string;
  /**
   * Padding for accordion items content.
   */
  accordionContentPadding: string;
  /**
   * Accordion bottom border definition.
   */
  accordionLine: string;
  /**
   * Colors of the primary button.
   */
  buttonPrimary: ButtonThemeSettings;
  /**
   * Colors of the secondary button.
   */
  buttonSecondary: ButtonThemeSettings;
  /**
   * Position of the icon when place inside a button.
   */
  buttonIconPosition: 'left' | 'right';
  /**
   * Primary color to use.
   */
  primary: string;
  /**
   * Secondary color to use.
   */
  secondary: string;
  /**
   * Color of disabled text.
   */
  textDisabled: string;
  /**
   * Color of a disabled input background.
   */
  inputDisabled: string;
  /**
   * Color of an input error.
   */
  inputError: string;
  /**
   * Colors to be used cyclically.
   */
  colorCycle: Array<string>;
  /**
   * General font family to use.
   */
  fontFamily: string;
  /**
   * Padding for headings h1-h6.
   */
  headingsPadding: string;
  /**
   * Table border.
   */
  tableBorder: string;
  /**
   * Layout for the table.
   */
  tableLayout: string;
  /**
   * Padding value for table header row.
   */
  tableHeadPadding: string;
  /**
   * Background color for ZeissletCard tags.
   */
  tagBackground: string;
  /**
   * Font color for ZeissletCard tags.
   */
  tagColor: string;
  /**
   * The color of the badge.
   */
  badgeColor: string;
  /**
   * The background of the badge.
   */
  badgeBackground: string;
  /**
   * The background of the Toggle Head.
   */
  toggleHeadBackground: string;
  /**
   * The background of the active Toggle Head.
   */
  toggleHeadActiveBackground: string;
  /**
   * Breakpoint values for the responsive design.
   */
  breakpoints: Breakpoints;
  /**
   * Color of not specified notification,
   */
  notificationColorNone: string;
  /**
   * Color of success notification,
   */
  notificationColorSuccess: string;
  /**
   * Color of info notification,
   */
  notificationColorInfo: string;
  /**
   * Color of warning notification,
   */
  notificationColorWarning: string;
  /**
   * Color of error notification,
   */
  notificationColorError: string;
  /**
   * Notification padding.
   */
  notificationPadding: string;
  /**
   * Notification box shadow.
   */
  notificationBoxShadow: string;
  /**
   * Notification border width.
   */
  notificationBorderWidth: string;
  /**
   * Notification title font size.
   */
  notificationTitleFontSize: string;
  /**
   * Notification title line height.
   */
  notificationTitleLineHeight: string;
  /**
   * Notification text font size.
   */
  notificationTextFontSize: string;
  /**
   * Notification text line height.
   */
  notificationTextLineHeight: string;
  /**
   * Notification icon margin right.
   */
  notificationIconMarginRight: string;
  /**
   * Specific Flyout theme settings.
   */
  flyout: FlyoutStyling;
  /**
   * Specific MetroInfoTile theme settings.
   */
  metroInfoTile: MetroInfoTileStyling;
  /**
   * Specific AccordionCard theme settings.
   */
  accordionCard: AccordionCardStyling;
}

export type PreciseTheme = { [T in keyof PreciseFullTheme]?: Partial<PreciseFullTheme[T]> };

export interface StandardProps {
  /**
   * Places the given class on the element.
   */
  className?: string;
  /**
   * An optional theme which can be passed down to a component.
   */
  theme?: PreciseTheme;
  /**
   * The style prop for explicitly overriding some CSS styles.
   */
  style?: React.CSSProperties;
}

export interface InputChangeEvent<T> {
  /**
   * The current value of the input field.
   */
  value: T;
}

export interface InputProps<T> extends StandardProps {
  /**
   * Sets the component as disabled.
   */
  disabled?: boolean;
  /**
   * The current value of the input, leading to a controlled field.
   */
  value?: T;
  /**
   * The initial value of the input.
   */
  defaultValue?: T;
  /**
   * Event emitted once the value changes due to user input.
   */
  onChange?(e: InputChangeEvent<T>): void;
  /**
   * Event triggered once the input gets focused.
   */
  onFocus?(): void;
  /**
   * Event triggered once the input loses the focus.
   */
  onBlur?(): void;
  /**
   * Event triggered when a key was pressed.
   */
  onInput?(): void;
  /**
   * Optional name if to be used within a form context.
   */
  name?: string;
  /**
   * Displays the error message below the input.
   */
  error?: React.ReactChild;
  /**
   * Displays the info message below the input. Only applies if
   * no error is to be shown.
   */
  info?: React.ReactChild;
  /**
   * Sets if the input should immediately receive focus.
   */
  autoFocus?: boolean;
  /**
   * Sets the autocomplete mode of the input.
   */
  autoComplete?: 'on' | 'off';
}

export interface LabeledInputProps<T> extends InputProps<T> {
  /**
   * Sets the text of label.
   * @default ''
   */
  label?: React.ReactChild;
  /**
   * A hint to the user of what can be entered in the control.
   * The placeholder text must not contain carriage returns or line-feeds.
   * @default ''
   */
  placeholder?: string;
}

export interface TextInputProps extends LabeledInputProps<string> {
  /**
   * Removes the border of the text field.
   * @default false
   */
  borderless?: boolean;
  /**
   * Sets the optional prefix of the input to show (e.g., "http://").
   * @default null
   */
  prefix?: React.ReactChild;
  /**
   * Sets the optional suffix of the input to show (e.g., "EUR").
   * @default null
   */
  suffix?: React.ReactChild;
  /**
   * Sets an optional default icon (if any) to use when no error or
   * clearable is given.
   */
  icon?: React.ReactChild;
}

export interface RefProps {
  /**
   * Callback to be used to get the referenced DOM node.
   * @param node The node that is used.
   */
  innerRef?(node: HTMLElement | null): void;
}

export type ScreenSize = 'small' | 'smallAndMedium' | 'medium' | 'mediumAndLarge' | 'large';

// Helper type operators
export type KeyofBase = keyof any;
export type Diff<T extends KeyofBase, U extends KeyofBase> = ({ [P in T]: P } &
  { [P in U]: never } & { [x: string]: never })[T];
export type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;
export type Component<P> = React.ComponentClass<P> | React.StatelessComponent<P>;
