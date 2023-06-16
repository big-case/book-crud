import React from "react";

const Pagination = (props) => {
    const {currentPage, maxPageLimit, minPageLimit} = props;
    const totalPages = props.response.totalPages-1;
    const data = props.response.data;

    const pages = [];
    for (let i = 1 ; i <= totalPages; i++) {
        pages.push(i);       
    }

    const pageNumbers = pages.map(page => {
        if (page <= maxPageLimit && page > minPageLimit) {
            return(
                <li key={page} id={page} onClick={handlePageClick}
                    className = {currentPage === page ? 'active' : null}>
                        {page}
                </li>
            );
        } else{
            return null;
        }
    });

    const handlePrevClick =() =>{
        props.onPrevClick();
    }
    const handleNextClick = () => {
        props.onNextClick();
    }
    const handlePageClick = (e) => {
        props.onPageChange(Number(e.target.id));
    }

    // Page ellipse
    let pageIncrementEllipses = null;
    if(pages.length > maxPageLimit) {
        pageIncrementEllipses = <li onCLick={handleNextClick}>&hellip;</li>
    }
    let pageDecrementEllipses = null;
    if(minPageLimit >= 1){
        pageDecrementEllipses=<li onCLick={handlePrevClick}>&hellip;</li>
    }
    const renderData = (data) => {
        return(
            <ul>
                {data.map((d)=>
                <li key={d['_id']}>The passenger having id {d['_id'].slice(d['_id'].length-5)} using {d.airline[0].name} airlines</li>
                )}
            </ul>
        )
    }

    
    return(
        <div>
            //Pagination handles.
        </div>
    )
}

export default Pagination;