import {
  faArrowPointer,
  faBars,
  faCaretDown,
  faCartArrowDown,
  faCartShopping,
  faCircleUser,
  faMagnifyingGlass,
  faMessage,
  faRecordVinyl,
  faTriangleCircleSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import styles from "./Header.module.scss";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ScrollToTop from "react-scroll-to-top";

// import Swal from "sweetalert2";

import { AppContext } from "../../../App";
import { Link } from "react-router-dom";
import {
  faCircleXmark,
  faHeart,
  faBell,
} from "@fortawesome/free-regular-svg-icons";

function Header({ isAppearBrownCate, setIsAppearBrownCate }) {
  const [isFocus, setIsFocus] = useState(false);
  const [items, setItem] = useState([]);
  const [valueSearch, setValueSearch] = useState([]);
  const [emptyVal, setEmptyVal] = useState(false);
  // const { numberShoppingCart } = useShoppingCart();
  // useEffect(() => {
  //   let dataShoppingCart = JSON.parse(
  //     localStorage.getItem(`shoppingCart${idUser}`)
  //   );
  //   if (dataShoppingCart) setShoppingCart(dataShoppingCart);
  // },[idUser]);

  const { isLoggedIn, setIsLoggedIn, setGoLogin, setMenuResponsiveAppear } =
    useContext(AppContext);

  const idUser = isLoggedIn.account.id;
  const productCartList = useSelector((state) => state.productCart.value);
  const [productRender, setProductRender] = useState([]);

  useEffect(() => {
    let dataShoppingCart = JSON.parse(
      localStorage.getItem(`shoppingCart${idUser}`)
    );
    if (dataShoppingCart) setProductRender(dataShoppingCart);
  }, [productCartList, idUser]);

  const show = () => setIsFocus(true);
  const hide = () => setTimeout(() => setIsFocus(false), 200);

  const handleValueSearch = (e) => {
    let valueName = e.target.value;

    setValueSearch(() => {
      if (valueName !== "") {
        setEmptyVal(true);
        return items.filter((item) =>
          item.name.toLowerCase().includes(valueName.toLowerCase())
        );
      } else {
        setEmptyVal(false);
        return 0;
      }
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/products")
      .then((res) => setItem(res.data));
  }, []);

  return (
    <>
      <div className={clsx("container-fluid", styles.bgWhite)}>
        <div className={clsx(styles.headerBox)}>
          <Link className="link" to="/">
            <div>
              <h1 style={{ marginTop: "10px" }} className={clsx(styles.logo)}>
                Etsy
              </h1>
            </div>
          </Link>
          <div
            // onBlur={hide}
            className={clsx(styles.searchBox, {
              [styles.borderFocus]: isFocus,
            })}
          >
            <input
              onFocus={show}
              onBlur={hide}
              onChange={(e) => handleValueSearch(e)}
              type="text"
              placeholder="Search for anything"
            />
            <div className={styles.iconSearch}>
              <FontAwesomeIcon onClick={hide} icon={faMagnifyingGlass} />
            </div>
            {isFocus ? (
              <div className={styles.searchAppear}>
                {valueSearch.length > 0 ? (
                  valueSearch.map((item, index) => {
                    return (
                      <div key={index} className={styles.searchAppearBox}>
                        <img
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                          }}
                          src={item.image}
                          alt=""
                        />
                        <Link className="link" to={`/product/${item.id}`}>
                          <p>
                            {item.id} {item.name}
                          </p>
                        </Link>
                      </div>
                    );
                  })
                ) : emptyVal ? (
                  <h5>Not Found</h5>
                ) : (
                  <>
                    <h3>POPULAR RIGHT NOW</h3>
                    {items.map((item, index) => (
                      <Link
                        key={index}
                        className="link"
                        to={`/product/${item.id}`}
                      >
                        <div className="d-flex">
                          <img
                            src={item.image}
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                            }}
                            alt=""
                          />
                          <p>{item.name}</p>
                        </div>
                      </Link>
                    ))}
                  </>
                )}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className={styles.iconAccount}>
            {isLoggedIn.account.state ? (
              <>
                <Tippy content="Favorites">
                  <Link to={"/favorite"} className="link">
                    <div className={styles.specifyIcon}>
                      <FontAwesomeIcon
                        style={{ color: "red" }}
                        icon={faHeart}
                      />
                    </div>
                  </Link>
                </Tippy>
                <Tippy content="Updates">
                  <div className={styles.specifyIcon}>
                    <FontAwesomeIcon style={{ color: "green" }} icon={faBell} />
                    <FontAwesomeIcon
                      style={{
                        color: "gray",
                        marginLeft: "10px",
                        fontSize: "15px",
                      }}
                      icon={faCaretDown}
                    />
                  </div>
                </Tippy>
                <Tippy content="Your Account" placement="right-end">
                  <div className={styles.specifyIcon}>
                    <FontAwesomeIcon icon={faCircleUser} />
                    <FontAwesomeIcon
                      style={{
                        color: "gray",
                        marginLeft: "10px",
                        fontSize: "15px",
                      }}
                      icon={faCaretDown}
                    />
                    <div className={styles.accountSetting}>
                      <ul>
                        <li>
                          <img
                            style={{ width: "30px", height: "30px" }}
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP7NjSjKYoQFApBGgMXfrAioIDBfleCIZWyA&usqp=CAU"
                            alt=""
                          />
                          <div className={styles.userSetting}>
                            <p>{isLoggedIn.account.name}</p>
                            <p>view your profile</p>
                          </div>
                        </li>
                        <hr />
                        <li>
                          <FontAwesomeIcon color="green" icon={faMessage} />{" "}
                          <p>messages</p>
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faTriangleCircleSquare} />
                          <p> Your offers</p>
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faRecordVinyl} />
                          <p>Purchase or Reviews</p>
                        </li>
                        <li
                          onClick={() => {
                            localStorage.removeItem("currentUser");
                            setIsLoggedIn({ account: {} });
                          }}
                        >
                          <FontAwesomeIcon icon={faCircleXmark} />
                          <p>Log out</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Tippy>
                <Tippy content="Cart">
                  <Link className="link" to={"/cart"}>
                    <div
                      style={{
                        position: "relative",
                      }}
                    >
                      <div className={styles.specifyIcon}>
                        <FontAwesomeIcon icon={faCartArrowDown} />
                      </div>
                      {productRender.length > 0 && (
                        <div className={clsx(styles.numberShoppingCart)}>
                          {productRender.length}
                        </div>
                      )}
                    </div>
                  </Link>
                </Tippy>
              </>
            ) : (
              <>
                <Tippy content="Sign In">
                  <p
                    className={styles.specifyIcon}
                    style={{
                      fontSize: "20px",
                      borderRadius: "999px",
                      fontWeight: "bold",
                      transform: "translateY(5px)",
                    }}
                    onClick={() => setGoLogin(true)}
                  >
                    Sign In
                  </p>
                </Tippy>
                <Tippy content="Cart">
                  <Link className="link" to={"/cart"}>
                    <div>
                      <div
                        style={{ transform: "translateY(10px)" }}
                        className={styles.specifyIcon}
                      >
                        <FontAwesomeIcon icon={faCartShopping} />
                      </div>
                    </div>
                  </Link>
                </Tippy>
              </>
            )}
          </div>
        </div>
        <div
          onClick={() => {
            setIsAppearBrownCate(!isAppearBrownCate);
            if (isAppearBrownCate) {
              setMenuResponsiveAppear(true);
            } else setMenuResponsiveAppear(false);
          }}
          className={styles.responseBrownCate}
        >
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
      <ScrollToTop
        smooth
        component={<FontAwesomeIcon icon={faArrowPointer} />}
      />
    </>
  );
}

export default Header;
