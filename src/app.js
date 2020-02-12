import React, {useEffect} from 'react';

export const App = () => {

    useEffect(()=>{
        console.log('Hey !')
    },[])
    
    return (<div>
        <p>
            Hola React
        </p>
    </div>)
}