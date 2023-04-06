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
    const [budgetTotal, setBudgetTotal] = useState(0.00);
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

    const fetchBudget = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/budget/'+ authContext.userId);
            var tempList = []
            tempList = Array.from(response.data)

            var currMonth = new Date().getMonth();
            var currBudget = tempList.find(b => b.month === currMonth);
            setCurrentBudget(currBudget)

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
                setBudgetTotal(parseFloat(currBudget.housing) + parseFloat(currBudget.utilities) + parseFloat(currBudget.transportation) + parseFloat(currBudget.food) + parseFloat(currBudget.entertainment) + parseFloat(currBudget.saving) + parseFloat(currBudget.miscellaneous))

            }
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchBudget();
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (budgetExists){
            alert('Update Each Budget Individually');
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
                fetchBudget();
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

return (
    <div>
        <h1 className='font-semibold'>Current Budget Total: {budgetTotal}</h1>
    <label className='font-semibold'>Housing: </label>
{!showHousingPopup && (
    <input
    className="border-solid border-2 border-black rounded-md text-center mx-1 my-2"
    type="number"
    id="housing"
    value={newHousing}
    onChange={(e) => setHousing(e.target.value)}
    />
)}
{showHousingPopup && (
    <div className="popup">
    <form onSubmit={updateHousing}>
        <label className='font-semibold'>Update Housing Here: </label>
        <input
        className="border-solid border-2 border-black rounded-md text-center mx-1 my-2"
        type="number"
        id="housing"
        value={newHousing}
        onChange={(e) => setHousing(e.target.value)}
        />
        <button className="border-2 border-black rounded-md px-2 mx-1" type="submit">Confirm Update</button>
        <button className="border-2 border-black rounded-md px-2 mx-1" type="button" onClick={() => setShowHousingPopup(false)}>
        Cancel
        </button>
    </form>
    </div>
)}
{!showHousingPopup && (
    <button className="border-2 border-black rounded-md px-2 mx-1" onClick={() => setShowHousingPopup(true)}>Update Housing</button>
)}

<br />

<label className='font-semibold'>Utilities: </label>
{!showUtilitiesPopup && (
    <input
    className="border-solid border-2 border-black rounded-md text-center mx-1 my-2"
    type="number"
    id="utilities"
    value={newUtilities}
    onChange={(e) => setUtilities(e.target.value)}
    />
)}
{showUtilitiesPopup && (
    <div className="popup">
    <form onSubmit={updateUtilities}>
        <label className='font-semibold'>Update Utilities Here: </label>
        <input
        className="border-solid border-2 border-black rounded-md text-center mx-1 my-2"
        type="number"
        id="utilities"
        value={newUtilities}
        onChange={(e) => setUtilities(e.target.value)}
        />
        <button className="border-2 border-black rounded-md px-2 mx-1" type="submit">Confirm Update</button>
        <button className="border-2 border-black rounded-md px-2 mx-1" type="button" onClick={() => setShowUtilitiesPopup(false)}>
        Cancel
        </button>
    </form>
    </div>
)}
{!showUtilitiesPopup && (
    <button className="border-2 border-black rounded-md px-2 mx-1" onClick={() => setShowUtilitiesPopup(true)}>Update Utilities</button>
)}
    <br />

    <label className='font-semibold'>Transportation: </label>
{!showTransportationPopup && (
    <input
    className="border-solid border-2 border-black rounded-md text-center mx-1 my-2"
    type="number"
    id="transportation"
    value={newTransportation}
    onChange={(e) => setTransportation(e.target.value)}
    />
)}
{showTransportationPopup && (
    <div className="popup">
    <form onSubmit={updateTransportation}>
        <label className='font-semibold'>Update Transportation Here: </label>
        <input
        className="border-solid border-2 border-black rounded-md text-center mx-1 my-2"
        type="number"
        id="transportation"
        value={newTransportation}
        onChange={(e) => setTransportation(e.target.value)}
        />
        <button className="border-2 border-black rounded-md px-2 mx-1" type="submit">Confirm Update</button>
        <button className="border-2 border-black rounded-md px-2 mx-1" type="button" onClick={() => setShowTransportationPopup(false)}>
        Cancel
        </button>
    </form>
    </div>
)}
{!showTransportationPopup && (
    <button className="border-2 border-black rounded-md px-2 mx-1" onClick={() => setShowTransportationPopup(true)}>Update Transportation</button>
)}

<br />

<label className='font-semibold'>Food: </label>
{!showFoodPopup && (
    <input
    className="border-solid border-2 border-black rounded-md text-center mx-1 my-2"
    type="number"
    id="food"
    value={newFood}
    onChange={(e) => setFood(e.target.value)}
    />
)}
{showFoodPopup && (
    <div className="popup">
    <form onSubmit={updateFood}>
        <label className='font-semibold'>Update Food Here: </label>
        <input
        className="border-solid border-2 border-black rounded-md text-center mx-1 my-2"
        type="number"
        id="food"
        value={newFood}
        onChange={(e) => setFood(e.target.value)}
        />
        <button className="border-2 border-black rounded-md px-2 mx-1" type="submit">Confirm Update</button>
        <button className="border-2 border-black rounded-md px-2 mx-1" type="button" onClick={() => setShowFoodPopup(false)}>
        Cancel
        </button>
    </form>
    </div>
)}
{!showFoodPopup && (
    <button className="border-2 border-black rounded-md px-2 mx-1" onClick={() => setShowFoodPopup(true)}>Update Food</button>
)}

    <br />

    <label className='font-semibold'>Entertainment: </label>
    {!showEntertainmentPopup && (
    <input
    className="border-solid border-2 border-black rounded-md text-center mx-1 my-2"
    type="number"
    id="entertainment"
    value={newEntertainment}
    onChange={(e) => setEntertainment(e.target.value)}
    />
)}
{showEntertainmentPopup && (
    <div className="popup">
    <form onSubmit={updateEntertainment}>
        <label className='font-semibold'>Update Entertainment Here: </label>
        <input
        className="border-solid border-2 border-black rounded-md text-center mx-1 my-2"
        type="number"
        id="entertainment"
        value={newEntertainment}
        onChange={(e) => setEntertainment(e.target.value)}
        />
        <button className="border-2 border-black rounded-md px-2 mx-1" type="submit">Confirm Update</button>
        <button className="border-2 border-black rounded-md px-2 mx-1" type="button" onClick={() => setShowEntertainmentPopup(false)}>
        Cancel
        </button>
    </form>
    </div>
)}
{!showEntertainmentPopup && (
    <button className="border-2 border-black rounded-md px-2 mx-1" onClick={() => setShowEntertainmentPopup(true)}>Update Entertainment</button>
)}

<br />

<label className='font-semibold'>Saving: </label>
{!showSavingPopup && (
    <input
    className="border-solid border-2 border-black rounded-md text-center mx-1 my-2"
    type="number"
    id="saving"
    value={newSaving}
    onChange={(e) => setSaving(e.target.value)}
    />
)}
{showSavingPopup && (
    <div className="popup">
    <form onSubmit={updateSaving}>
        <label className='font-semibold'>Update Saving Here: </label>
        <input
        className="border-solid border-2 border-black rounded-md text-center mx-1 my-2"
        type="number"
        id="saving"
        value={newSaving}
        onChange={(e) => setSaving(e.target.value)}
        />
        <button className="border-2 border-black rounded-md px-2 mx-1" type="submit">Confirm Update</button>
        <button className="border-2 border-black rounded-md px-2 mx-1" type="button" onClick={() => setShowSavingPopup(false)}>
        Cancel
        </button>
    </form>
    </div>
)}
{!showSavingPopup && (
    <button className="border-2 border-black rounded-md px-2 mx-1" onClick={() => setShowSavingPopup(true)}>Update Saving</button>
)}

    <br />

    <label className='font-semibold'>Miscellaneous: </label>
    {!showMiscellaneousPopup && (
        <input
        className="border-solid border-2 border-black rounded-md text-center mx-1 my-2"
        type="number"
        id="miscellaneous"
        value={newMiscellaneous}
        onChange={(e) => setMiscellaneous(e.target.value)}
        />
        
    )}
    {showMiscellaneousPopup && (
        <div className="popup">
        <form onSubmit={updateMiscellaneous}>
            <label className='font-semibold'>Update Miscellaneous Here: </label>
            <input
            className="border-solid border-2 border-black rounded-md text-center mx-1 my-2"
            type="number"
            id="miscellaneous"
            value={newMiscellaneous}
            onChange={(e) => setMiscellaneous(e.target.value)}
            />
            <button className="border-2 border-black rounded-md px-2 mx-1" type="submit">Confirm Update</button>
            <button className="border-2 border-black rounded-md px-2 mx-1" type="button" onClick={() => setShowMiscellaneousPopup(false)}>
            Cancel
            </button>
        </form>
        </div>
    )}
    {!showMiscellaneousPopup && (
        <button className="border-2 border-black rounded-md px-2 mx-1" onClick={() => setShowMiscellaneousPopup(true)}>Update Miscellaneous</button>
    )}
    
    <div>
        <br/>
        <button className="border-2 rounded-md bg-blue-600 text-white px-4" onClick={handleSubmit}>Submit Budget</button>
    </div>
</div>
)


}

export default AddBudget;