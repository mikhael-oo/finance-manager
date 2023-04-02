import {React, useContext, useState} from "react";
import { AppContext } from '../../context/AppContext'

const AddBudget = (props) => {
    const {dispatch} = useContext(AppContext);

    const [newHousing, setHousing] = useState('');
    const [newFood, setFood] = useState('');
    const [newUtilities, setUtilities] = useState('');
    const [newEntertainment, setEntertainment] = useState('');
    const [newTransportation, setTransportation] = useState('');
    const [newSaving, setSaving] = useState('');
    const [newMiscellaneous, setMiscellaneous] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        const budget = {
            housing: parseFloat(newHousing),
            utilities: parseFloat(newUtilities),
            transportation: parseFloat(newTransportation),
            food: parseFloat(newFood),
            entertainment: parseFloat(newEntertainment),
            saving: parseFloat(newSaving),
            miscellaneous: parseFloat(newMiscellaneous),
            date: (new Date()).getTime()
        };

        dispatch({
            type: 'ADD_BUDGET',
            payload: budget,
        });

        setHousing('');
        setUtilities('');
        setTransportation('');
        setFood('');
        setEntertainment('');
        setSaving('');
        setMiscellaneous('');
    }

    return (
        <form onSubmit={onSubmit}>
            <label>Housing</label>
            <input type='number' id='housing' value={newHousing} onChange={(e) => setHousing(e.target.value)} required/>
            <label>Utilities</label>
            <input type='number' id='utilities' value={newUtilities} onChange={(e) => setUtilities(e.target.value)} required/>
            <label>Transportation</label>
            <input type='number' id='transportation' value={newTransportation} onChange={(e) => setTransportation(e.target.value)} required/>
            <label>Food</label>
            <input type='number' id='food' value={newFood} onChange={(e) => setFood(e.target.value)} required/>
            <label>Entertainment</label>
            <input type='number' id='entertainment' value={newEntertainment} onChange={(e) => setEntertainment(e.target.value)} required/>
            <label>Saving</label>
            <input type='number' id='saving' value={newSaving} onChange={(e) => setSaving(e.target.value)} required/>
            <label>Miscellaneous</label>
            <input type='number' id='miscellaneous' value={newMiscellaneous} onChange={(e) => setMiscellaneous(e.target.value)} required/>
            <button type="submit">Set Budget</button>
        </form>
    )
}

export default AddBudget;