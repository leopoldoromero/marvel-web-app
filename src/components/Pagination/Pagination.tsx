import { Icon } from "@components/Icons";
import './pagination.styles.css';
import { getPaginationItems } from "./pagination.utils";

interface PaginationBtnProps { children: React.ReactNode; onClick: () => void; selected?: boolean };

const PaginationBtn: React.FC<PaginationBtnProps> = ({children, selected, onClick }) => (
    <button 
    className={`pagination__btn ${selected ? 'pagination__btn--selected' : ''}`}
    onClick={onClick}>
        {children}
    </button>
);

interface Props {
    totalPages: number;
    currentPage: number;
    handlePageChange: (page: number) => void;
}
const Pagination: React.FC<Props> = ({ totalPages, currentPage, handlePageChange }) => {
    return (
    <div className="pagination">
        <PaginationBtn  onClick={() => {
            if (currentPage > 1) handlePageChange(currentPage - 1)
        }}>
            <Icon icon="leftArrow" color={currentPage === 1 ? 'light-silver' : 'black'} size="m"/>
        </PaginationBtn> 
        {
            getPaginationItems(totalPages, currentPage).map((el, i) => {
                return (
                    <PaginationBtn 
                    key={i} 
                    selected={el === currentPage}
                    onClick={() => handlePageChange(el)}
                    >
                        {el}
                    </PaginationBtn>
                )
            }) 
        }   
        <PaginationBtn  onClick={() => {
            if (currentPage < totalPages) handlePageChange(currentPage + 1);
        }}>
            <Icon icon="rightArrow" color={currentPage === totalPages ? 'light-silver' : 'black'} size="m"/>
        </PaginationBtn>
        
    </div>
    );
}

export default Pagination;
