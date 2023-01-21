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
    <div className="flex py-4 items-center justify-center">
      <div className="flex flex-col rounded-box shadow-lg p-4 bg-base-100">
        <h2 className="text-lg font-bold">ユーザー登録</h2>

        <form action="#" className="flex flex-col py-2" onSubmit={handleSubmit}>
          <div className="flex flex-col py-4">
            <label htmlFor="email">Email</label>
            <input
              className=" input input-primary"
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          <div className="flex flex-col py-4">
            <label htmlFor="password">Password:</label>
            <input
              className=" input input-primary"
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          <div className="flex flex-col py-4">
            <label htmlFor="repassword">Re-password:</label>
            <input
              className=" input input-primary"
              type="password"
              id="repassword"
              value={passwordConfirmation}
              onChange={handlePasswordConfirmationChange}
            />
          </div>
          <div className="flex flex-col py-4">
            <input
              className="btn btn-primary pt-3"
              type="submit"
              value="登録"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage