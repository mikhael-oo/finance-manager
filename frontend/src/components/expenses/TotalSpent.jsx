import {React, useContext } from 'react';
import { AppContext } from "../../context/AppContext";

const TotalSpent = (props) => {
    const { total } = useContext(AppContext);

    return (
        <h2>Total Spent: {total}</h2>
    )
}

export default TotalSpent;