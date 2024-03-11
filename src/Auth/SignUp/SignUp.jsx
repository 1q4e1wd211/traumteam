import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import cls from './SignUp.module.scss'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {

    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
        
      } = useForm()

    const onSubmit = async (body) =>{
        try{
            const newBody = {
                email: body.email,
                login: body.login,
                password: body.password,
                basket: [],
                isAdmin: false
            }
            await axios.post('http://localhost:3000/users', newBody)
            reset()
            navigate('/signin')
        }catch(e){
            console.log(e);
        }
    }

    const password = watch("password");

  return (
    <div className={cls.root}>
       <form onSubmit={handleSubmit(onSubmit)}>
          <div className={cls.card}>
            <div className={cls.email}>
                <input
                type="text"
                placeholder='Ваш Email'
                {...register('email', {
                    required: 'Email обязателен',
                    pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
                    message: 'Введите корректный email',
                    },
                })}
                />
                {errors.email && <span className={cls.errorMessage}>{errors.email.message}</span>}
            </div>

            <div className={cls.login}>
                <input
                type="text"
                placeholder='Логин'
                {...register('login', {
                    required: 'Логин обязателен',
                    minLength: {
                    value: 6,
                    message: 'Логин должен быть не менее 4 символов',
                    },
                    maxLength: {
                    value: 20,
                    message: 'Логин должен быть не более 20 символов',
                    },
                })}
                />
                {errors.login && <span className={cls.errorMessage}>{errors.login.message}</span>}
            </div>
            <div className={cls.passwords}>
                <div className={cls.password}>
                <input
                    type="password"
                    placeholder='Пароль'
                    {...register('password', {
                    required: 'Пароль обязателен',
                    minLength: {
                        value: 6,
                        message: 'Пароль должен быть не менее 6 символов',
                    },
                    })}
                />
                {errors.password && <span className={cls.errorMessage}>{errors.password.message}</span>}
                </div>
                <div className={cls.password2}>
                <input
                    type="password"
                    placeholder='Повторите пароль'
                    {...register('passwordConfirm', {
                    validate: (value) => value === password || 'Пароли не совпадают', // Используйте значение password для проверки совпадения паролей
                    })}
                />
                {errors.passwordConfirm && (
                    <span className={cls.errorMessage}>{errors.passwordConfirm.message}</span>
                )}
                </div>
            </div>
          </div>


          <button
            type="submit"
          >
            Зарегистрироваться
          </button>
            <p>У вас есть аккаунт? <Link to='/signin'>Войдите</Link></p>
        </form>
    </div>
  )
}

export default SignUp
