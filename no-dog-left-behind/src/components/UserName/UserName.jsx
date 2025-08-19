import './user-name.css'

const UserName = () => {
    const name = localStorage.getItem('user-name') ? localStorage.getItem('user-name') : null

    return (
        <div className={name ? "name-container" : ""}>
            {name ? <h1>Welcome Back, {name.replace(/^"|"$/g, '')}!</h1> : ""}
        </div>
    )
}

export default UserName
