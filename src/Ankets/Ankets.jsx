import React, { useEffect } from 'react'
import cls from './Ankets.module.scss'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'


const Ankets = () => {
  const [ankets, setAnkets] = React.useState([])
  const [search, setSearch] = React.useState('')  
  const [speciality, setSpeciality] = React.useState([])
  const [specialityBtn, setSpecialityBtn] = React.useState('') 
  const [change, setChange] = React.useState(null)
  const [specialityTitle, setSpecialityTitle] = React.useState('')
  
  const {
    register,
    handleSubmit
    
  } = useForm()
  
  const getAnkets = async () =>{
    try{
      const res = await axios.get("http://localhost:3000/posts")
      setAnkets(res.data)
    }catch(e){
      console.log(e);
    }
    }
    
    useEffect(() => {
      getAnkets()
    }, [])
    
    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:3000/posts/${id}`)
        
        let updatedAnkets = ankets.filter(i => i.id !== id)
        
        setAnkets(updatedAnkets);
      } catch (e) {
        console.log(e);
      }
    }
    
    
    const searchAnkets = ankets.filter(i => {
      const name = i.name.toLowerCase()
      const searchs = search.toLowerCase()
      
      return name.includes(searchs)
    })

    const specialityNav = async () =>{
      try{
        const res = await axios.get("http://localhost:3000/speciality")
        setSpeciality(res.data)
      }catch(e){
        console.log(e);
      }
    }
    
    useEffect(() => {
      specialityNav()
    }, [])
    
    const handleBtn = (speciality) => {
      if (specialityBtn === speciality) {
        setSpecialityBtn('')
      } else {
        setSpecialityBtn(speciality)
      }
    };
    
    const filtered = searchAnkets.filter(i => {
      return specialityBtn == '' || specialityBtn == i.speciality
    })
    
    const [name, setName] = React.useState(null)
    
    const handleChange = (id, name) =>{
      if(change !== id){
        setName(name)
        setChange(id)
      }else{
        setName(null)
        setChange(null)
      }
    }
    const handleEdit = async (data, id) => {
      try{
        await axios.patch(`http://localhost:3000/posts/${id}`, data)
        setAnkets(prev =>
          prev.map(i => (i.id === id ? { ...i, ...data } : i))
        );
        setChange(null)
        setName(null)
      }catch(e){
        console.log(e);
      }
    }
    
    return (
      <div className={cls.root}>
        <input 
            type="text"
            placeholder='Поиск' 
            onChange={e => setSearch(e.target.value)}
            value={search}
            />
        <div className={cls.specialityNav}>
          <p>Фильтр по Специальности: </p>
          {speciality && speciality.map(i => (
            <button 
              onClick={() => handleBtn(i.speciality)} 
              className={specialityBtn === i.speciality ? cls.activeBtn : ''}
              >
                {i.speciality}
              </button>
          ))
          }
        </div>
        <div className={cls.cards}>
            {filtered && filtered.map(i => (
            <form className={cls.card} onSubmit={handleSubmit(data => handleEdit(data, i.id))}>
                <div className={cls.photo}>
                  <Link to={`/singlePage/${i.id}`}><img src={i.foto} alt=''/></Link>
                </div>
                <div>Имя: 
                  {
                    name == i.name && (
                      <input 
                        className={cls.change}
                        {...register('name', {required: 'Обязательное поле'})} 
                        type='text'
                        defaultValue={i.name}
                      />
                    ) || i.name} 
                    <img 
                      onClick={() => handleChange(i.id, i.name)}
                      className={cls.edit}
                      src="https://cdn.icon-icons.com/icons2/2793/PNG/512/compose_edit_modify_icon_177770.png" alt=""
                    />
                </div>

                <div>Описание: 
                  {
                    name == i.description && (
                        <input 
                          className={cls.change} 
                          {...register('description', {required: 'Обязательное поле'})} 
                          type='text'
                          defaultValue={i.description}
                        />
                      ) || i.description}
                      <img
                        onClick={() => handleChange(i.id, i.description)}
                        className={cls.edit}
                        src="https://cdn.icon-icons.com/icons2/2793/PNG/512/compose_edit_modify_icon_177770.png" alt="" 
                      />
                </div>

                <div>Специальность: 
                  {
                    name == i.speciality && (
                      <select
                          {...register('speciality', {
                            required: 'Обязательное поле'
                          })}
                          defaultValue={i.speciality}
                          onChange={(e) => setSpecialityTitle(e.target.value)}
                        >
                          {speciality && speciality.map((i) => (
                            <option key={i.id} value={i.speciality}>
                              {i.speciality}
                            </option>
                          ))}
                      </select>
                      ) || i.speciality}

                      <img 
                        onClick={() => handleChange(i.id, i.speciality)}
                        className={cls.edit}
                        src="https://cdn.icon-icons.com/icons2/2793/PNG/512/compose_edit_modify_icon_177770.png" alt="" 
                      />
                </div>
                {
                  change === i.id && (
                    <button>Сохранить</button>
                  )
                }
                <button className={cls.delete} onClick={() => handleDelete(i.id)}>Удалить</button>
            </form>
            ))
            }
        </div>
      </div>
    )
}

export default Ankets
