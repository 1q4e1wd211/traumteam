import React, { useEffect } from 'react'
import cls from './Main.module.scss'
import { Link } from 'react-router-dom';

const Main = () => {

  const [isVisible, setIsVisible] = React.useState(false);
  const [isVisible2, setIsVisible2] = React.useState(false);
  const [scroll, setScroll] = React.useState(0);
 
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
      setScroll(window.scrollY)
    };

    const handleScroll2 = () => {
      setIsVisible2(window.scrollY > 370);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleScroll2);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScroll2);
    };
  }, []);

  const scrollTextStyles = {
    opacity: isVisible ? '1' : '0',
    transition: 'opacity 2s ease', 
    left: -900 + scroll * 2 <= 0 ? -900 + scroll * 2 : '0px'
  };


  const scrollTextStyles2 = {
    opacity: isVisible2 ? '1' : '0',
    transition: 'opacity 0.8s ease',
  };

  return (
    <div className={cls.main}>
      <div className={cls.welcome}>
        <h1>Welcome</h1>
      </div>
      <div className={cls.top}>
        <div className={cls.text} style={scrollTextStyles}>
            <h1>О Нас</h1>
            <p>Мы частная медицинская фирма, которая также занимается медицинским страхованием, предоплаченными ликвидациями последствий стихийных бедствий, предоплаченными регистрами адресов управляющей памяти и так же делаем все возможное что бы спасти наших клиентов а так же лезем в самую пеклу событий что бы спасти наших клиентов с особым Платиновыми Услугами.</p>
            <br />
            <p>«Траума тим» предлагает медицинские, околомедицинские и эвакуационные услуги во всех крупнейших городах мира. Это одна из самых уважаемых корпораций, к которой обращаются все, кто может позволить себе страховку. Пожалуй, ни одна компания больше не пользуется таким доверием общества. Сотрудники «Траума тим» не ввязываются в политику и не задают вопросов. Пока вы исправно им платите, ваша жизнь в безопасности.</p>
        </div>
        <img src="https://c4.wallpaperflare.com/wallpaper/211/348/967/cyberpunk-2077-trauma-team-corporation-hd-wallpaper-preview.jpg" alt="" />
      </div>
      <div className={cls.bot} style={scrollTextStyles2}>
        <div>
            <img src="https://cdnb.artstation.com/p/assets/images/images/039/679/983/large/ben-andrews-ben-andrews-trauma-team-medic-cyberpunk2077.jpg?1626626208" alt="" />
            <img className={cls.im} src="https://preview.redd.it/can-you-get-the-trauma-team-armor-in-game-v0-pys3ufng423a1.jpg?auto=webp&s=b4ddad53e4ee5e278d32255415ce96e83020850d" alt="" />
        </div>
        <div>
            <h1>Также</h1>
            <p>«Приедем за семь минут или вернём деньги!» — говорится в рекламе медицинской корпорации «Траума тим». Эта фраза греет душу обладателям страховых полисов, которые истекают кровью в подворотне в ожидании спасения. Даже если вы чувствуете, что жизнь вас покидает, не беспокойтесь: помощь уже в пути. Сначала вы увидите, как с небес спускается бронированное ави, выкашивая ваших неприятелей из крупнокалиберных пулемётов. Затем из него выйдет медики — вооружённые до зубов ангелы-хранители в бело-зелёной форме. Затем вас заберут в клинику, где поставят на ноги и выдадут счёт за дополнительные расходы. И сколько бы в этой сумме ни было нулей, вы с радостью продлите действие полиса ещё на полгода.</p>
            <h2>Услуги:</h2>
            <div className={cls.med}>
                <div className={cls.top2}>
                    <div><i class="fa-solid fa-hospital-user"></i>МедСтраховка</div>
                    <div><i class="fa-solid fa-stethoscope"></i>Записатся на сеанс</div>
                    <Link to='/tehMed'>
                      <div><i class="fa-solid fa-microchip"></i>Высокотехнологичные медицинские товары</div>
                    </Link>
                </div>
                <div className={cls.bot2}>
                    <div><i class="fa-solid fa-shield-heart"></i>ПлатиноваяСтраховка</div>
                    <div><i class="fa-solid fa-staff-snake"></i>Лекарства</div>
                    <div><i class="fa-sharp fa-solid fa-brain"></i>Записатся на лечение</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Main
