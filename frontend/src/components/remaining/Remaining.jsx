import {React, useContext} from "react";
import { AppContext } from '../../context/AppContext'

const Remaining = (props) => {
    // const { remaining } = useContext(AppContext);
    const { budget, total } = useContext(AppContext)

    return (
        // <h3>Remaining Balance: {remaining}</h3>
        <h3>Remaining Balance: { budget - total }</h3>
    )
}

export default Remaining;