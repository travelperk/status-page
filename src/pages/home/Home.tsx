import  React, { useState, useEffect } from 'react';
import { getAllIncidents } from '../../api/index';
import Status from './Status';

const Home = () => {
    const [incidentList, setIncidentList] = useState()
    useEffect(() =>{
        getAllIncidents(setIncidentList)
    }, [])

    if(!incidentList){
        return (<div>Loading ...</div>)
    }

    return (
        <Status
            incidentList={incidentList}
        />
    )
}

export default Home