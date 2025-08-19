import './user-name.css'

const UserName = () => {
    const name = localStorage.getItem('user-name') ? localStorage.getItem('user-name') : null

    return (
        <div>
            {name ? <h1>`Welcome ${name}!`</h1> : ""}
        </div>
    )
}

export default UserName
