import React from 'react'
import cls from './SignIn.module.scss'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Link, Navigate, useNavigate} from 'react-router-dom'

const SignIn = ({setLogin}) => {
    const [errorMessage, setErrorMessage] = React.useState('')
    const {
        handleSubmit,
        register

    } = useForm()

    const navigate = useNavigate()

    const onSubmit = async (body) =>{
        const { data } = await axios.get("http://localhost:3000/users")
        
        data.forEach(i => {
            if(i.password === body.password && i.email === body.email){
                navigate('/')
                localStorage.setItem('user', JSON.stringify(i))
                setLogin(JSON.parse(localStorage.getItem('user')))
            }else if(i.password !== body.password){
                setErrorMessage('Неверный пароль')
            }else if(i.email !== body.email){
                setErrorMessage('Пользователя с таким емайл не существует')
            }else{
                setErrorMessage("Такого пользователя не существует")
            }
        });
    }

  return (
    <div className={cls.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={cls.card}>
            <input type="email" placeholder='Емайл'{...register('email', {required: 'Емайл обязателен'})}/>
            <input type="password" placeholder='Пароль'{...register('password', {required: 'Пароль обязателен'})}/>
        </div>
        <button>submit</button>
        <p style={{color: "red"}}>{errorMessage}</p>
        <p>У вас нету аккаунта? <Link to='/signup'>Зарегистрируйтесь</Link></p>
      </form>
    </div>
  )
}

export default SignIn

