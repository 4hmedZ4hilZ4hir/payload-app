import React from 'react'

// Renders the welcome text on the login page.
const BeforeLogin: React.FC = () => {
  // Returns the login welcome message.
  return (
    <div>
      <p>
        <b>Welcome to your dashboard!</b>
        {' This is where site admins will log in to manage your website.'}
      </p>
    </div>
  )
}

// Exports the login welcome component.
export default BeforeLogin
