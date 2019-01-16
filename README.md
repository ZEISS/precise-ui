# <img src="docs/assets/precise-logo.svg" width="240">

[![Website Build Status](https://zeissgroup.visualstudio.com/DCC/_apis/build/status/Tool/Precise-UI?branchName=master)](https://zeissgroup.visualstudio.com/DCC/_build/latest?definitionId=1073?branchName=master)
[![Package Build Status](https://travis-ci.org/ZEISS/precise-ui.svg?branch=master)](https://travis-ci.org/ZEISS/precise-ui)
[![NPM](https://img.shields.io/npm/v/precise-ui.svg)](https://www.npmjs.com/package/precise-ui)
[![Node](https://img.shields.io/node/v/precise-ui.svg)](https://www.npmjs.com/package/precise-ui)
[![GitHub Tag](https://img.shields.io/github/tag/ZEISS/precise-ui.svg)](https://github.com/ZEISS/precise-ui/releases)
[![GitHub Issues](https://img.shields.io/github/issues/ZEISS/precise-ui.svg)](https://github.com/ZEISS/precise-ui/issues)
[![CLA Assistant](https://cla-assistant.io/readme/badge/ZEISS/precise-ui)](https://cla-assistant.io/ZEISS/precise-ui)

A complete opinionated React component library with minimal dependencies powered ZEISS.

See [https://precise-ui.io](precise-ui.io) for our kitchen sink (i.e., demo page illustrating all the components incl. their documentation).

## Getting Started

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

## Issues & Support

If you have any usage and general questions, you are welcome to ask a question on **Stack Overflow** using the tag `precise-ui`, and you will receive help as soon as possible.

Also, when creating a new Issue here, please use one of the provided templates:

- [Bug Report](https://github.com/ZEISS/precise-ui/issues/new?template=bugs.md)
- [Feature Proposal](https://github.com/ZEISS/precise-ui/issues/new?template=features.md)

## License

Precise UI is released using the MIT license. For more information see the [license file](LICENSE).

We are using some icons from [Material UI Icons](https://github.com/mui-org/material-ui/tree/master/packages/material-ui-icons). Their code and design is covered by the respective license of [Material UI](https://github.com/mui-org/material-ui) (MIT).