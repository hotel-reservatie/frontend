import React from 'react'

const Header = () => {
  return (
    <header className=" bg-white flex flex-row align-middle justify-between px-4 py-7">
      <div className="flex flex-row">
        <div>
          <p>logo</p>
        </div>
        <div className="flex flex-row">
          <p>About</p>
          <p>Rooms</p>
          <p>Contact</p>
        </div>
      </div>
      <div className="">
        <button>Sign In</button>
        <button>Register</button>
      </div>
    </header>
  )
}

export default Header
