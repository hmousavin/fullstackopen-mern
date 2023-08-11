const Notification = ({ errorMessage, successMessage }) => {
    if (successMessage === null && errorMessage === null) {
      return null
    } else if (successMessage){
      return (
        <div style={{color: "green", background: 'lightgray', borderStyle: 'solid', borderRadius: 4, padding: 10, margin_bottom: 10}}>
          {successMessage}
        </div>
      )
    } else {
      return (
        <div style={{color: "red", background: 'lightgray', borderStyle: 'solid', borderRadius: 4, padding: 10, margin_bottom: 10}}>
          {errorMessage}
        </div>
      )
    }
  }

export default Notification;