import { useSelector } from 'react-redux'

const Styles = {
  info: {
    color: 'green',
    background: 'lightgray',
    borderStyle: 'solid',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10
  },
  error: {
    color: 'red',
    background: 'lightgray',
    borderStyle: 'solid',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10
  },
}

const Notification = () => {
  const notification = useSelector(state => state.notification)
  return (
    <div style={Styles[notification.type]}>
      {notification.caption}
    </div>
  )
}

export default Notification