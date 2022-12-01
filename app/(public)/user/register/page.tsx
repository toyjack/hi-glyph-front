'use client'
import React from 'react'
import {useState} from 'react'

function RegisterPage() {
  const [email, setEmail]= useState('')
  const [password, setPassword]= useState('')
  const [passwordConfirmation, setPasswordConfirmation]= useState('')

  const handleSubmit= async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password !== passwordConfirmation) {
      alert('パスワードが一致しません')
      return
    }
    console.log({email, password, passwordConfirmation})

    const res = await fetch(
      "https://glyph.lab.hi.u-tokyo.ac.jp/auth/register",
      {
        cache: "no-cache",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );
    const data = await res.json();
    if (data.error) {
      alert(data.error);
      return;
    }

    console.log(data);
  }

  const handleEmailChange= (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange= (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }
  const handlePasswordConfirmationChange= (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirmation(e.target.value)
  }
  
  return (
    <div className="flex flex-grow py-4 w-1/3 items-center justify-center">
      <div className=" rounded-box shadow-lg p-4 bg-base-100">
        <h2 className="text-lg font-bold">ユーザー登録</h2>
        <form action="#" className="flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input className=" input input-primary" type="email" id="email" value={email} onChange={handleEmailChange} />

          <label htmlFor="password">Password:</label>
          <input
            className=" input input-primary"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />

          <label htmlFor="repassword">Re-password:</label>
          <input
            className=" input input-primary"
            type="password"
            id="repassword"
            value={passwordConfirmation}
            onChange={handlePasswordConfirmationChange}
          />

          <input className='btn btn-primary pt-3' type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}

export default RegisterPage