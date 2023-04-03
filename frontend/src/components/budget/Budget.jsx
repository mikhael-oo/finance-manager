import {React, useContext, useState} from "react";
import { AppContext } from '../../context/AppContext'
import axios from 'axios';
import AuthContext from "../login/AuthContext";

const Budget = (props) => {
    const {budget} = useContext(AppContext);

    return (
        <h3>Current Budget:{budget}</h3>
    )
}

export default Budget;