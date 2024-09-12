import * as React from 'react';
import content from './icon-types';
import './icon.styles.css';

type IconSize = 'xs' | 's' | 'm' | 'l' | 'full';
type IconTypes =
  | 'rightArrow'
  | 'leftArrow';
type Color = 'black' | 'white' | 'light-silver';

interface Props {
    size: IconSize;
    icon: IconTypes;
    color: Color;
    className?: string;
}

const Icon: React.FC<Props> = ({icon, color, size, className}) => {
    const classNames = `icon-container icon-container--${color} icon-container--${size} ${className || ''}`;
    return (
        <div className={classNames} data-testid="icon_test_id">
          {content[icon]}
        </div>
      );
}

export default Icon;
