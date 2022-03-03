import React from "react";
import { Pagination, PaginationItem} from "@mui/material";

const paginationStyle = {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    margin: "100px auto",
  };

const AppPagination = ({ setPage, pageNumber }) => {
const handleChange = page => {
    setPage(page);
    window.scroll(0, 0);
}

    return(
        <div>
            <div>
                <Pagination
                onChange={e => handleChange(e.target.textContent)}
                 style={paginationStyle} count={5}/>
            </div>
        </div>
    );
};

export default AppPagination;