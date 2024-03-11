import React, { useEffect } from 'react'
import cls from './AddSpeciality.module.scss'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const AddSpeciality = () => {
    const [speciality, setSpeciality] = React.useState([])

    const {
        register,
        handleSubmit,
        reset
        
      } = useForm()

    const postAddAnkets = async (body) =>{
      try{
        axios.post("http://localhost:3000/speciality", body)
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
    
    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:3000/speciality/${id}`)
        
        let updatedAnkets = speciality.filter(i => i.id !== id)
        
        setSpeciality(updatedAnkets);
      } catch (e) {
        console.log(e);
      }
    };
    
    const reloadPage = () => {
      window.location.reload();
    };
    return (
    <div className={cls.root}>
      <h1>Создать новую специальность</h1>
      <form onSubmit={handleSubmit(postAddAnkets)}>
        <input 
            type="text"
            {...register('speciality', {
                required: 'Обязательное поле'
            })}
            placeholder='Создать специальность'
        />
        <button onClick={reloadPage}>Создать</button>
      </form>
      <div>
        <h1 className={cls.bot}>Все Специальности:</h1>
        {speciality.map((i) => (
          <div className={cls.speciality}>
            <div>{i.speciality}</div>
            <button className={cls.delete} onClick={() => handleDelete(i.id)}>Удалить</button>
          </div>
        ))
        }
      </div>
    </div>
  )
}

export default AddSpeciality
