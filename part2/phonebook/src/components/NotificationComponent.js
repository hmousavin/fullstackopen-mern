const Notification = ({caption, type}) => {
    if (caption !== '' && ['success', 'failure', 'warning'].includes(type))
        return (
            <div className={type}>
                {caption}
            </div>
        );
    else 
        return <div className={''}></div>;
}

export default Notification;