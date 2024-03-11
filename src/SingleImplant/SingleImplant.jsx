import React, { useEffect, useState } from "react";
import cls from "./SingleImplant.module.scss";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SingleImplant = ({ bas, setBas, count, setCount }) => {
  const [implant, setImplant] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [hov, setHov] = useState(null);
  const [buttonPressed, setButtonPressed] = useState(false);
  const { id } = useParams();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const findImplant = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/implants");
      const find = data.find((i) => i.id === id);
      setImplant(find);
      const recs = data.filter(
        (i) => i.partBody === find.partBody && i.id !== id
      );
      setRecommendations(recs);

      localStorage.setItem("recommendations", JSON.stringify(recs));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const savedRecs = JSON.parse(localStorage.getItem("recommendations"));
    if (savedRecs) {
      setRecommendations(savedRecs);
    }
    findImplant();
  }, []);

  const handleBasket = async (
    id,
    title,
    description,
    price,
    corporation,
    partBody,
    URL
  ) => {
    const implant = {
      id: id,
      title: title,
      description: description,
      price: price,
      corporation: corporation,
      partBody: partBody,
      URL: URL,
    };
    const index = bas.findIndex((item) => item.id === id);

    if (index === -1) {
      setBas((prev) => [...prev, implant]);
      setCount(count + 1);
    } else {
      const updatedBas = [...bas];
      updatedBas.splice(index, 1);
      setBas(updatedBas);
      if (count <= 0) {
        setCount(0);
      } else {
        setCount(count - 1);
      }
    }

    setButtonPressed((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  useEffect(() => {
    const newButtonState = {};
    bas.forEach((item) => {
      newButtonState[item.id] = true;
    });

    setButtonPressed(newButtonState);
  }, [bas]);

  return (
    <div className={cls.root}>
      <div className={cls.top}>
        <div
          className={cls.left}
          style={{ background: `url(${implant.URL})center/cover` }}
        ></div>
        <div className={cls.right}>
          <div>
            <h1>{implant.title}</h1>
            <p>{implant.description}</p>
            <h2>Цена: {implant.price}$</h2>
          </div>
          <div>
            <p>Вес: {+implant.weight / 1000}кг</p>
            <p>Часть Тело: {implant.partBody}</p>
            <p>Производитель: {implant.corporation}</p>
            <p>Материал: {implant.material}</p>
          </div>
          <button
            onClick={() =>
              handleBasket(
                implant.id,
                implant.title,
                implant.description,
                implant.price,
                implant.corporation,
                implant.partBody,
                implant.URL
              )
            }
          >
            В карзину
          </button>
        </div>
      </div>
      <div>
        <h2 style={{ margin: "10px" }}>
          После доставки импланта, вы можете установить его себе{" "}
          <Link>
            <span style={{ borderBottom: "2px solid black" }}>Здесь</span>
          </Link>
        </h2>
        <br />
        <h2 style={{ margin: "10px" }}>Также вам может понравится:</h2>
      </div>
      <div className={cls.bottom}>
        <Slider {...settings}>
          {recommendations.map((i) => (
            <div className={cls.card} key={i.id} >
              <div
                className={cls.img}
                onMouseEnter={() => setHov(i)}
                onMouseLeave={() => setHov(null)}
              >
                <img src={i.URL} alt="" />
                {hov === i && (
                  <Link className={cls.pod} to={`../tehMed/${i.id}`}>
                    <div onClick={() => findImplant()}>Подробнее...</div>
                  </Link>
                )}
              </div>
              <div className={cls.text}>
                <h1>{i.title}</h1>
                <p
                  style={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  {i.description}
                </p>
                <h2>{i.price}$</h2>
                <p>Компания: {i.corporation}</p>
                <button
                  className={cls.buy}
                  style={
                    buttonPressed[i.id]
                      ? { backgroundColor: "green" }
                      : { backgroundColor: "inherit" }
                  }
                  onClick={() =>
                    handleBasket(
                      i.id,
                      i.title,
                      i.description,
                      i.price,
                      i.corporation,
                      i.partBody,
                      i.URL
                    )
                  }
                >
                  В карзину
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SingleImplant;
