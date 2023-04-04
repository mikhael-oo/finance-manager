export const Account = () => {
    return (
        <div>
            <label htmlFor='accountFName'>First Name: </label>
            <input type='text' id='accountFName' value="" readOnly/>

            <label htmlFor='accountLName'>Last Name: </label>
            <input type='text' id='accountLName' value="" readOnly/>
            <br/>
            <br/>
            <label htmlFor='accountUName'>Username: </label>
            <input type='text' id='accountUName' value="" readOnly/>

            <label htmlFor='accountEmail'>Email: </label>
            <input type='text' id='accountEmail' value="" readOnly/>
        </div>
    );
};