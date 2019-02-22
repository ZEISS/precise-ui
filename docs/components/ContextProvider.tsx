import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ConfigType, Dict, SectionEntity } from '../types';
// @ts-ignore
import { DisplayModesType } from 'react-styleguidist/lib/consts';

export interface ContextProviderProps {
  codeRevision: number;
  config: ConfigType;
  slots: Dict;
  displayMode: keyof DisplayModesType;
  allSections: Array<SectionEntity>;
}

export default class ContextProvider extends React.Component<ContextProviderProps> {
  static childContextTypes = {
    codeRevision: PropTypes.number.isRequired,
    config: PropTypes.object.isRequired,
    slots: PropTypes.object.isRequired,
    displayMode: PropTypes.string,
    allSections: PropTypes.array.isRequired,
  };

  getChildContext() {
    const { codeRevision, config, slots, displayMode, allSections } = this.props;
    return { codeRevision, config, slots, displayMode, allSections };
  }

  render() {
    return <>{this.props.children}</>;
  }
}
