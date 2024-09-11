type HeartIconSize = 'mini' | 'default';
interface Props {
  size?: HeartIconSize;
  isSelected: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const HeartIcon: React.FC<Props> = ({ size, isSelected, className, onClick }) => {
  const ICON_SIZE_MAP: {
    [key in HeartIconSize]: { width: number; height: number };
  } = {
    mini: { width: 12, height: 11 },
    default: { width: 24, height: 21.68 },
  };
  const defaultStyles = {
    fill: isSelected ? '#EC1D24' : 'none',
    ...(!isSelected && { stroke: '#FFFFFF', strokeWidth: '2' }),
  };
  return (
    <button className='d-flex border-none background-transparent' onClick={onClick}>
      <svg
        className={className}
        viewBox='0 0 24 24'
        data-testid='heart-icon-selected'
        {...defaultStyles}
        {...ICON_SIZE_MAP[size ?? 'default']}
      >
        <path d='m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z' />
      </svg>
    </button>
  );
};

export default HeartIcon;
