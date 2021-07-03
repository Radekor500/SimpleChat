import { Link } from 'react-router-dom';
import './login.css'
function Login({onUserChange,loadUser}) {
    return(
        <div>
            <div className='container'>
                    <div className='formui'>
                        <label  htmlFor='username'>Username</label>
                        <input onChange={(event) => onUserChange(event)} className='user' type='text' name='username'></input>
                        <Link to='/rooms'>
                            <button onClick={loadUser} className='loginbtn'>Start chatting</button>
                        </Link>
                    </div>

            </div>
        </div>
    )
}


export default Login;