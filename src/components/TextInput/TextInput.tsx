import { SearchIcon } from "@components/Icons";
import './text-input.styles.css';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const TextInput: React.FC<Props> = (props) => (
    <div className="text-input-wrapper">
        <SearchIcon />
        <input 
        className="text-input-wrapper__input" 
        type="text" 
        value={props?.value ?? ''}
        onChange={props.onChange}
        {...props}
        />
    </div>
);

export default TextInput;