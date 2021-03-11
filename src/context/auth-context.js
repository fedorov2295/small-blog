import React from 'react';

const authContext = React.createContext({
    authinticated: false,
    login:() => {}
});

export default authContext;