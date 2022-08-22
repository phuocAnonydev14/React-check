import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useContext, useState } from "react";
import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

import { addFavoriteCart } from "../../../features/favoriteProduct";

import styles from "./iconHeart.module.scss";
import { AppContext } from "../../../App";
import { useEffect } from "react";

function IconHeart({ item, index }) {
  const [heart, setHeart] = useState({});
  const dispatch = useDispatch();
  const { isLoggedIn } = useContext(AppContext);
  const productCartList = useSelector((state) => state.favoriteProduct.value);
  let [check, setCheck] = useState(false);

  const toggleHeart = (item, index) => {
    setHeart(JSON.parse(localStorage.getItem("favoriteProducts") || "[]"));

    if (heart[index]) {
      setHeart((prev) => ({ ...prev, [index]: !heart[index] }));
      localStorage.setItem("favoriteProducts", JSON.stringify({ ...heart }));
    } else {
      setHeart((prev) => ({ ...prev, [index]: true }));
      localStorage.setItem("favoriteProducts", JSON.stringify({ ...heart }));

      alertHeart();
    }
    // console.log(heart);
    setCheck(!check);
    localStorage.setItem("favoriteProducts", JSON.stringify(heart));
  };
  // useEffect(() => {
  //   setHeart(JSON.parse(localStorage.getItem("favoriteProducts") || "[]"));
  //   console.log(heart);
  // }, [check]);

  const alertHeart = () => {
    toast.dark("You have added one favorite", {
      className: styles.alertHeart,
      draggable: true,
      position: "bottom-center",
      transition: Zoom,
      autoClose: 2000,
    });
  };

  return (
    <div
      onClick={() => {
        dispatch(
          addFavoriteCart({
            idUser: isLoggedIn.account.id,
            favoriteProduct: item,
          })
        );
        toggleHeart(item, index);
      }}
      className={clsx(styles.iconHeart, {
        [styles.redHeart]: heart[index],
      })}
    >
      <FontAwesomeIcon icon={faHeart} />
    </div>
  );
}

export default IconHeart;
