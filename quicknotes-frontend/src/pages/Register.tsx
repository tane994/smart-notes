import { useState } from 'react';
import SDK from '../sdk/api';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const navigate = useNavigate();

  const handleRegistration = async() => {
    try {
      await SDK.register({username, password, email})
      navigate('/')
    } catch(err) {
      console.log('Registration failed.', err)
    }
  }

  return (
    <div className='p-6 flex flex-col gap-2 max-w-sm mx-auto'>
      <input placeholder={'email'} className='border p-2' value={email} onChange={(e) => {setEmail(e.target.value)}} />
      <input placeholder={'username'} className='border p-2' value={username} onChange={(e) => {setUsername(e.target.value)}} />
      <input placeholder={'password'} className='border p-2' type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
      <button className='btn ' onClick={handleRegistration}>Register</button>
      <p>Already have an account? <Link to='/login' className='underline text-gray-400 hover:text-gray-600'>Login</Link></p>
    </div>
  )
}

export default Register