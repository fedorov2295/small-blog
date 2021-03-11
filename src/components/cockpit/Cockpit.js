import React, {useEffect, useRef, useContext} from 'react';
import classes from './Cockpit.css';
import AuthContext from '../../context/auth-context'

const Cockpit = (props) => {

    const toggleButtonRef = useRef(null);
    const authContext  = useContext(AuthContext);

    useEffect(() => {
        console.log('[cockpit.js] useEffect')
        //Http request...
        // setTimeout(() => {
        //     alert('Saved data to cloud');
        // }, 1000);
        toggleButtonRef.current.click();
        return () => {
            console.log('[Cockpit.js] cleanup work in useEffect')
        }
    }, []);

    useEffect (() => {
        console.log('[cockpit.js] 2nd useEffect')
        return () => {
            console.log('[Cockpit.js] cleanup work in 2nd useEffect')
        };
    })

    const assignedclasses = [];
    let btnClasses = '';
    if (props.showPersons) {
        btnClasses = classes.Red;
    }

    if (props.personsLength <= 2) {
        assignedclasses.push(classes.red);
    }
    if (props.personsLength <= 1) {
        assignedclasses.push(classes.bold);
    }

    return (
        <div className={classes.Cockpit}>
            <h1>Hi, I'm a React App</h1>
            <p className={assignedclasses.join(' ')}>This is really working!</p>
            <button
                ref={toggleButtonRef}
                className={btnClasses}
                onClick={props.togglePersons}>Toggle Persons
        </button>
        <button onClick={authContext.login}>Log in</button>
        
        </div>
    );
}

export default React.memo(Cockpit);