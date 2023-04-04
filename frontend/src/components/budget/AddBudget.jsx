import {React, useContext, useEffect, useState} from "react";
import { AppContext } from '../../context/AppContext'
import AuthContext from '../login/AuthContext';
import axios from 'axios';

const AddBudget = (props) => {
    // const {dispatch} = useContext(AppContext);
    const authContext = useContext(AuthContext);

    const [newHousing, setHousing] = useState('');
    const [newFood, setFood] = useState('');
    const [newUtilities, setUtilities] = useState('');
    const [newEntertainment, setEntertainment] = useState('');
    const [newTransportation, setTransportation] = useState('');
    const [newSaving, setSaving] = useState('');
    const [newMiscellaneous, setMiscellaneous] = useState('');

    const [currentBudget, setCurrentBudget] = useState({});
    const [budgetList, setBudgetList] = useState([]);
    const [budgetExists, setBudgetExists] = useState(false);

    useEffect(() => {
        const fetchBudget = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/budget/'+ authContext.userId);
                setBudgetList(response);
                var currMonth = new Date().getMonth();
                var currBudget = budgetList.find(b => b.month === currMonth);

                if (currBudget !== undefined){
                    setBudgetExists(true);
                    setCurrentBudget(currBudget);
                    setHousing(currBudget.housing.toString());
                    setUtilities(currBudget.utilities.toString());
                    setTransportation(currBudget.transportation.toString());
                    setFood(currBudget.food.toString());
                    setEntertainment(currBudget.entertainment.toString());
                    setSaving(currBudget.saving.toString());
                    setMiscellaneous(currBudget.miscellaneous.toString());
                }
            }
            catch (err) {
                console.log(err)
            }
        }

        fetchBudget();
    },[])

    const onSubmit = async (e) => {
        e.preventDefault();

        // const budget = {
        //     housing: parseFloat(newHousing),
        //     utilities: parseFloat(newUtilities),
        //     transportation: parseFloat(newTransportation),
        //     food: parseFloat(newFood),
        //     entertainment: parseFloat(newEntertainment),
        //     saving: parseFloat(newSaving),
        //     miscellaneous: parseFloat(newMiscellaneous),
        //     date: (new Date()).getTime(),
        //     month: (new Date()).getMonth()
        // };

        // dispatch({
        //     type: 'ADD_BUDGET',
        //     payload: budget,
        // });

        if (budgetExists){
            try {
                const response = await axios.put('http://localhost:3000/api/budget/addbudget/' + authContext.userId + '/' + currentBudget.month, {
                    user_id: authContext.userId,
                    housing: parseFloat(newHousing),
                    utilities: parseFloat(newUtilities),
                    transportation: parseFloat(newTransportation),
                    food: parseFloat(newFood),
                    entertainment: parseFloat(newEntertainment),
                    saving: parseFloat(newSaving),
                    miscellaneous: parseFloat(newMiscellaneous),
                    date: (new Date()).getTime(),
                    month: (new Date()).getMonth()
                });
                alert('Budget added successfully');
                console.log(response.data);
            } catch (err) {
                console.error(err);
                alert('Error adding budget');
            }
        }
        else {
            try {
                const response = await axios.post('http://localhost:3000/api/budget/addbudget', {
                    user_id: authContext.userId,
                    housing: parseFloat(newHousing),
                    utilities: parseFloat(newUtilities),
                    transportation: parseFloat(newTransportation),
                    food: parseFloat(newFood),
                    entertainment: parseFloat(newEntertainment),
                    saving: parseFloat(newSaving),
                    miscellaneous: parseFloat(newMiscellaneous),
                    date: (new Date()).getTime(),
                    month: (new Date()).getMonth()
                });
                alert('Budget added successfully');
                console.log(response.data);
            } catch (err) {
                console.error(err);
                alert('Error adding budget');
            }
        }

        
        

        // setHousing('');
        // setUtilities('');
        // setTransportation('');
        // setFood('');
        // setEntertainment('');
        // setSaving('');
        // setMiscellaneous('');
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