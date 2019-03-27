import * as React from 'react';
import * as icons from '../Icon/icons';
import styled, { keyframes, css } from '../../utils/styled';
import { IconName } from '../Icon';
import { InputProps, PreciseTheme } from '../../common';
import { withFormContext, FormContextProps } from '../../hoc/withFormContext';
import { brightLemon, white, ocean } from '../../colors';
import { distance } from '../../distance';
import { light } from '../../themes';

export interface RatingProps extends InputProps<number> {
  /**
   * Sets the icon to be used.
   * @default Favorite
   */
  icon?: IconName;
  /**
   * The number of levels for the rating. By default 5.
   * @default 5
   */
  levels?: number;
  /**
   * Sets the size of the stars.
   * @default "medium"
   */
  size?: 'small' | 'medium';
  /**
   * @ignore
   */
  children?: void;
}

export interface RatingState {
  controlled: boolean;
  value: number;
  hover: number;
  changers: Array<() => void>;
  hovers: Array<() => void>;
}

const RatingContainer = styled.div`
  display: inline-block;
`;

interface RatingElementProps {
  size: 'medium' | 'small';
  disabled?: boolean;
}

const SetAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.5);
  }
  50% {
    transform: scale(0.9);
  }
  75% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const RatingElement = styled.span<RatingElementProps>`
  display: inline-block;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};

  & + & {
    padding-left: ${props => (props.size === 'medium' ? distance.small : distance.xsmall)};
  }
`;

function getColor(theme: PreciseTheme, disabled: boolean | undefined, i: number, value: number, hover: number) {
  if (!disabled) {
    if (hover !== -1) {
      if (i < hover) {
        return theme.ui0;
      } else if (i === hover) {
        return ocean;
      }
    } else if (i < value) {
      return theme.ui5;
    }

    return theme.ui4;
  } else if (i < value) {
    return theme.ui4;
  }

  return theme.ui3;
}

function getAnimation(i: number, value: number) {
  if (i + 1 === value) {
    return css`
      ${SetAnimation} 0.5s ease-in-out
    `;
  }

  return 'none';
}

class RatingInt extends React.Component<RatingProps & FormContextProps, RatingState> {
  constructor(props: RatingProps) {
    super(props);
    const { value, defaultValue, levels = 5 } = props;
    const changers: Array<() => void> = [];
    const hovers: Array<() => void> = [];

    for (let i = 0; i < levels; i++) {
      changers.push(() => this.updateValue(i + 1));
      hovers.push(() => this.hoverValue(i));
    }

    this.state = {
      controlled: value !== undefined,
      value: value || defaultValue || 0,
      hover: -1,
      changers,
      hovers,
    };
  }

  componentWillReceiveProps(nextProps: RatingProps) {
    if (this.state.controlled) {
      this.setState({
        value: nextProps.value || 0,
      });
    }
  }

  componentDidMount() {
    const { form } = this.props;
    const { controlled } = this.state;

    if (!controlled && form) {
      form.subscribe(this);
    }
  }

  componentWillUnmount() {
    const { form } = this.props;
    const { controlled } = this.state;

    if (!controlled && form) {
      form.unsubscribe(this);
    }
  }

  private updateValue(value: number) {
    const { onChange, name = '', form } = this.props;

    if (!this.state.controlled) {
      if (form) {
        form.change({
          name,
          value,
        });
      } else {
        this.setState({
          value,
        });
      }
    }

    if (typeof onChange === 'function') {
      onChange({
        value,
      });
    }
  }

  private hoverVoid = () => {
    this.setState({
      hover: -1,
    });
  };

  private hoverValue(value: number) {
    this.setState({
      hover: value,
    });
  }

  render() {
    const {
      levels: _0,
      name: _1,
      value: _2,
      defaultValue: _3,
      onChange: _4,
      disabled,
      size = 'medium',
      icon = 'Star',
      ...props
    } = this.props;
    const { value, changers, hover, hovers } = this.state;
    const theme = props.theme || light;
    const dim = size === 'medium' ? '32px' : '22px';
    const Icon = icons[icon];

    return (
      <RatingContainer {...props}>
        {changers.map((changer, i) => (
          <RatingElement
            key={i}
            size={size}
            onClick={changer}
            disabled={disabled}
            onMouseEnter={hovers[i]}
            onMouseLeave={this.hoverVoid}>
            <Icon
              width={dim}
              height={dim}
              style={{ fill: getColor(theme, disabled, i, value, hover), animation: getAnimation(i, value) as any }}
            />
          </RatingElement>
        ))}
      </RatingContainer>
    );
  }
}

/**
 * An input control for providing user ratings.
 */
export const Rating = withFormContext(RatingInt);
Rating.displayName = 'Rating';
