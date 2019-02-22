import * as React from 'react';
import * as PropTypes from 'prop-types';
import { getExampleDetails } from '../utils';

// @ts-ignore
import ToolbarButton from 'react-styleguidist/lib/rsg-components/ToolbarButton';
import { Icon } from '../../src/components/Icon';
import { Link } from 'react-router-dom';

interface IsolateButton {
  name: string;
  example: number;
  isolated: boolean;
}

const IsolateButton: React.SFC<IsolateButton> = ({ name, isolated, example }, { allSections }) => {
  const exampleDetails = getExampleDetails(allSections, name, example);
  if (!exampleDetails) {
    // tslint:disable-next-line
    return null;
  }

  const componentUrl = `/${exampleDetails.component.section.slug}/${exampleDetails.component.slug}`;

  return isolated ? (
    <Link to={componentUrl}>
      <ToolbarButton title="Show all components">
        <Icon name="Fullscreen" />
      </ToolbarButton>
    </Link>
  ) : (
    <Link to={`${componentUrl}/${example}`}>
      <ToolbarButton title="Open isolated">
        <Icon name="FullscreenExit" />
      </ToolbarButton>
    </Link>
  );
};

IsolateButton.contextTypes = {
  allSections: PropTypes.array.isRequired,
};

export default IsolateButton;
