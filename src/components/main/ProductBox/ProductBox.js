import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./ProductBox.module.scss";
import { AppContext } from "../../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faArrowTurnUp,
  faCheck,
  faCircleCheck,
  faHourglass,
  faStar,
  faStarHalfAlt,
  faThumbsUp,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import IconHeart from "../iconHeart/iconHeart";
import Tippy from "@tippyjs/react";
import { useDispatch } from "react-redux";
import { addProductCart } from "../../../features/productCart";
import Swal from "sweetalert2";
import Offcanvas from "react-bootstrap/Offcanvas";

let numReview = Math.floor(Math.random() * 100);
let amountSales = Math.floor(Math.random() * 100);
let numSales = Math.floor(Math.random() * 10000);

let checkCurrentImg = 0;

function ProductBox() {
  const { id } = useParams();
  const [listProducts, setListProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState();
  const cx = classNames.bind(styles);
  const [activeImg, setActiveImg] = useState({ 0: true, currentImg: "" });
  const [openDesc, setOpenDesc] = useState(true);
  const [showProduct, setShowProduct] = useState(false);
  const [currentProductAdd, setCurrentProductAdd] = useState({});

  const handleClose = () => setShowProduct(false);
  const handleShow = () => setShowProduct(true);

  const { menuResponsiveAppear, isLoggedIn } = useContext(AppContext);
  // const { addShoppingCart } = useContext(GlobalContext);
  const amountRef = useRef();

  const dispatch = useDispatch();

  const listSmImg = [
    product.image,
    "https://i.etsystatic.com/27243948/r/il/cd0e43/3102851922/il_1588xN.3102851922_mr6a.jpg",
    "https://i.etsystatic.com/20981097/r/il/fb3242/2704844833/il_1588xN.2704844833_nnb5.jpg",
    "https://i.etsystatic.com/20981097/r/il/c13ba2/2704839323/il_1588xN.2704839323_pgts.jpg",
    "https://i.etsystatic.com/20981097/r/il/2a8f8c/2657176680/il_1588xN.2657176680_qr6l.jpg",
  ];

  const handleNextImg = () => {
    checkCurrentImg++;
    if (checkCurrentImg >= listSmImg.length) {
      checkCurrentImg = 0;
      setActiveImg({
        [checkCurrentImg]: true,
        currentImg: listSmImg[checkCurrentImg],
      });
    } else {
      setActiveImg({
        [checkCurrentImg]: true,
        currentImg: listSmImg[checkCurrentImg],
      });
    }
  };

  const handlePrevImg = () => {
    checkCurrentImg--;
    if (checkCurrentImg < 0) {
      checkCurrentImg = listSmImg.length - 1;
      setActiveImg({
        [checkCurrentImg]: true,
        currentImg: listSmImg[checkCurrentImg],
      });
    } else {
      console.log(checkCurrentImg);
      setActiveImg({
        [checkCurrentImg]: true,
        currentImg: listSmImg[checkCurrentImg],
      });
    }
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8000/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => alert(err));

    axios
      .get("http://localhost:8000/products")
      .then((res) => setListProducts(res.data));
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (product.categories_id) {
      axios
        .get("http://localhost:8000/categories")
        .then((res) => {
          let data = res.data;
          setCategories(() => {
            for (let i = 0; i < data.length; i++) {
              if (product.categories_id === data[i].id) {
                return data[i];
              }
            }
          });
        })
        .catch((err) => console.log(err));
    }
  }, [product]);

  const handleActiveImg = (e, index) => {
    for (let i = 0; i < listSmImg.length; i++) {
      setActiveImg({ [i]: false });
    }
    checkCurrentImg = index;
    setActiveImg({ [index]: true, currentImg: e.target.src });
  };

  const [valueOption, setValueOption] = useState("");
  const getValueOption = (e) => {
    setValueOption(e.target.value);
  };

  const handleAddShoppingCart = (product) => {
    if (isLoggedIn.account.state) {
      if (valueOption !== "") {
        let productCart = {
          ...product,
          option: valueOption,
          amount: +amountRef.current.value,
        };
        dispatch(
          addProductCart({ productCart, idUser: isLoggedIn.account.id })
        );
        handleShow();
        // addShoppingCart(productCart);
        amountRef.current.value = 1;
        setValueOption("");
        setCurrentProductAdd(productCart);
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Select color to your item",
          showConfirmButton: true,
          timer: 2000,
        });
      }
    } else
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "sign in to add to your cart",
        showConfirmButton: true,
        timer: 2000,
      });
  };

  return (
    <>
      <div
        className={cx(
          "product",
          { toBottom1: menuResponsiveAppear },
          "container"
        )}
      >
        <div className="row">
          <div className={cx("col-lg-1 col-md-2 col-sm-2 col-2", "smImgList")}>
            {listSmImg.map((item, index) => {
              return (
                <img
                  key={index}
                  onClick={(e) => handleActiveImg(e, index)}
                  className={cx({ activeSmImg: activeImg[index] })}
                  style={{
                    width: "100%",
                    height: "auto",
                    marginBottom: "20px",
                  }}
                  src={item}
                  alt=""
                />
              );
            })}
          </div>
          <div
            className={cx("col-lg-1 col-md-1 col-sm-1 col-2", "text-center")}
          >
            <FontAwesomeIcon
              onClick={handlePrevImg}
              className={cx("iconHeart")}
              icon={faAngleLeft}
            />
          </div>
          <div
            style={{
              position: "relative",
              cursor: "zoom-in",
              height: "max-content",
            }}
            className="col-lg-5 col-md-8 col-sm-8 col-6"
          >
            <img
              style={{ width: "100%", height: "500px", objectFit: "cover" }}
              src={activeImg.currentImg ? activeImg.currentImg : product.image}
              alt=""
            />
            <div className={cx("iconHeart1")}>
              <IconHeart index={id - 1} item={product} />
            </div>
          </div>
          <div
            className={cx("col-lg-1 col-md-1 col-sm-1 col-2", "text-center")}
          >
            <FontAwesomeIcon
              onClick={() => handleNextImg()}
              className={cx("iconHeart")}
              icon={faAngleRight}
            />
          </div>
          <div className="col-lg-4">
            <div className={cx("product-title")}>
              {categories && (
                <h5 style={{ marginBottom: "0" }}>
                  {categories.name}
                  <span>❤️</span>
                </h5>
              )}
              <div className="d-flex ">
                <div className={cx("product-title-rating")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                    style={{ width: "20px", height: "20px" }}
                  >
                    <path
                      d="M20.902 7.09l-2.317-1.332-1.341-2.303H14.56L12.122 2 9.805 3.333H7.122L5.78 5.758 3.341 7.09v2.667L2 12.06l1.341 2.303v2.666l2.318 1.334L7 20.667h2.683L12 22l2.317-1.333H17l1.341-2.303 2.317-1.334v-2.666L22 12.06l-1.341-2.303V7.09h.243zm-6.097 6.062l.732 3.515-.488.363-2.927-1.818-3.049 1.697-.488-.363.732-3.516-2.56-2.181.121-.485 3.537-.243 1.341-3.273h.488l1.341 3.273 3.537.243.122.484-2.44 2.303z"
                      fill="purple"
                    ></path>
                  </svg>
                  <Tippy content="Star Sellers have an outstanding track record for providing a great customer experience—they consistently earned 5-star reviews, shipped orders on time, and replied quickly to any messages they received.">
                    <span>Star seller</span>
                  </Tippy>
                </div>
                <div className={cx("distance")}></div>
                <p className="product-title-rating">
                  {numberWithCommas(numSales)} sales
                </p>
                <div className={cx("distance")}></div>
                <div className="product-title-star">
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                </div>
              </div>
              <p className={cx("product-name")}>{product.name}</p>
              <p className={cx("etsy-pick")}>Etsy's pick</p>
              {product.sales ? (
                <>
                  <div className="d-flex justify-content-between">
                    <div>
                      <span className={cx("product-price")}>
                        {numberWithCommas(+product.sales)}₫+
                      </span>
                      <span className={cx("sale-price")}>
                        {numberWithCommas(+product.price)}₫
                      </span>
                    </div>
                    <p style={{ fontWeight: "bold" }}>
                      <FontAwesomeIcon icon={faCheck} /> In Stock
                    </p>
                  </div>
                  <p style={{ margin: "unset", color: "green" }}>
                    You save {numberWithCommas(+product.price - +product.sales)}
                    ₫ (30%)
                  </p>
                  <p className={cx("exp")}>Sale ends in 5 hours</p>
                </>
              ) : (
                <p className={cx("product-price")}>
                  {numberWithCommas(+product.price)}₫
                </p>
              )}
              <p style={{ fontSize: "15px", color: "gray" }}>
                Local taxes included (where applicable)
              </p>
            </div>
            <div className={cx("product-details")}>
              <p>
                Dimesions<span style={{ color: "red" }}>*</span>
              </p>
              <select
                value={valueOption}
                onChange={(e) => getValueOption(e)}
                name=""
                id=""
              >
                <option value="">Select an option</option>
                <option value="Green">Green</option>
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
              </select>
              <p>Quantity</p>
              <input type="number" defaultValue={1} ref={amountRef} />
            </div>
            <button
              className={cx(
                "button",
                "button-buy-now",
                "d-flex",
                "justify-content-center"
              )}
            >
              <span style={{ fontWeight: "bold" }}>Buy now </span>
              <div className={cx("distance")}></div>
              Only {numberWithCommas(amountSales)} available
            </button>
            <button
              onClick={() => handleAddShoppingCart(product)}
              className={cx("button", "button-cart")}
            >
              Add to cart
            </button>
            <button className={cx("button", "button-collection")}>
              ❤️ Add to collection
            </button>
            <div className="d-flex ">
              <FontAwesomeIcon
                className={cx("hour-glass")}
                icon={faHourglass}
              />{" "}
              <p style={{ fontSize: "15px" }}>
                <span style={{ fontWeight: "bold" }}>Selling fast!</span> Only 7
                left, and 9 people have it in their carts.
              </p>
            </div>
            <div className="d-flex">
              <div className={cx("truck")}>
                <div className={cx("truck1")}>
                  <FontAwesomeIcon icon={faTruckFast} />
                </div>
                <div className={cx("truck-lane")}></div>
              </div>
              <p>
                Arrives by <span style={{ fontWeight: "bold" }}>Jul 20-27</span>{" "}
                if you order today.
              </p>
            </div>
            <div
              className={cx("product-description", {
                "desc-marginBtt": openDesc,
              })}
            >
              <button
                onClick={() => setOpenDesc(!openDesc)}
                className={cx("product-description-fLine")}
              >
                <p>Description</p>
                <p
                  style={{ transform: "rotate(0)" }}
                  className={cx({ "hour-glass-rotate": openDesc })}
                >
                  <FontAwesomeIcon icon={faArrowTurnUp} />
                </p>
              </button>
              <div
                className={cx("product-description-content", {
                  "desc-disappear": openDesc,
                })}
              >
                {product.desc}
              </div>
            </div>
            <div className="product-policies">
              <div className="product-policies-title">
                <button className={cx("product-description-fLine")}>
                  <p>Shopping and return policy</p>
                  <p
                    style={{ transform: "rotate(-180deg)" }}
                    className={cx({ "hour-glass-rotate": openDesc })}
                  >
                    <FontAwesomeIcon icon={faArrowTurnUp} />
                  </p>
                </button>
              </div>
              <div className={cx("product-policies-content")}>
                <div className={cx("product-policies-content-box")}>
                  <p>Ready to ship in</p>
                  <h5>1–3 business days</h5>
                </div>
                <div className={cx("product-policies-content-box")}>
                  <p>Cost to ship</p>
                  <h5>362,892₫</h5>
                </div>
                <div className={cx("product-policies-content-box")}>
                  <p>Returns & exchanges</p>
                  <h5>Accepted</h5>
                </div>
                <div className={cx("product-policies-content-box")}>
                  <p>Return & exchange window</p>
                  <h5>
                    30 days{" "}
                    <p style={{ fontSize: "13px", color: "gray" }}>
                      from item delivery
                    </p>
                  </h5>
                </div>
              </div>
              <p
                style={{
                  fontSize: "13px",
                  padding: "15px",
                  borderRadius: "10px",
                  backgroundColor: "#ddebe3",
                }}
              >
                Etsy offsets carbon emissions from shipping and packaging on
                this purchase.
              </p>
            </div>
          </div>
          <div
            className={cx(
              "col-lg-7",
              "product-review",
              "col-md-12",
              "col-sm-12",
              "col-12",
              { "product-review1": openDesc }
            )}
          >
            <div
              className={cx(
                "d-flex",
                "product-review-title",
                "justify-content-between"
              )}
            >
              <p>
                {numberWithCommas(numReview)} shop reviews{" "}
                <span>
                  <FontAwesomeIcon icon={faStar} />
                </span>
                <span>
                  <FontAwesomeIcon icon={faStar} />
                </span>
                <span>
                  <FontAwesomeIcon icon={faStar} />
                </span>
                <span>
                  <FontAwesomeIcon icon={faStar} />
                </span>
                <span>
                  <FontAwesomeIcon icon={faStar} />
                </span>
              </p>
              <button className={cx("button-collection", "button-recommended")}>
                Sort by: Recommened
              </button>
            </div>
            <p>
              <span
                style={{
                  width: "30px",
                  height: "30px",
                  display: "inline-block",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    fill="purple"
                    d="M12 3a9 9 0 00-9 9 8.87 8.87 0 001.21 4.49l-.92 3.43.79.79 3.43-.92A8.87 8.87 0 0012 21a9 9 0 100-18zm3 12.93l-.37.27L12 14.65 9.41 16.2 9 15.93 9.72 13l-2.28-2 .15-.43 3-.27 1.18-2.77h.46l1.18 2.77 3 .27.15.43-2.28 2 .72 2.93z"
                  ></path>
                </svg>{" "}
              </span>
              Buyers are raving! Multiple people gave 5-star reviews to this
              shop in the past 7 days.
            </p>
            <div className={cx("product-review-customer")}>
              <div className={cx("product-review-customer-rating")}>
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStarHalfAlt} />
              </div>
              <div className={cx("product-review-customer-comment")}>
                <h5>
                  Arrived quickly just seems a little over priced, but happy
                  with the instructions and design.
                </h5>
                <p style={{ fontSize: "13px" }}>
                  <span style={{ fontWeight: "bold" }}>Purchased item:</span>{" "}
                  Embroidery Kit: Roman Chamomile, DIY kit for beginners and
                  in....
                </p>
              </div>
              <div className={cx("product-review-customer-infor")}>
                <img
                  src="https://i.etsystatic.com/iusa/e1d912/34274170/iusa_75x75.34274170_iczz.jpg?version=0"
                  alt=""
                />
                <p>Barbara</p>
                <span>Apr 3, 2022</span>
              </div>
              <button
                style={{ width: "max-content", border: "unset" }}
                className={cx("button", "button-collection")}
              >
                <span style={{ color: "green" }}>
                  <FontAwesomeIcon icon={faThumbsUp} />
                </span>{" "}
                Helpful?
              </button>
            </div>
            <div className={cx("product-review-customer")}>
              <div className={cx("product-review-customer-rating")}>
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStarHalfAlt} />
              </div>
              <div className={cx("product-review-customer-comment")}>
                <h5>
                  Arrived quickly just seems a little over priced, but happy
                  with the instructions and design.
                </h5>
                <p style={{ fontSize: "13px" }}>
                  <span style={{ fontWeight: "bold" }}>Purchased item:</span>{" "}
                  Embroidery Kit: Roman Chamomile, DIY kit for beginners and
                  in....
                </p>
              </div>
              <div className={cx("product-review-customer-infor")}>
                <img
                  src="https://i.etsystatic.com/iusa/e1d912/34274170/iusa_75x75.34274170_iczz.jpg?version=0"
                  alt=""
                />
                <p>Barbara</p>
                <span>Apr 3, 2022</span>
              </div>
              <button
                style={{ width: "max-content", border: "unset" }}
                className={cx("button", "button-collection")}
              >
                <span style={{ color: "green" }}>
                  <FontAwesomeIcon icon={faThumbsUp} />
                </span>{" "}
                Helpful?
              </button>
            </div>
            <div className={cx("product-review-customer")}>
              <div className={cx("product-review-customer-rating")}>
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStarHalfAlt} />
              </div>
              <div className={cx("product-review-customer-comment")}>
                <h5>
                  Arrived quickly just seems a little over priced, but happy
                  with the instructions and design.
                </h5>
                <p style={{ fontSize: "13px" }}>
                  <span style={{ fontWeight: "bold" }}>Purchased item:</span>{" "}
                  Embroidery Kit: Roman Chamomile, DIY kit for beginners and
                  in....
                </p>
              </div>
              <div className={cx("product-review-customer-infor")}>
                <img
                  src="https://i.etsystatic.com/iusa/e1d912/34274170/iusa_75x75.34274170_iczz.jpg?version=0"
                  alt=""
                />
                <p>Barbara</p>
                <span>Apr 3, 2022</span>
              </div>
              <button
                style={{ width: "max-content", border: "unset" }}
                className={cx("button", "button-collection")}
              >
                <span style={{ color: "green" }}>
                  <FontAwesomeIcon icon={faThumbsUp} />
                </span>{" "}
                Helpful?
              </button>
            </div>
            <div className={cx("number-review-page")}>
              <button>
                <FontAwesomeIcon icon={faAngleLeft} />
              </button>
              <button>1</button>
              <button>2</button>
              <p> ... </p>
              <button>20</button>
              <button>
                <FontAwesomeIcon icon={faAngleRight} />
              </button>
            </div>
          </div>
        </div>

        <h4 style={{ marginTop: "60px" }}>
          YOU MAY ALSO LIKE !!!{" "}
          <span style={{ fontSize: "14px", color: "gray" }}>
            including Ads{" "}
          </span>
        </h4>

        <div className="row">
          {listProducts.map((item, index) => {
            if (index > 3 && index < 10) {
              return (
                <div key={index} className={cx("col-lg-2", "product-list")}>
                  <Link className="link" to={`/product/${item.id}`}>
                    <img
                      style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "cover",
                      }}
                      src={item.image}
                      alt=""
                    />
                    <p>{item.name}</p>
                    <span>{numberWithCommas(item.price)}🪙</span>
                  </Link>
                </div>
              );
            } else return "";
          })}
        </div>
      </div>
      <Offcanvas placement="end" scroll show={showProduct} onHide={handleClose}>
        <Offcanvas.Header>
          <Offcanvas.Title>
            <h3>
              <FontAwesomeIcon
                style={{ color: "green" }}
                icon={faCircleCheck}
              />
              1 item added to basket
            </h3>
            <div className={cx("current-product")}>
              <img src={currentProductAdd.image} alt="" />
              <div className={cx("current-product-content")}>
                <h5>{currentProductAdd.name}</h5>
                <p>
                  <span style={{ fontWeight: "bold" }}>Qty : </span>{" "}
                  {currentProductAdd.amount}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Price : </span>
                  {numberWithCommas(
                    +currentProductAdd.price * +currentProductAdd.amount
                  )}
                </p>
              </div>
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <button
            onClick={handleClose}
            className={cx(
              "button",
              "button-buy-now",
              "d-flex",
              "justify-content-center"
            )}
          >
            <span style={{ fontWeight: "bold" }}>Continue Shopping </span>
          </button>
          <Link to="/cart" className="link">
            <button className={cx("button", "button-cart")}>
              View your cart and checkout
            </button>
          </Link>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default ProductBox;
