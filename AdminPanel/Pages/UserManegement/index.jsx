import React from 'react'

const UserMangement = () => {
  return (
<>
<div className='tableborder'>
<table>
    <thead>
        <tr>User ID</tr>
        <tr>Name</tr>
        <tr>Email</tr>
        <tr>Status</tr>
    </thead>
    <tbody>
       { UserMangement.data.map((index,user) =>(
            <tr key={index}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.status}</td>
              </tr>
            ))}
    </tbody>
</table>
</div></>
  )
}

export default UserMangement