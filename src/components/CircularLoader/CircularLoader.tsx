import './circular-loader.styles.css';

interface Props {
  className?: string;
}

const CustomCircularProgress: React.FC<Props> = ({ className }) => (
  <div className={`${className ? className : ''} circular-loader d-flex justify-content-center align-items-center`}>
    <span className="circular-loader__span"></span>
  </div>
);

export default CustomCircularProgress;
