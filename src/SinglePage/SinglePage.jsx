
import React, { useEffect, useState } from 'react';
import cls from './SinglePage.module.scss';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import BasicTimePicker from '../MyTimePicker';


const SinglePage = () => {
  const {
    register,
    handleSubmit

  } = useForm()

  const { id } = useParams();
  const [anket, setAnket] = useState(null)
  const [change, setChange] = useState(null)
  const [speciality, setSpeciality] = React.useState([])
  const [date, setDate] = React.useState("")
  const [time, setTime] = React.useState("")
  const [error, setError] = React.useState('')

  
  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/posts`);
      const anketData = res.data.find(item => item.id === id);
      
      if (anketData) {
        setAnket(anketData)
      } else {
        console.log(`${id} not found`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [id])
  
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
  
  
  const handleChange = (nae) =>{
    if (change !== nae) {
      setChange(nae)
    }else{
      setChange(null)
    }
  }
  
  const handleEdit = async (id, data) => {
    try{
      await axios.patch(`http://localhost:3000/posts/${id}`, data)
      
      setAnket(prev => ({ ...prev, ...data }));
      setChange(null)
    }catch(e){
      console.log(e);
    }
  }

  const postTime = async (tim, date) => {
    const newTime = {
      time: tim,
    }
  
    const id = anket.id
  
    try {
      const { data } = await axios.get(`http://localhost:3000/posts/${id}`)
      const existingTimes = data[date] || [];
      const timeExists = existingTimes.some(i => i.time === newTime.time);
  
      if (!timeExists) {
        existingTimes.push(newTime);

        
        await axios.patch(`http://localhost:3000/posts/${id}`, { [date]: existingTimes });
        setError('')
      } else {
        console.log('В это время врач занят');
        setError('В это время Врач занят')
      }
      setAnket((prevAnket) => ({
        ...prevAnket,
        [date]: existingTimes,
      }));
    } catch (e) {
      console.log(e);
    }
  }
  

  
  return (
    <div>
      {anket && (
        <form className={cls.root} onSubmit={handleSubmit(data => handleEdit(anket.id, data))}>
          <div className={cls.left}>
            <img src={anket.foto} alt='' />
            <h2>Имя: 
                  {
                    change == anket.name && (
                      <input 
                      className={cls.change}
                      {...register('name', {required: 'Обязательное поле'})} 
                      type='text'
                        defaultValue={anket.name}
                      />
                    ) || anket.name} 
                    <img 
                      onClick={() => handleChange(anket.name)}
                      className={cls.edit}
                      src="https://cdn.icon-icons.com/icons2/2793/PNG/512/compose_edit_modify_icon_177770.png" alt=""
                    />
            </h2>
            <p>Описание:
            {
              change == anket.description && (
                        <input 
                          className={cls.change} 
                          {...register('description', {required: 'Обязательное поле'})} 
                          type='text'
                          defaultValue={anket.description}
                        />
                      ) || anket.description}
                      <img
                        onClick={() => handleChange(anket.description)}
                        className={cls.edit}
                        src="https://cdn.icon-icons.com/icons2/2793/PNG/512/compose_edit_modify_icon_177770.png" alt="" 
                      />      
            </p>
            <div>Специальность: 
                  {
                    change == anket.speciality && (
                      <select
                          {...register('speciality', {
                            required: 'Обязательное поле'
                          })}
                          defaultValue={anket.speciality}
                        >
                          {speciality && speciality.map((i) => (
                            <option key={i.id} value={i.speciality}>
                              {i.speciality}
                            </option>
                          ))}
                      </select>
                      ) || anket.speciality}

                      <img 
                        onClick={() => handleChange(anket.speciality)}
                        className={cls.edit}
                        src="https://cdn.icon-icons.com/icons2/2793/PNG/512/compose_edit_modify_icon_177770.png" alt="" 
                      />
                </div>
            {
              change && (<button onSubmit={() => handleEdit(anket.id)}>Сохранить</button>)
            }
          </div>
          <div className={cls.right}>
            <h3>Занятое время</h3>
            <div className={cls.data}>
            {
            !date ? (
              <div>Вы еще не выбрали день</div>
            ) : (
              <div className={cls.time}>
                <div>
                  {
                    anket[date] ? (
                      anket[date].map(i => (
                        <li key={i.time}>{i.time}</li>
                      ))
                    ) : (
                      <div>В этот день доктор полностью свободен</div>
                    )
                  }
                </div>
                <div className={cls.z}>
                  {
                    error && (
                      <p>{error}</p>
                    )
                  }
                  <div className={cls.ti}>
                    {/* <BasicTimePicker time={time} setTime={setTime}/> */}
                    <input type="time" value={time} onChange={e => setTime(e.target.value)}/>
                    <button className={error && cls.error} onClick={() => postTime(time, date)}>Записаться</button>
                  </div> 
                </div>
              </div>
            )
          }
          </div>
          </div>
          <div>
            <p>Выберите день для записи</p>
            <input type="date" onChange={e => setDate(e.target.value)} value={date}/>
          </div>
        </form>
      )}
    </div>
  );
}

export default SinglePage;