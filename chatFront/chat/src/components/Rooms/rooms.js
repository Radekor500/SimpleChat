import './rooms.css';
import FormControl from '@material-ui/core/FormControl';
import { Link } from 'react-router-dom';


function Rooms({onRoomChange}) {
    return (
        <div>
            <div className='grid-wrap'>
                <div className='room-form'>
                    
                        {/* <label>Create private room</label> */}
                        <input onChange={(event) => onRoomChange(event)} placeholder='Create private room' type='text'></input>
                        <Link to='/'><button>Create</button></Link>
                        
                    
                </div>
                <div className='room'><p>Room1</p></div>
                <div className='room'>Room 2</div>
                <div className='room'>Room 3</div>
                <div className='room'>Room 4</div>
                <div className='room'>Room 5</div>
                <div className='room'>Room 6</div>
                <div className='room'>Room 7</div>
            </div>
        </div>
    )

}

export default Rooms;