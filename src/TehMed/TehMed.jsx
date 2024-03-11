import React, { useEffect, useState } from "react";
import cls from "./TehMed.module.scss";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaArrowRight as Arrow } from "react-icons/fa";
import { Link } from "react-router-dom";

const TehMed = ({ bas, setBas, count, setCount }) => {
  const { register, handleSubmit, reset } = useForm();

  const [hov, setHov] = React.useState(null);
  const [implants, setImplants] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState([]);
  const [corporationBtn, setCorporationBtn] = React.useState({});
  const [partBodyBtn, setPartBodyBtn] = React.useState({});
  const [partBody, setPartBody] = React.useState([]);
  const [buttonPressed, setButtonPressed] = useState(false);

  const getImplants = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/implants");
      setImplants(data);

      const upd = [];
      implants.forEach((i) => {
        if (!upd.includes(i.corporation)) {
          upd.push(i.corporation);
          localStorage.setItem("corporation", JSON.stringify(upd));
        }
      });
      const str = JSON.parse(localStorage.getItem("corporation"));
      setFilter(str);

      const upd1 = [];
      implants.forEach((i) => {
        if (!upd1.includes(i.partBody)) {
          upd1.push(i.partBody);
          localStorage.setItem("partBody", JSON.stringify(upd1));
        }
      });
      const str1 = JSON.parse(localStorage.getItem("partBody"));
      setPartBody(str1);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getImplants();
  }, []);

  const postimplant = async (body) => {
    try {
      await axios.post("http://localhost:3000/implants", body);
      localStorage.setItem(
        "corporation",
        JSON.stringify(filter.push(body.corporation))
      );
      getImplants();
      // reset()
    } catch (e) {
      console.log(e);
    }
  };

  const [coordinates, setCoordinates] = useState(-340);
  const [coor, setCoor] = useState(false);

  const a = () => {
    if (coor === false) {
      setCoor(true);
    } else {
      setCoor(false);
    }
  };

  const handleMouseMove = (event) => {
    const mouseX = event.clientX;
    if (coor == true) {
      setCoordinates(-mouseX + 1160);
    }
  };

  const move = {
    right: coordinates >= 50 ? 50 : coordinates,
  };

  const rotat = {
    transform: `rotate(${coordinates / 1.9 >= 9 ? 0 : coordinates / 1.9}deg)`,
  };

  const keyPairs = [
    { eng: "q", rus: "й" },
    { eng: "w", rus: "ц" },
    { eng: "e", rus: "у" },
    { eng: "r", rus: "к" },
    { eng: "t", rus: "е" },
    { eng: "y", rus: "н" },
    { eng: "u", rus: "г" },
    { eng: "i", rus: "ш" },
    { eng: "o", rus: "щ" },
    { eng: "p", rus: "з" },
    { eng: "[", rus: "х" },
    { eng: "]", rus: "ъ" },
    { eng: "a", rus: "ф" },
    { eng: "s", rus: "ы" },
    { eng: "d", rus: "в" },
    { eng: "f", rus: "а" },
    { eng: "g", rus: "п" },
    { eng: "h", rus: "р" },
    { eng: "j", rus: "о" },
    { eng: "k", rus: "л" },
    { eng: "l", rus: "д" },
    { eng: ";", rus: "ж" },
    { eng: "'", rus: "э" },
    { eng: "z", rus: "я" },
    { eng: "x", rus: "ч" },
    { eng: "c", rus: "с" },
    { eng: "v", rus: "м" },
    { eng: "b", rus: "и" },
    { eng: "n", rus: "т" },
    { eng: "m", rus: "ь" },
    { eng: ",", rus: "б" },
    { eng: ".", rus: "ю" },
    { eng: "/", rus: "." },
  ];

  const russianTransliteration = [
    { eng: "а", russ: "a" },
    { eng: "б", russ: "b" },
    { eng: "в", russ: "v" },
    { eng: "г", russ: "g" },
    { eng: "д", russ: "d" },
    { eng: "е", russ: "e" },
    { eng: "ё", russ: "yo" },
    { eng: "ж", russ: "zh" },
    { eng: "з", russ: "z" },
    { eng: "и", russ: "i" },
    { eng: "й", russ: "y" },
    { eng: "к", russ: "k" },
    { eng: "л", russ: "l" },
    { eng: "м", russ: "m" },
    { eng: "н", russ: "n" },
    { eng: "о", russ: "o" },
    { eng: "п", russ: "p" },
    { eng: "р", russ: "r" },
    { eng: "с", russ: "s" },
    { eng: "т", russ: "t" },
    { eng: "у", russ: "u" },
    { eng: "ф", russ: "f" },
    { eng: "х", russ: "h" },
    { eng: "ц", russ: "ts" },
    { eng: "ч", russ: "ch" },
    { eng: "ш", russ: "sh" },
    { eng: "щ", russ: "sch" },
    { eng: "ъ", russ: "" },
    { eng: "ы", russ: "y" },
    { eng: "ь", russ: "" },
    { eng: "э", russ: "eh" },
    { eng: "ю", russ: "yu" },
    { eng: "я", russ: "ya" },
  ];

  function transliterateRussianToEnglish(input) {
    const russianTransliteration = {
      а: "a",
      б: "b",
      в: "v",
      г: "g",
      д: "d",
      е: "e",
      ё: "yo",
      ж: "zh",
      з: "z",
      и: "i",
      й: "y",
      к: "k",
      л: "l",
      м: "m",
      н: "n",
      о: "o",
      п: "p",
      р: "r",
      с: "s",
      т: "t",
      у: "u",
      ф: "f",
      х: "h",
      ц: "ts",
      ч: "ch",
      ш: "sh",
      щ: "sch",
      ъ: "",
      ы: "y",
      ь: "",
      э: "e",
      ю: "yu",
      я: "ya",
    };

    return input
      .toLowerCase()
      .split("")
      .map((char) => russianTransliteration[char] || char)
      .join("");
  }

  const ad = (userInput) => {
    let result = "";
    for (let i = 0; i < userInput.length; i++) {
      const char = userInput[i];
      const pairEng = keyPairs.find((pair) => pair.eng === char.toLowerCase());
      if (pairEng) {
        result += pairEng.rus;
      } else {
        result += char;
      }
    }
    return result;
  };

  const searchAnkets = implants.filter((i) => {
    const name = i.title.toLowerCase();
    const description = i.description.toLowerCase();

    const searchs = search.toLowerCase();
    if (
      name.includes(searchs) ||
      name.includes(ad(searchs)) ||
      name.includes(transliterateRussianToEnglish(search))
    ) {
      return true;
    }
    if (
      description.includes(searchs) ||
      description.includes(ad(searchs)) ||
      description.includes(transliterateRussianToEnglish(search))
    ) {
      return true;
    }

    return false;
  });

  const handleBtn = (corporation, id) => {
    if (corporationBtn.corporation == corporation) {
      setCorporationBtn({});
    } else {
      setCorporationBtn({ corporation: corporation, id: id });
    }
  };
  
  const handleBtn2 = (partBody, id) => {
    if (partBodyBtn.partBody === partBody) {
      setPartBodyBtn({});
    } else {
      setPartBodyBtn({ partBody: partBody, id: id });
    }
  };
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");

  const filtered = searchAnkets.filter((i) => {
    return (
      (corporationBtn.corporation == null ||
        corporationBtn.corporation == i.corporation) &&
      (partBodyBtn.partBody == null || partBodyBtn.partBody == i.partBody) &&
      (fromValue == "" || fromValue <= +i.price) &&
      (toValue == "" || toValue >= +i.price)
    );
  });

  const handleDelete = async (id, corp) => {
    try {
      await axios.delete(`http://localhost:3000/implants/${id}`);
      getImplants();
    } catch (e) {
      console.log(e);
    }
  };
  const handleBasket = async (
    id,
    title,
    description,
    price,
    corporation,
    partBody,
    URL
  ) => {
    try {
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
        // Если элемент не найден, добавляем его в массив bas
        setBas((prev) => [...prev, implant]);
        setCount(count + 1);
      } else {
        // Если элемент найден, удаляем его из массива bas и снимаем выделение с кнопки
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
    } catch (e) {
      console.log(e);
    }
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
      <div>
        <h1>Выберите имлант который хотите заказать</h1>
        <input
          className={cls.search}
          type="text"
          placeholder="Поиск"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <div className={cls.price}>
          <p>цена</p>
          <input
            type="number"
            placeholder="от"
            value={+fromValue <= +toValue ? fromValue : +toValue - 1}
            onChange={(e) => setFromValue(e.target.value)}
            min={0}
          />
          <input
            type="number"
            placeholder="до"
            value={toValue}
            onChange={(e) => setToValue(e.target.value)}
            min={0}
          />
        </div>
        <div>
          {Array.isArray(filter) &&
            filter.map((i, index) => (
              <button
                className={corporationBtn.id == index ? cls.activate : cls.btn}
                onClick={() => handleBtn(i, index)}
              >
                {i}
              </button>
            ))}
        </div>
        <div>
          {Array.isArray(partBody) &&
            partBody.map((i, index) => (
              <button
                className={partBodyBtn.id == index ? cls.activate : cls.btn}
                onClick={() => handleBtn2(i, index)}
              >
                {i}
              </button>
            ))}
        </div>
        <div className={cls.cards}>
          {implants && filtered.length === 0 ? (
            <div>
              <img
                style={{ width: "500px" }}
                src="https://ouch-cdn2.icons8.com/zWvSD_Zgj9nYuOZO2RNZXm5nhyNA8l7JOFFW3zI-Riw/rs:fit:456:456/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvNDk4/L2M2NjFiODM1LWIx/YTgtNGZjOC1iYzIz/LTE0OWE2M2VhNDNm/Mi5zdmc.png"
                alt=""
              />
            </div>
          ) : (
            implants &&
            filtered.map((i) => (
              <div className={cls.card} key={i.id}>
                <div
                  className={cls.img}
                  onMouseEnter={() => setHov(i)}
                  onMouseLeave={() => setHov(null)}
                >
                  <img src={i.URL} alt="" />
                  {hov === i && (
                    <Link className={cls.pod} to={`./${i.id}`}>
                      <div>Подробнее...</div>
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
                </div>
                <div className={cls.text}>
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
                  <button
                    className={cls.delete}
                    onClick={() => handleDelete(i.id, i.corporation)}
                  >
                    delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className={cls.post} style={move}>
        <button
          style={rotat}
          className={cls.m}
          onMouseDown={a}
          onMouseUp={a}
          onMouseLeave={() => setCoor(false)}
          onMouseMove={handleMouseMove}
        >
          {" "}
          <Arrow />{" "}
        </button>
        <form onSubmit={handleSubmit(postimplant)}>
          <h2>добавить имплант</h2>
          <div className={cls.inputs}>
            <input type="text" placeholder="title" {...register("title")} />
            <input type="number" placeholder="price" {...register("price")} />
            <input
              type="text"
              placeholder="description"
              {...register("description")}
            />
            <input type="text" placeholder="URL" {...register("URL")} />
            <input
              type="text"
              placeholder="corporation"
              {...register("corporation")}
            />
            <input
              type="text"
              placeholder="partBody"
              {...register("partBody")}
            />
            <input
              type="text"
              placeholder="weight(g)"
              {...register("weight")}
            />
            <input
              type="text"
              placeholder="Материал"
              {...register("material")}
            />
          </div>
          <button>send</button>
        </form>
      </div>
    </div>
  );
};

export default TehMed;

//https://asia-exstatic.vivoglobal.com/static/img/image/404-PC_31daffa.png
