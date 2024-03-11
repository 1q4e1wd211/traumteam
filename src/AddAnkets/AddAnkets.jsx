import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import cls from './AddAnkets.module.scss'
import axios from 'axios'

const AddAnkets = () => {
  const [speciality, setSpeciality] = useState([])
  const [specialityTitle, setSpecialityTitle] = React.useState('')

    const {
        register,
        handleSubmit,
        reset
        
      } = useForm()

    const postAddAnkets = async (body) =>{
      try{
        axios.post("http://localhost:3000/posts", body)
        reset()
      }catch(e){
        console.log(e);
      }
    }

    const getSpeciality = async () =>{
      try{
        const res = await axios.get("http://localhost:3000/speciality")
        setSpeciality(res.data)
      }catch(e){
        console.log(e);
      }
    }

    useEffect(() => {
      getSpeciality()
    }, [])

  return (
    <div className={cls.root}>
      <h1>Создайте новую анкеты</h1>
      <form onSubmit={handleSubmit(postAddAnkets)}>
        <input 
          type="text" 
          {...register('name',{
            required: 'Обязательное поле'
          })}
          placeholder='Имя'
        />
        <input
          type="text"
          {...register('description', {
            required: 'Обязательное поле'
          })}
          placeholder='описание'
        />
        <input 
          type="text"
          {...register('foto', {
            required: 'Обязательное поле'
          })}
          placeholder='Фото доктора'
        />
        <p>Специальность:</p>
        <select
            {...register('speciality', {
              required: 'Обязательное поле'
            })}
            value={specialityTitle}
            onChange={(e) => setSpecialityTitle(e.target.value)}
          >
            {speciality && speciality.map((i) => (
              <option key={i.id} value={i.speciality}>
                {i.speciality}
              </option>
            ))}
        </select>
        <button>Создать</button>
      </form>
    </div>
  )
}

export default AddAnkets
