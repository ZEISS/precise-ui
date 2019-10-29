# Precise UI Changelog

## 0.8.3

- `Skeleton` component added
- Added onBeforeClose event to Modal
- Added appendTagOnBlur prop to TagBuilder
- Added onSort callback to Table
- Allow themeing of icon of notification component

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
