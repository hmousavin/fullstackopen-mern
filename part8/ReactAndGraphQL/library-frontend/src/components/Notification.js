import React, { useEffect, useState } from 'react';

const StyleType = {
    'unknown': {fontWeight: 'normal', color: 'black'},
    'success': {fontWeight: 'bold',   color: 'green'},
    'failure': {fontWeight: 'bold',   color: 'red'}
}
const TimeoutDuration = {
    'unknown': 0,
    'success': 1000,
    'failure': 3000
}

const Notification = (props) => {
    const { message, type} = props;
    const [ show, setShow ] = useState(true);

    const selectedStyle = () => {
        switch (type) {
            case 'success': return StyleType['success']
            case 'failure': return StyleType['failure']
            default:        return StyleType['unknown']
        }
    }
    
    useEffect(() => {
        if (Object.keys(StyleType).includes(type)) {
            setShow(true);
            const timer = setTimeout(() => setShow(false), TimeoutDuration[type]);
            return () => clearTimeout(timer);
        }
    }, [message, type]);

    return show ? <main style={selectedStyle()}>{message}</main> : null;
}

export default Notification;
