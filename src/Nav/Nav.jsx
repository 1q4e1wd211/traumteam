import React, { useEffect } from 'react'
import cls from './Nav.module.scss'
import { Link } from 'react-router-dom'
import { FaBasketShopping } from "react-icons/fa6";
import { MdKeyboardArrowUp } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import { FaMinusCircle } from "react-icons/fa";
import axios from 'axios';



const Nav = ({login, setLogin, bas, setBas, count, setCount}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [style, setStyle] = React.useState(null)
  const user = JSON.parse(localStorage.getItem("user"))


  const click = () =>{
    localStorage.removeItem('user')
    setLogin(null)
  }

  const handleOpen = () =>{
    if(isOpen == false){
      setStyle({top: '100px'})
      setIsOpen(true)
      setCount(0)
    }else{
      setStyle({top: "-500px"})
      setIsOpen(false)
      setCount(0)
    }
  }


  const handleBuy = async () => {
    try{
      let userId = user.id
      await axios.patch(`http://localhost:3000/users/${userId}`, {basket: bas})
      setBas([])
    }catch(e){
      console.log(e);
    }
  }

  const remove = (id) =>{
    let upd = bas.filter(i => id != i.id)
    setBas(upd)
  }


  return (
    <div className={cls.nav}>
        <Link to='/'><img src="https://i.namu.wiki/i/a3GkhQuvwxycyyNIHB1NyYbwBoGS_F97T7a5UpDWQpnn7RpltuCq7rTg9ydpB2-Irum_UE05LSyhWR9tsGTEwA.svg" alt="" /></Link>
        <div className={cls.link}>
          {/* <p>Doctor</p>
          <p>Местоположение</p>
          <p className={cls.platinium}>Платиновые Услуги<i class="fa-solid fa-shield-heart"></i></p> */}
          {/* <Link to='/addAnkets'><p>Создать профиль</p></Link>
          <Link to='/addSpeciality'><p>Создать специальность</p></Link> */}
          <div className={cls.basket} style={style}>
            <h2 onClick={handleOpen}><RxCrossCircled /></h2>
            {
              <div>
                {
                  bas.map(i => (
                    <div style={{margin: "5px", alignItems: 'center', marginTop: "20px", borderBottom: "dashed 2px black"}}>
                      <p>{i.title}</p>
                      <div style={{display: "flex", alignItems: 'center', justifyContent: "space-between"}}>
                        <p>{+i.price}$</p>
                        <p onClick={() => remove(i.id)}><FaMinusCircle/></p>
                      </div>
                    </div>
                  ))
                }
                {
                 bas.length != 0 ? (<button className={cls.buy} onClick={() => handleBuy()}>buy</button>) : (<div></div>)
                }
                {
                  isOpen == false ? 
                  (<div>
                      <button className={cls.button} onClick={handleOpen}><FaBasketShopping /></button>
                      {
                        count == 0 ? (<div></div>) : (<p className={cls.p}>{count}</p>)
                      }
                    </div>
                  ):
                  (<button className={cls.button} onClick={handleOpen}><MdKeyboardArrowUp /></button>)}      
              </div>
            }
          </div>
          {login ? (
            <Link to='/signin'><button onClick={click}><i class="fa-solid fa-arrow-right-from-bracket"></i></button></Link>
          ):(
            <Link to='/signin'><button onClick={click}><i class="fa-solid fa-user"></i></button></Link>
          )
          }
        </div>
      </div>
  )
}

export default Nav

// https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/0496c280815973.5cec6bcf6ce6d.gif
