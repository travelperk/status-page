import React from "react";
import {IncidentUpdate as IncidentUpdateInterface} from "../../api";
import styled from "styled-components";

type Props = {
    update: IncidentUpdateInterface
}

const StatusLabel = styled.span<{ state: IncidentUpdateInterface['type']}>`
    color: ${props => props.state === 'resolved' ? 
    '#0FA863' : props.state === 'update' ? 
        'rgba(0,0,0,0.8)' : '#FFC82C'};
    font-weight: bold;
    text-transform: capitalize;
`

const StatusWrapper = styled.div`
    margin: 2rem 0;
`

const TimeWrapper = styled.span`
    font-style: italic;
    color: rgba(0, 0, 0, 0.5)
`


const IncidentUpdate = (props: Props) => {
    const { update } = props
    return (
        <StatusWrapper>
            <StatusLabel state={update.type}>{update.type}</StatusLabel> - {update.description}
            <br/>
            <TimeWrapper>
                {update.timestamp.toDate().toUTCString()}
            </TimeWrapper>
        </StatusWrapper>)
}

export default IncidentUpdate