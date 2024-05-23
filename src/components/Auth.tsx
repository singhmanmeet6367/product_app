import React, { useState } from 'react'
import Register from './Register'
import Login from './Login'
function Auth() {
  const [reg, setReg] = useState(false);
  return (
    <div>
      {
        reg ? <Register setReg={setReg} /> : <Login setReg={setReg} />
      }
    </div>
  )
}

export default Auth
