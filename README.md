# <img src="docs/assets/precise-logo.svg" width="240">

[![Website Build status](https://dev.azure.com/ZEISSgroup/SIP_UI_Library/_apis/build/status/Precise-CI)](https://dev.azure.com/ZEISSgroup/SIP_UI_Library/_build/latest?definitionId=1106)
[![Package Build Status](https://travis-ci.org/ZEISS/precise-ui.svg?branch=master)](https://travis-ci.org/ZEISS/precise-ui)
[![NPM](https://img.shields.io/npm/v/precise-ui.svg)](https://www.npmjs.com/package/precise-ui)
[![Node](https://img.shields.io/node/v/precise-ui.svg)](https://www.npmjs.com/package/precise-ui)
[![GitHub Tag](https://img.shields.io/github/tag/ZEISS/precise-ui.svg)](https://github.com/ZEISS/precise-ui/releases)
[![GitHub Issues](https://img.shields.io/github/issues/ZEISS/precise-ui.svg)](https://github.com/ZEISS/precise-ui/issues)
[![CLA Assistant](https://cla-assistant.io/readme/badge/ZEISS/precise-ui)](https://cla-assistant.io/ZEISS/precise-ui)
[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/ZEISS/precise-ui)

A complete opinionated React component library with minimal dependencies powered by ZEISS.

The UI component library contains both, very low-level design elements as well as combined high-level design elements. In general, the intention of the library is to simplify development by exposing components that satisfy design specifications and provide ease of programming. Repeatable UI designs should therefore only take minutes instead of hours.

See [https://precise-ui.io](https://precise-ui.io) for our kitchen sink (i.e., demo page illustrating all the components incl. their documentation).

## Getting Started

Basically, common usage should be implicit while flexibility is provided by explicit statements. As such we aim for (opinionated) simplicity, while being able to customize as much as possible. Even though the standard design is pretty much set for our own primary target, we want to achieve full freedom in that area. For this reason we are constantly improving how we do theming and how to expose components to enable any sort of customization that may be desired.

Precise UI can be easily integrated in your frontend project by using npm or yarn. To start using it, please follow the instructions below:

### Installation

1. Firstly, you have to install it:

```sh
npm i precise-ui
```

or alternatively, using yarn

```sh
yarn add precise-ui
```

2. Then, make sure that you have also all peer dependencies installed:

```sh
npm i react styled-components
```

### Usage

Everything ready, now you can start importing precise-ui componenets.

```jsx
import { TextField } from 'precise-ui';

<TextField label="Label" />
```

You can see a list of all available components on our [website](https://precise-ui.io/).

## Contributing

Everyone is welcome to make any contribution on Precise UI. However, before you start, make sure you read our [Contribution](/.github/CONTRIBUTING.md) instructions.

If you feel uncertain whether you should contribute or not maybe our [code of conduct](CODE_OF_CONDUCT.md) can help you.

### Issues & Support

If you have any usage and general questions, you are welcome to ask a question on **Stack Overflow** using the tag `precise-ui`, and you will receive help as soon as possible.

Also, when creating a new Issue here, please use one of the provided templates:

- [Bug Report](https://github.com/ZEISS/precise-ui/issues/new?template=bugs.md)
- [Feature Proposal](https://github.com/ZEISS/precise-ui/issues/new?template=features.md)

### Development

The following sections guide you through the process of developing Precise UI.

#### Installation

For development you will need NPM and Node.js 8+. After cloning the repository install all dependencies via

```sh
npm install
```

Here is a quick example to get you started. All you need is to run:

```sh
npm start
```

As a result this will start the development server running the kitchen sink (our demo application), which runs locally and can be reached via [localhost:6060](http://localhost:6060). Note: this port can be changed. The available page contains all included components and some hopefully useful documentation for these.

#### Versioning

Incrementing the version can be done via `npm` as well.

```sh
npm version
```

This will show the current version and ask for a new version. As a result the information in the package.json is updated. Additionally, a git tag is created with the information (automatically prefixed using a "v"). The process could also be automated, e.g., by specifying the new version directly. So, for instance if our new version is "1.2.3" we just use the following command:

```sh
npm version --new-version 1.2.3
```

#### Conventions

We do not use default exports. Instead, every export should be named properly. For components, the name of the export equals the name of its file or folder.

**Folders**

Every exposed main component has to be placed in its own folder below `components`. Components placed in `*.part.tsx` files are considered internal components only created for providing some (necessary) internal structure.

Every exposed design helper component has to be placed in a file in the `quarks` folder. Design helpers do start with a `Styled` prefix, just like plain styled components should be.

Any higher-order component (HOC) should be located in the `hoc` folder. The naming convention is to expose the HOC with a `with` prefix.

The context related components are located in the `contexts` folder.

Plain functional utilities have to be placed in the `utils` folder. Even though for convenience all contents of utils are exported, their modules should be referenced directly from any components. The utilities have to be pretty much self-sustained, i.e., referencing back components is forbidden.

**Namings**

While *stateless* components should be created as a `const`, *statefull* components should be created as a `class`. In the former case only an interface with the component's name suffixed with `Props` should be created (to declare the typings of the props). In the latter case an additional interface with the component's name suffixed with `State` should be created, too. This interface carries the type information for the internal state of the component.

Input field components should always be suffixed with `Field`. Their props should extend the `InputProps` interface.

Event props should be prefixed with `on` and they should have a single argument only. This argument must be an object that follows an interface, which has an adequate name for the event, usually consisting of the component's name, the event type, and being suffixed with `Event`, e.g., for `onChange` of a `TextField` we have `TextFieldChangeEvent`.

We have a variety of different component classes. We should be able to easily distinguish between the different classes of components by looking at the suffix of a component. We have:

- `*Control`, stateful functional components
- `*Panel`, layout to be used
- `*Field`, an input field

Exceptions to this convention can occur due to various reasons (historical, aesthetic, ...), but should always be reasoned and discussed properly.

#### Code Formatting

There is not much to write. We use prettier and our build checks if the code has been properly prettified. Just run

```sh
npm run prettier
```

if you are in doubt that your code changes fits our desired formatting.

#### Unit Tests

Any change needs to be in company with its respective unit tests. In order to run the tests we use the following command:

```sh
npm run test
```

This will also run the linter. The standalone unit tests are available via `test:unit`. Likewise, we can also easily report the code coverage:

```sh
npm run test:unit --coverage
```

For unit tests we use Jest. We recommend using snapshot tests (which are done via enzyme and some JSON snapshot serializer).

#### Visual testing

Visual snapshots are located in `/integration/__image_snapshots__`.

When the testing runs it renders components from `[componentName]/Example.md`, makes screenshots and compares them to the previous version screenshots.

To run the testing locally Docker should be installed.

```sh
npm run test:visual
```

Once a component was changed, added or removed then snapshots should be updated.
To update snapshots:
```sh
npm run test:visual -- -u
```

In some cases (i.e components with animations) it's needed to skip the test. It can be done in the next way: update Example.md file:
```
```js { "props": { "data-skip": true } }

<Component />
```
In some cases it's needed to tell visual test to wait before doing a snapshot. It can be done in the next way: update Example.md file:

```
```js { "props": { "data-wait": 500 } }

<Component />
```

#### Adding new icons

The list of all imported icons is in `/tools/icongen.config`. After modifying the list you should run `npm run icongen` or it will be run on prepush.

## License

Precise UI is released using the MIT license. For more information see the [license file](LICENSE).

We are using some icons from [Material UI Icons](https://github.com/mui-org/material-ui/tree/master/packages/material-ui-icons). Their code and design is covered by the respective license of [Material UI](https://github.com/mui-org/material-ui) (MIT).
