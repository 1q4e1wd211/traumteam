import React, { useEffect } from 'react';
import Nav from './Nav/Nav';
import { Route, Routes } from 'react-router-dom';
import Ankets from './Ankets/Ankets';
import AddAnkets from './AddAnkets/AddAnkets';
import AddSpeciality from './AddSpeciality/AddSpeciality';
import SinglePage from './SinglePage/SinglePage';
import axios from 'axios';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import SignUp from './Auth/SignUp/SignUp';
import SignIn from './Auth/SignIn/SignIn';
import TehMed from './TehMed/TehMed';
import SingleImplant from './SingleImplant/SingleImplant';

const App = () => {
  const [ankets, setAnkets] = React.useState([]);
  const [login, setLogin] = React.useState(JSON.parse(localStorage.getItem('user')))

  const getAnkets = async () => {
    try {
      const res = await axios.get("http://localhost:3000/posts");
      setAnkets(res.data.posts);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAnkets();
  }, []);
  const [bas, setBas] = React.useState([])
  const [count, setCount] = React.useState(0)


  return (
    <div className='app'>
      <Nav login={login} setLogin={setLogin} setBas={setBas} bas={bas} count={count} setCount={setCount}/>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn setLogin={setLogin}/>}/>
        <Route path='/ankets' element={<Ankets ankets={ankets} />} />
        <Route path='/addAnkets' element={<AddAnkets />} />
        <Route path='/addSpeciality' element={<AddSpeciality />} />
        <Route path="/singlePage/:id" element={<SinglePage ankets={ankets} />} />
        <Route path="/tehMed/:id" element={<SingleImplant setBas={setBas} bas={bas} count={count} setCount={setCount} />} />
        <Route path="/tehMed" element={<TehMed setBas={setBas} bas={bas} count={count} setCount={setCount}/>} />
      </Routes>
      {/* <Footer/> */}
    </div>
  );
}

export default App;

