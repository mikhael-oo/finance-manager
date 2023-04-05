import {React, useContext, useEffect, useState} from "react";
import AuthContext from '../login/AuthContext';
import axios from 'axios';

    const AddBudget = (props) => {
    
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


    //UPDATE POPUPS
    const [showHousingPopup, setShowHousingPopup] = useState(false);
    const [showUtilitiesPopup, setShowUtilitiesPopup] = useState(false);
    const [showTransportationPopup, setShowTransportationPopup] = useState(false);
    const [showFoodPopup, setShowFoodPopup] = useState(false);
    const [showEntertainmentPopup, setShowEntertainmentPopup] = useState(false);
    const [showSavingPopup, setShowSavingPopup] = useState(false);
    const [showMiscellaneousPopup, setShowMiscellaneousPopup] = useState(false);

    const month = new Date().getMonth();


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

    const handleSubmit = async (e) => {
        e.preventDefault();

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

        
        
    }

    //UPDATE FUNCTIONS
    const updateHousing = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:3000/api/budget/updatehousing/' + authContext.userId + '/' + month + '/' + parseFloat(newHousing));
            alert('Housing Budget updated successfully');
            console.log(response.data);
        } catch (err) {
            console.error(err);
            alert('Error updating housing budget');
        }
        setShowHousingPopup(false);
    }

    const updateUtilities = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:3000/api/budget/updateutl/' + authContext.userId + '/' + month + '/' + parseFloat(newUtilities));
            alert('Utilities Budget updated successfully');
            console.log(response.data);
        } catch (err) {
            console.error(err);
            alert('Error updating utilities budget');
        }
    };
    
    const updateTransportation = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:3000/api/budget/updatetrans/' + authContext.userId + '/' + month + '/' + parseFloat(newTransportation));
            alert('Transportation Budget updated successfully');
            console.log(response.data);
        } catch (err) {
            console.error(err);
            alert('Error updating transportation budget');
        }
        setShowTransportationPopup(false);
    };
    
    const updateFood = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:3000/api/budget/updatefood/' + authContext.userId + '/' + month + '/' + parseFloat(newFood));
            alert('Food Budget updated successfully');
            console.log(response.data);
        } catch (err) {
            console.error(err);
            alert('Error updating food budget');
        }
        setShowFoodPopup(false);
    };
    
    const updateEntertainment = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:3000/api/budget/updatent/' + authContext.userId + '/' + month + '/' + parseFloat(newEntertainment));
            alert('Entertainment Budget updated successfully');
            console.log(response.data);
        } catch (err) {
            console.error(err);
            alert('Error updating entertainment budget');
        }
        setShowEntertainmentPopup(false);
    };
    
    const updateSaving = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:3000/api/budget/updatesav/' + authContext.userId + '/' + month + '/' + parseFloat(newSaving));
            alert('Saving Budget updated successfully');
            console.log(response.data);
        } catch (err) {
            console.error(err);
            alert('Error updating saving budget');
        }
        setShowSavingPopup(false);
    };
    
    const updateMiscellaneous = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:3000/api/budget/updatemisc/' + authContext.userId + '/' + month + '/' + parseFloat(newMiscellaneous));
            alert('Misc Budget updated successfully');
            console.log(response.data);
        } catch (err) {
            console.error(err);
            alert('Error updating misc budget');
        }
    };

    // return (

    // <div>
    //     <form onSubmit={onSubmit}>
    //         <label>Housing</label>
    //         <input type='number'
    //             id='housing'
    //             value={newHousing}
    //             onChange={(e) => setHousing(e.target.value)}
    //             />
    //         <a href="#" onClick={() => setShowHousingPopup(true)}>UPDATE HOUSING</a>
    //         <div className="HousingPopup">

    //         </div>

    //         <label>Utilities</label>
    //         <input type='number' id='utilities' value={newUtilities} onChange={(e) => setUtilities(e.target.value)} />
    //         <label>Transportation</label>
    //         <input type='number' id='transportation' value={newTransportation} onChange={(e) => setTransportation(e.target.value)} />
    //         <label>Food</label>
    //         <input type='number' id='food' value={newFood} onChange={(e) => setFood(e.target.value)} />
    //         <label>Entertainment</label>
    //         <input type='number' id='entertainment' value={newEntertainment} onChange={(e) => setEntertainment(e.target.value)} />
    //         <label>Saving</label>
    //         <input type='number' id='saving' value={newSaving} onChange={(e) => setSaving(e.target.value)} />
    //         <label>Miscellaneous</label>
    //         <input type='number' id='miscellaneous' value={newMiscellaneous} onChange={(e) => setMiscellaneous(e.target.value)} />
    //         <button type="submit">Set Budget</button>
    //     </form>






    // </div>

    
    // )

    return (
        <div>
        <label>Housing</label>
    {!showHousingPopup && (
        <input
        type="number"
        id="housing"
        value={newHousing}
        onChange={(e) => setHousing(e.target.value)}
        />
    )}
    {showHousingPopup && (
        <div className="popup">
        <form onSubmit={updateHousing}>
            <label>Update Housing Here</label>
            <input
            type="number"
            id="housing"
            value={newHousing}
            onChange={(e) => setHousing(e.target.value)}
            />
            <button type="submit">Confirm Update</button>
            <button type="button" onClick={() => setShowHousingPopup(false)}>
            Cancel
            </button>
        </form>
        </div>
    )}
    {!showHousingPopup && (
        <button onClick={() => setShowHousingPopup(true)}>Update Housing</button>
    )}

    <br />

    <label>Utilities</label>
    {!showUtilitiesPopup && (
        <input
        type="number"
        id="utilities"
        value={newUtilities}
        onChange={(e) => setUtilities(e.target.value)}
        />
    )}
    {showUtilitiesPopup && (
        <div className="popup">
        <form onSubmit={updateUtilities}>
            <label>Update Utilities Here</label>
            <input
            type="number"
            id="utilities"
            value={newUtilities}
            onChange={(e) => setUtilities(e.target.value)}
            />
            <button type="submit">Confirm Update</button>
            <button type="button" onClick={() => setShowUtilitiesPopup(false)}>
            Cancel
            </button>
        </form>
        </div>
    )}
    {!showUtilitiesPopup && (
        <button onClick={() => setShowUtilitiesPopup(true)}>Update Utilities</button>
    )}
        <br />

        <label>Transportation</label>
    {!showTransportationPopup && (
        <input
        type="number"
        id="transportation"
        value={newTransportation}
        onChange={(e) => setTransportation(e.target.value)}
        />
    )}
    {showTransportationPopup && (
        <div className="popup">
        <form onSubmit={updateTransportation}>
            <label>Update Transportation Here</label>
            <input
            type="number"
            id="transportation"
            value={newTransportation}
            onChange={(e) => setTransportation(e.target.value)}
            />
            <button type="submit">Confirm Update</button>
            <button type="button" onClick={() => setShowTransportationPopup(false)}>
            Cancel
            </button>
        </form>
        </div>
    )}
    {!showTransportationPopup && (
        <button onClick={() => setShowTransportationPopup(true)}>Update Transportation</button>
    )}

    <br />

    <label>Food</label>
    {!showFoodPopup && (
        <input
        type="number"
        id="food"
        value={newFood}
        onChange={(e) => setFood(e.target.value)}
        />
    )}
    {showFoodPopup && (
        <div className="popup">
        <form onSubmit={updateFood}>
            <label>Update Food Here</label>
            <input
            type="number"
            id="food"
            value={newFood}
            onChange={(e) => setFood(e.target.value)}
            />
            <button type="submit">Confirm Update</button>
            <button type="button" onClick={() => setShowFoodPopup(false)}>
            Cancel
            </button>
        </form>
        </div>
    )}
    {!showFoodPopup && (
        <button onClick={() => setShowFoodPopup(true)}>Update Food</button>
    )}

        <br />

        <label>Entertainment</label>
        {!showEntertainmentPopup && (
        <input
        type="number"
        id="entertainment"
        value={newEntertainment}
        onChange={(e) => setEntertainment(e.target.value)}
        />
    )}
    {showEntertainmentPopup && (
        <div className="popup">
        <form onSubmit={updateEntertainment}>
            <label>Update Entertainment Here</label>
            <input
            type="number"
            id="entertainment"
            value={newEntertainment}
            onChange={(e) => setEntertainment(e.target.value)}
            />
            <button type="submit">Confirm Update</button>
            <button type="button" onClick={() => setShowEntertainmentPopup(false)}>
            Cancel
            </button>
        </form>
        </div>
    )}
    {!showEntertainmentPopup && (
        <button onClick={() => setShowEntertainmentPopup(true)}>Update Entertainment</button>
    )}

    <br />

    <label>Saving</label>
    {!showSavingPopup && (
        <input
        type="number"
        id="saving"
        value={newSaving}
        onChange={(e) => setSaving(e.target.value)}
        />
    )}
    {showSavingPopup && (
        <div className="popup">
        <form onSubmit={updateSaving}>
            <label>Update Saving Here</label>
            <input
            type="number"
            id="saving"
            value={newSaving}
            onChange={(e) => setSaving(e.target.value)}
            />
            <button type="submit">Confirm Update</button>
            <button type="button" onClick={() => setShowSavingPopup(false)}>
            Cancel
            </button>
        </form>
        </div>
    )}
    {!showSavingPopup && (
        <button onClick={() => setShowSavingPopup(true)}>Update Saving</button>
    )}

        <br />

        <label>Miscellaneous</label>
        {!showMiscellaneousPopup && (
            <input
            type="number"
            id="miscellaneous"
            value={newMiscellaneous}
            onChange={(e) => setMiscellaneous(e.target.value)}
            />
        )}
        {showMiscellaneousPopup && (
            <div className="popup">
            <form onSubmit={updateMiscellaneous}>
                <label>Update Miscellaneous Here</label>
                <input
                type="number"
                id="miscellaneous"
                value={newMiscellaneous}
                onChange={(e) => setMiscellaneous(e.target.value)}
                />
                <button type="submit">Confirm Update</button>
                <button type="button" onClick={() => setShowMiscellaneousPopup(false)}>
                Cancel
                </button>
            </form>
            </div>
        )}
        {!showMiscellaneousPopup && (
            <button onClick={() => setShowMiscellaneousPopup(true)}>Update Miscellaneous</button>
        )}

        <div>
            <button onClick={handleSubmit}>SUBMIT BUDGET</button>
        </div>
</div>
)

}

export default AddBudget;

//import { AppContext } from '../../context/AppContext'

// const {dispatch} = useContext(AppContext);

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

                // setHousing('');
        // setUtilities('');
        // setTransportation('');
        // setFood('');
        // setEntertainment('');
        // setSaving('');
        // setMiscellaneous('');