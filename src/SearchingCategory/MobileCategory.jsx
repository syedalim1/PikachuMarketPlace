import { useNavigate } from 'react-router-dom'

function MobileCategory =({mobile})=> {
    const navication=useNavigate();
    console.log("Mobile Details "+mobile);
    if(!mobile){
        return(
            <div className='text-center text-gray-500'>No Mobiles Data Available </div>
        )
    }
    
  return (
    <div>MobileCategory</div>
  )
}

export default MobileCategory