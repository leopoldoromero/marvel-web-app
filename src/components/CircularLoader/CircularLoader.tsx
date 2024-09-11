import './circular-loader.styles.css';

interface Props {
  className?: string;
}

const CustomCircularProgress: React.FC<Props> = ({ className }) => (
  <div data-testid='circular-loader-test-id' className={`${className ? className : ''} circular-loader d-flex justify-content-center align-items-center`}>
    <span className="circular-loader__outer"></span>
    <span className="circular-loader__inner"></span>
    <span className="circular-loader__smallest"></span>
  </div>
);

export default CustomCircularProgress;
