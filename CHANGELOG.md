# Precise UI Changelog

## 1.4.1

- Fix compatibility issue with improvements on SearchField

## 1.4.0

- Improve documentation of breakpoint types
- Add trigger mode `manual` for `SearchField`
- Removing clearable from Autocomplete docs

## 1.3.0

- Update `Form` component to receive `prompt` prop as component
- Add custom dialog for `Prompt` component

## 1.2.0

- Add the ability to clean datetimepicker

## 1.1.4

- Add ability to display the files list under the File Uploader

## 1.1.3

- Add new icons

## 1.1.2

- Fix TagBuilder not deleting tags properly with backspace (#223)

## 1.1.1

- Added new theme object `actionButtonWarning`

## 1.1.0

- Add `borderless` and `tagRenderer` props to AutocompleteTagBuilder
- Remove refocus of component(Autocomplete) on every value change, remove corresponding test
- Enable `date-fns` tree-shaking

## 1.0.2
- Fix opening file selection of `FileUploader` for single file upload (#243)

## 1.0.1

- Fix opening `UploaderProgressDetails` behind modal in IE (#225)

## 1.0.0

- Bumped Precise UI to major version 1. From now on, Precise UI follows **semver** guidelines.
- Fix Accordion not responding when defaultSelectedIndex is set

## 0.8.3

- Added `Skeleton` component
- Added onBeforeClose event to Modal
- Added appendTagOnBlur prop to TagBuilder
- Added onSort callback to Table
- Fixed(Tag): Theming of tag component (#190)
- Allow themeing of icon of notification component
- Fixed: Integration tests are always executed if repository is stored in a location with `src` in it's path
- Fixed `Autocomplete` that blocked `InteractiveList` automatic position determination
- Fixed `InteractiveList` position in `Autocomplete` component
- Replaced `forEach` with `Array.from` in `ContentSwitchInt` to fix displaying content switch for IE 11
- Fixed(Blocker): Closing modal when using scrollbars (#203)
- Fixed: DropdownMenu list has no width when expanded on IE11 (#201)
- Fix(Accordion): header strips spaces when html tags are used
- Fixed missing onDataClick handler for Table component in mobile view (#214)
- Add Material Icons: 'Build', 'ViewCarousel', 'MailOutline', 'LabelOutline', 'Unarchive'
- Add new Icons to match design system

## 0.8.2

- Updated `date-fns` dependency.
- Fixed `InteractiveList` examples
- Fixed truncation of long text in the `InteractiveList` for IE 11
- Fixed regular expression for Babel in Webpack
- Fixed Datepicker controlled mode issues
- Fixed hiding suggestion list of `Autocomplete` after selection for IE 11

## 0.8.1

- Fixed: Tooltip blinking when hovering border (#167)
- Removed deprecated screen sizes smallAndMedium, mediumAndLarge
- Exporting types from date-picker by using it as a dependency

## 0.8.0

- Implement new breakpoints and screen sizes
- Removed `SASS` support
- Fixed: Modal closes on drag and release cursor outside modal (#152)
- Improved `Responsive` component to avoid using of combined screen sizes
- Fixed(DateField): Use valid date format as a default  - `yyyy-MM-dd` instead of `dd-MM-yyyy`
- Fixed(Modal): Remove usage of [tabindex] attribute for closing the modal

## 0.7.1

- Fixed label ellipsis shown at incorrect position

## 0.7.0

- Fixed horizontal padding for InputInfo and InputError
- Hide info element on open Autocomplete list
- Fixed overview pagination elements' layout in IE 11
- Fixed display of label, placeholder and info on AutocompleteTagBuilder
- Fixed toaster action click area
- Fixed two cross(clear) buttons displayed inside TextField in IE 11
- Fixed `Styled Input Box` flex layout for IE 11
- Fixed `FileUploader` background blocking area
- New `DateField`
- Show FileUploader on top of modal
- Improved `AccordionTable` sorting (empty groups)

## 0.6.2

- Fixed notification overflow in IE11
- Fixed Carousel component to make carousel item clickable

## 0.6.1

- Added Gitter badge
- Fixed security vulnerabilities
- Removed unneeded packages
- Fixed notification overflow in IE11

## 0.6.0

- Implement tag builder with auto-completion possibility
- `Flyout` fixed compatibility with IE11
- `Headline` styles update
- Updated label in `Modal`
- Added new icons
- Remove disabled attribute from HTML element of `InteractiveSurface`
- Bugfix: Close `DropdownField` if other one was opened (#44)
- Bugfix: Fixed crash of `Rating` component (#69)
- Added `onChangeDone` event to `Slider` component
- Added `validationRules` for `Form`
- Fixed: missed selection state of `RadioButtonGroup` in non-controlled mode with form context.
- Compatibility with IE11
- `Sidebar` component added
- Fixed: component wrapped with `withValidation` hoc didn't display an error
- Feature: new Dropdown props (open / direction)

## 0.5.0

- Initial release
