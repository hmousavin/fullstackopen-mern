const Togglable = ({newBlogVisibility, setNewBlogVisibility}) => {
    const toggleVisbiliy = () => {
        setNewBlogVisibility(!newBlogVisibility)

        document.getElementById("toggle-visibliy-btn").innerText = newBlogVisibility ? 'new blog' : 'cancel'
    }

    return (
        <div>
            <button id="toggle-visibliy-btn" onClick={toggleVisbiliy}>new blog</button>
        </div>
    )
}

export default Togglable