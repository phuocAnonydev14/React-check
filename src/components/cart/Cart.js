import styles from "./Cart.module.scss";
import classNames from "classnames/bind";
import { ProgressBar } from "react-bootstrap";
import { useContext, useState } from "react";
import { AppContext } from "../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faTicket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "tippy.js/dist/tippy.css";
import Swal from "sweetalert2";
import { toast, Zoom } from "react-toastify";

import {
  removeProductCart,
  addQuantityProductCart,
  minusQuantityProductCart,
  updateProductCart,
  updateQuantityProductCart,
} from "../../features/productCart";
import Tippy from "@tippyjs/react";
import { useRef } from "react";

const cx = classNames.bind(styles);
function Cart() {
  const { isLoggedIn, menuResponsiveAppear } = useContext(AppContext);
  // const { shoppingCart, addQuantityShoppingCart } = useShoppingCart();
  const productCartList = useSelector((state) => state.productCart.value);
  const [productRender, setProductRender] = useState([]);
  const idUser = isLoggedIn.account.id;
  const [total, setTotal] = useState(-210000);
  const amountRef = useRef();

  const [currentUpdate, setCurrentUpdate] = useState({
    color: "",
  });

  useEffect(() => {
    let countTotal = 0;
    for (let i = 0; i < productRender.length; i++) {
      countTotal += +productRender[i].totalAmount;
    }
    setTotal(countTotal);
    console.log(countTotal);
  }, [productRender]);
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
    let dataShoppingCart = JSON.parse(
      localStorage.getItem(`shoppingCart${idUser}`)
    );
    if (dataShoppingCart) setProductRender(dataShoppingCart);
  }, [productCartList, idUser]);

  const dispatch = useDispatch();

  const handleUpdateColor = (index) => {
    if (currentUpdate.color) {
      dispatch(
        updateProductCart({ idUser, color: currentUpdate.color, index })
      );
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Update Success",
        showConfirmButton: false,
        timer: 1500,
      });
      setCurrentUpdate((prev) => ({ ...prev, [index]: false }));
    } else {
      alert("please Pick your Color");
    }
  };

  return (
    <div>
      {isLoggedIn.account.state ? (
        <div
          className={cx("container-fluid", "cart", {
            toBottom1: menuResponsiveAppear,
          })}
        >
          <div className={cx("cart-header")}>
            <h2>{productRender.length} items in your cart</h2>
            <Link className="link" to="/sortProduct/7">
              <button>keep shopping</button>
            </Link>
          </div>
          <div className="row">
            <div className="col-lg-7 col-md-12 col-sm-12 col-12 ">
              {productRender ? (
                productRender.map((item, index) => {
                  return (
                    <div className={cx("row", "cart-product")} key={index}>
                      <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                        <img
                          onClick={() => console.log(item.totalAmount)}
                          style={{
                            width: "100%",
                            maxHeight: "280px",
                            boxShadow: "0 2px 5px rgb(134, 100, 100)",
                          }}
                          src={item.image}
                          alt=""
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-9 col-9 ">
                        <p className={cx("cart-product-name")}> {item.name}</p>{" "}
                        <p>
                          option :{" "}
                          <span style={{ fontWeight: "500" }}>
                            {item.option}
                          </span>
                        </p>
                        <div
                          style={{ width: "75%" }}
                          className="d-flex justify-content-between align-items-center"
                        >
                          <div className={cx("cart-product-amount")}>
                            <button
                              className=""
                              onClick={() =>
                                dispatch(
                                  minusQuantityProductCart({ idUser, index })
                                )
                              }
                            >
                              -
                            </button>
                            <p>
                              amount :
                              <input
                                type="number"
                                placeholder={item.amount}
                                style={{ fontWeight: "bold" }}
                                value={item.amount}
                                ref={amountRef}
                                onChange={(e) => {
                                  if (+e.target.value > +item.max) {
                                    toast.dark(
                                      "your order larger than max you will back to max",
                                      {
                                        className: styles.alertHeart,
                                        draggable: true,
                                        position: "bottom-center",
                                        transition: Zoom,
                                        autoClose: 3000,
                                      }
                                    );
                                    e.target.value = item.max;
                                  }

                                  dispatch(
                                    updateQuantityProductCart({
                                      idUser,
                                      index,
                                      newAmount: +e.target.value,
                                    })
                                  );
                                }}
                              />
                            </p>
                            <button
                              className=""
                              onClick={() =>
                                dispatch(
                                  addQuantityProductCart({ idUser, index })
                                )
                              }
                            >
                              +
                            </button>
                          </div>
                          <p>
                            Max :{" "}
                            <span style={{ fontWeight: "bold" }}>
                              {item.max}
                            </span>
                          </p>
                        </div>
                        <ProgressBar
                          style={{
                            background:
                              "linear-gradient(to right bottom,rgb(201, 240, 244),purple)",
                            height: "30px",
                            width: "75%",
                            color: "red",
                          }}
                          className="rounded-pill"
                          min={0}
                          max={item.max}
                          now={item.amount}
                        />
                        {currentUpdate[index] && (
                          <div className={cx("update-color")}>
                            <p>
                              Choose your Color :{" "}
                              <span
                                style={{
                                  color: `${currentUpdate.color}`,
                                  fontWeight: "600",
                                }}
                              >
                                {" "}
                                {currentUpdate.color}
                              </span>
                            </p>
                            <div className={cx("update-color-box")}>
                              <Tippy
                                content="Green"
                                className="tippy-box-green"
                              >
                                <div
                                  onClick={() =>
                                    setCurrentUpdate((prev) => ({
                                      ...prev,
                                      color: "Green",
                                      colorRedState: false,
                                      colorBlueState: false,
                                      colorGreenState: true,
                                    }))
                                  }
                                  className={cx("greenClr", {
                                    activeClr: currentUpdate.colorGreenState,
                                  })}
                                ></div>
                              </Tippy>
                              <Tippy content="Blue" className="tippy-box-blue">
                                <div
                                  onClick={() =>
                                    setCurrentUpdate((prev) => ({
                                      ...prev,
                                      color: "Blue",
                                      colorRedState: false,
                                      colorBlueState: true,
                                      colorGreenState: false,
                                    }))
                                  }
                                  className={cx("blueClr", {
                                    activeClr: currentUpdate.colorBlueState,
                                  })}
                                ></div>
                              </Tippy>
                              <Tippy content="Red" className="tippy-box-red">
                                <div
                                  onClick={() =>
                                    setCurrentUpdate((prev) => ({
                                      ...prev,
                                      color: "Red",
                                      colorRedState: true,
                                      colorBlueState: false,
                                      colorGreenState: false,
                                    }))
                                  }
                                  className={cx("redClr", {
                                    activeClr: currentUpdate.colorRedState,
                                  })}
                                ></div>
                              </Tippy>
                            </div>
                          </div>
                        )}
                        <div className={cx("d-flex", "btn-edit")}>
                          {currentUpdate[index] ? (
                            <button onClick={() => handleUpdateColor(index)}>
                              Save{" "}
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                setCurrentUpdate({ [index]: true })
                              }
                            >
                              Edit
                            </button>
                          )}
                          <button
                            onClick={() =>
                              dispatch(removeProductCart({ idUser, index }))
                            }
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-2 col-sm-3 col-3">
                        {item.sales ? (
                          <>
                            <p className={cx("cart-product-price")}>
                              {numberWithCommas(+item.totalAmount)}₫
                            </p>
                            <p className={cx("cart-product-price-sales")}>
                              {numberWithCommas(item.price)}₫
                            </p>
                            <p
                              className={cx("cart-product-price-sales-detail")}
                            >
                              <span style={{ fontWeight: "bold" }}>Sale</span>:
                              15% off
                            </p>
                          </>
                        ) : (
                          <p className={cx("cart-product-price")}>
                            {numberWithCommas(+item.totalAmount)}₫
                          </p>
                        )}
                      </div>
                      <p className={cx("checkout-only")}>
                        Checkout from only this shop{" "}
                        <span>
                          <FontAwesomeIcon icon={faArrowRight} />
                        </span>
                      </p>
                    </div>
                  );
                })
              ) : (
                <strong>
                  {" "}
                  <p style={{ textAlign: "center", fontSize: "25px" }}>
                    add something to your cart{" "}
                  </p>
                </strong>
              )}
            </div>
            <div className="col-lg-1 col-md-12 col-12 col-sm-12"></div>
            <div className="col-lg-4 col-md-12 col-sm-12 col-12">
              <div className={cx("cart-checkout")}>
                <h6>Let checkout your purchase </h6>
                <div className=" d-flex justify-content-between mb-2">
                  <p style={{ fontWeight: "600" }}>item(s) total </p>
                  <p>{numberWithCommas(+total)}₫</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p style={{ fontWeight: "600" }}>Shipping </p>
                  <p>210,000₫</p>
                </div>
                <div className={cx("line-bottom")}></div>
                <div className="d-flex justify-content-between">
                  <p style={{ fontWeight: "600" }}>Location </p>
                  <p>VietNam</p>
                </div>
                <div className={cx("line-bottom")}></div>
                <div className="d-flex justify-content-between">
                  <p style={{ fontWeight: "600" }}>
                    Total ({productRender.length} items){" "}
                  </p>
                  <p style={{ fontWeight: "600" }}>
                    {numberWithCommas(+total - 210000)}₫
                  </p>
                </div>
                <button className={cx("button", "button-checkout")}>
                  Proceed to checkout
                </button>
                <div className={cx("coupon")}>
                  <h6>
                    <span>
                      <FontAwesomeIcon icon={faTicket} />
                    </span>
                    Apply Etsy coupon code
                  </h6>
                  <p>Local taxes included (where applicable)</p>
                  <p>* Additional duties and taxes may apply</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <strong>
          <p style={{ textAlign: "center", fontSize: "25px" }}>
            Please sign in to use your cart
          </p>
        </strong>
      )}
    </div>
  );
}

export default Cart;
