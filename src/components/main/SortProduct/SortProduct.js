import { useContext, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import classNames from "classnames/bind";
import OwlCarousel from "react-owl-carousel";
import SweetPagination from "sweetpagination";

import styles from "./SortProduct.module.scss";
import {
  faArrowRight,
  faCaretDown,
  faCheck,
  faHandPointRight,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppContext } from "../../../App";
import { useEffect } from "react";
import axios from "axios";
import Tippy from "@tippyjs/react";
import { useRef } from "react";
import { Link, useParams } from "react-router-dom";

const cx = classNames.bind(styles);

function SortProduct() {
  const { menuResponsiveAppear, goLogin } = useContext(AppContext);
  const [showProduct, setShowProduct] = useState(false);
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState({
    free_ship: false,
    etsy_seller: false,
    place: false,
  });
  const { id } = useParams();
  const [free_shipAPI, setFree_shipAPI] = useState({ api: "", render: "" });
  const [placeAPI, setPlaceAPI] = useState({ api: "", render: "" });
  const [categoryAPI, setCategoriesAPI] = useState({});
  const [etsy_sellerAPI, setEtsy_sellerAPI] = useState({
    api: "",
    render: "",
  });
  const [currentPageData, setCurrentPageData] = useState(product);

  const handleFilterFree_ship = () => {
    const _html = "free_ship=true";
    setFilter((prev) => ({ ...prev, free_ship: !filter.free_ship }));
    if (filter.free_ship === false) {
      setFree_shipAPI({ api: _html, render: "free ship" });
    } else {
      setFree_shipAPI({ api: "", render: "" });
      console.log(free_shipAPI);
    }
  };
  const handleEtsy_sellerAPI = () => {
    const _html = "etsy_seller=true";
    setFilter((prev) => ({ ...prev, etsy_seller: !filter.etsy_seller }));
    if (filter.etsy_seller === false) {
      setEtsy_sellerAPI({ api: _html, render: "Etsy Seller" });
    } else {
      setEtsy_sellerAPI({ api: "", render: "" });
    }
  };

  const handleFilterPlace = (e) => {
    let value = e.target.value;
    if (value !== "") {
      setFilter((prev) => ({ ...prev, place: true }));
      setPlaceAPI({ api: `space=${value}`, render: value });
      console.log(value);
    } else {
      setPlaceAPI({ api: "", render: "" });
      setFilter((prev) => ({ ...prev, place: false }));
    }
  };

  const handleFilterCategories = (nameItem, index) => {
    for (let i = -1; i < categories.length; i++) {
      setCategoriesAPI((prev) => ({ ...prev, [`state${i}`]: false, api: "" }));
    }
    if (nameItem !== "") {
      setCategoriesAPI((prev) => ({
        ...prev,
        api: `categories_id=${index + 1}`,
        render: nameItem,
        [`state${index}`]: true,
      }));
    } else {
      setCategoriesAPI((prev) => ({
        ...prev,
        api: ``,
        render: "",
        [`state${index}`]: true,
      }));
    }
  };

  // control button header to sort
  const [showListSortButton, setShowListSortButton] = useState(false);
  const [showListSortButtonVal, setShowListSortButtonVal] =
    useState("Relevancy");
  const [listButtonValAPI, setListButtonValAPI] = useState("");

  const handleClose = () => setShowProduct(false);
  const handleShow = () => setShowProduct(true);

  const handleShowListButtonVal = (e) => {
    const value = e.target.id;
    setShowListSortButtonVal(value);
    if (value === "Lowest Price") {
      setListButtonValAPI("_sort=price&_order=asc");
    } else if (value === "Highest Price") {
      setListButtonValAPI(`_sort=price&_order=desc`);
    } else if (value === "Relevancy")
      setListButtonValAPI("_sort=price&_order=<asc></asc>");
  };

  const cancelFilterInScreen = (methodCancel, filters = "") => {
    for (let i = -1; i < categories.length; i++) {
      setCategoriesAPI((prev) => ({ ...prev, [`state${i}`]: false }));
    }
    methodCancel((prev) => ({ ...prev, api: "", render: "" }));
    setFilter((prev) => ({ ...prev, [filters]: false }));
    console.log(filter);
    setShowListSortButtonVal("Relevancy");
  };

  const [valueInputPriceAPI, setValueInputPriceAPI] = useState({});
  const inputRef = useRef();
  const inputRef2 = useRef();
  const getValueInputPrice = (e) => {
    setValueInputPriceAPI((prev) => ({
      ...prev,
      api: `price_gte=${inputRef.current.value}&price_lte=${inputRef2.current.value}`,
    }));
    console.log(inputRef.current.value);
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8000/products?categories_id=${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:8000/categories")
      .then((res) => setCategories(res.data));
  }, [id]);

  const handleGetValueAPI = () => {
    axios
      .get(
        `http://localhost:8000/products?${free_shipAPI.api}&${placeAPI.api}&${categoryAPI.api}&${listButtonValAPI}&${etsy_sellerAPI.api}&${valueInputPriceAPI.api}`
      )
      .then((res) => setProduct(res.data));
  };

  useEffect(() => {
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].id === +id) {
        handleFilterCategories(categories[i].name, i);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, categories]);

  useEffect(() => {
    handleGetValueAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    placeAPI,
    free_shipAPI,
    categoryAPI,
    showListSortButtonVal,
    etsy_sellerAPI,
    valueInputPriceAPI,
  ]);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // value input price

  return (
    <>
      <div
        className={cx("sort", "container-fluid", {
          toBottom1: menuResponsiveAppear,
        })}
      >
        {goLogin === false ? (
          <OwlCarousel
            className={cx("owl-theme")}
            loop
            margin={10}
            nav={true}
            items={1}
            navText={[
              "<i class='fa-solid fa-angle-left left'></i>",
              "<i class='fa-solid fa-angle-right right'></i>",
            ]}
          >
            <div className={cx("custom-owl")}>
              <img
                src="https://img.freepik.com/free-vector/new-season-banner-template_1361-1221.jpg?size=626&ext=jpg&ga=GA1.2.602386609.1658394778"
                alt=""
              />
            </div>
            <div className={cx("custom-owl")}>
              <img
                src="https://img.freepik.com/free-vector/floral-new-collection-banner-template_1361-1251.jpg?size=626&ext=jpg&ga=GA1.2.602386609.1658394778"
                alt=""
              />
            </div>
            <div className={cx("custom-owl")}>
              <img
                src="https://img.freepik.com/free-vector/new-collection-background-template_1361-1224.jpg?size=626&ext=jpg&ga=GA1.2.602386609.1658394778"
                alt=""
              />
            </div>
          </OwlCarousel>
        ) : (
          ""
        )}
        <div className={cx("sort-header")}>
          <button
            className={cx("sort-header-left")}
            variant="success"
            onClick={handleShow}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
              style={{ width: "30px", height: "30px" }}
            >
              <path d="M5,7.6h5.7c0.4,1.2,1.5,2,2.8,2s2.4-0.8,2.8-2H19c0.6,0,1-0.4,1-1s-0.4-1-1-1h-2.7c-0.4-1.2-1.5-2-2.8-2s-2.4,0.8-2.8,2H5 c-0.6,0-1,0.4-1,1S4.4,7.6,5,7.6z M13.5,5.6c0.6,0,1,0.4,1,1s-0.4,1-1,1s-1-0.4-1-1S12.9,5.6,13.5,5.6z"></path>
              <path d="M19,11.1h-7.7c-0.4-1.2-1.5-2-2.8-2s-2.4,0.8-2.8,2H5c-0.6,0-1,0.4-1,1c0,0.6,0.4,1,1,1h0.7c0.4,1.2,1.5,2,2.8,2 s2.4-0.8,2.8-2H19c0.6,0,1-0.4,1-1C20,11.5,19.6,11.1,19,11.1z M8.5,13.1c-0.6,0-1-0.4-1-1c0-0.6,0.4-1,1-1s1,0.4,1,1 C9.5,12.7,9.1,13.1,8.5,13.1z"></path>
              <path d="M19,16.6h-1.2c-0.4-1.2-1.5-2-2.8-2s-2.4,0.8-2.8,2H5c-0.6,0-1,0.4-1,1s0.4,1,1,1h7.2c0.4,1.2,1.5,2,2.8,2s2.4-0.8,2.8-2 H19c0.6,0,1-0.4,1-1S19.6,16.6,19,16.6z M15,18.6c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S15.6,18.6,15,18.6z"></path>
            </svg>
            <span>Filter</span>
          </button>
          <div className={cx("sort-header-right")}>
            <p>
              <span style={{ fontWeight: "bold" }}>{product.length}</span>{" "}
              results,with Ads{" "}
            </p>
            <div
              className={cx("sort-header-button")}
              onClick={() => setShowListSortButton(!showListSortButton)}
            >
              <button
                className={cx({
                  "sort-header-button-dropdown": showListSortButton,
                })}
              >
                Sort by :{" "}
                <span>
                  {showListSortButtonVal}{" "}
                  <FontAwesomeIcon
                    style={{
                      marginLeft: "10px",
                      fontSize: "15px",
                    }}
                    icon={faCaretDown}
                  />
                </span>
              </button>
              {showListSortButton && (
                <div className={cx("sort-header-button-dropdown-list")}>
                  <ul>
                    <li id="Relevancy" onClick={handleShowListButtonVal}>
                      Relevancy
                      {showListSortButtonVal === "Relevancy" ? (
                        <p>
                          <FontAwesomeIcon icon={faCheck} />
                        </p>
                      ) : (
                        ""
                      )}
                    </li>
                    <li id="Lowest Price" onClick={handleShowListButtonVal}>
                      Lowest Price
                      {showListSortButtonVal === "Lowest Price" ? (
                        <p>
                          <FontAwesomeIcon icon={faCheck} />
                        </p>
                      ) : (
                        ""
                      )}
                    </li>
                    <li id="Highest Price" onClick={handleShowListButtonVal}>
                      Highest Price
                      {showListSortButtonVal === "Highest Price" ? (
                        <p>
                          <FontAwesomeIcon icon={faCheck} />
                        </p>
                      ) : (
                        ""
                      )}
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="d-flex">
          {free_shipAPI.render && (
            <p className={cx("listFilterRender")}>
              {free_shipAPI.render}{" "}
              <span
                onClick={() =>
                  cancelFilterInScreen(setFree_shipAPI, "free_ship")
                }
              >
                X
              </span>
            </p>
          )}
          {placeAPI.render && (
            <p className={cx("listFilterRender")}>
              {placeAPI.render}
              <span onClick={() => cancelFilterInScreen(setPlaceAPI, "place")}>
                {"X"}
              </span>
            </p>
          )}
          {categoryAPI.render && (
            <p className={cx("listFilterRender")}>
              {categoryAPI.render}
              <span onClick={() => cancelFilterInScreen(setCategoriesAPI)}>
                {"X"}
              </span>
            </p>
          )}
          {etsy_sellerAPI.render && (
            <p className={cx("listFilterRender")}>
              {etsy_sellerAPI.render}
              <span
                onClick={() =>
                  cancelFilterInScreen(setEtsy_sellerAPI, "etsy_seller")
                }
              >
                {"X"}
              </span>
            </p>
          )}
          {valueInputPriceAPI.render && (
            <p className={cx("listFilterRender")}>
              {valueInputPriceAPI.render}
              <span onClick={() => cancelFilterInScreen(setValueInputPriceAPI)}>
                {"X"}
              </span>
            </p>
          )}
        </div>
        <Offcanvas scroll show={showProduct} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <h1>FILTERS</h1>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="">
              <h4>Filter by category</h4>
              <p
                className={cx("filter-categories", {
                  "active-category": categoryAPI[`state-1`],
                })}
                onClick={() => handleFilterCategories("", -1)}
              >
                All Categories
              </p>
              {categories.map((item, index) => {
                return (
                  <p
                    onClick={() => handleFilterCategories(item.name, index)}
                    key={index}
                    className={cx("filter-categories", {
                      "active-category": categoryAPI[`state${index}`],
                    })}
                  >
                    <FontAwesomeIcon icon={faHandPointRight} />
                    {item.name}
                  </p>
                );
              })}
              <h4>Price</h4>
              <div className="mb-3">
                <span>Custom</span>
                <div className={cx("filter-input")}>
                  <input
                    className={cx("filter-input-price")}
                    type="number"
                    placeholder="Low"
                    onChange={getValueInputPrice}
                    name="low"
                    ref={inputRef}
                  />
                  <span>to</span>
                  <input
                    className={cx("filter-input-price")}
                    type="number"
                    placeholder="High"
                    onChange={getValueInputPrice}
                    name="high"
                    ref={inputRef2}
                  />
                  <button
                    onClick={() => {
                      setValueInputPriceAPI((prev) => ({
                        ...prev,
                        render: `${numberWithCommas(
                          +inputRef.current.value
                        )}đ - ${numberWithCommas(+inputRef2.current.value)}đ`,
                      }));
                      handleGetValueAPI();
                    }}
                  >
                    Accept
                  </button>
                </div>
              </div>

              <h4>Special Offers</h4>
              <div className={cx("d-flex", "offers")}>
                <input
                  onChange={handleFilterFree_ship}
                  type="checkbox"
                  checked={filter.free_ship}
                  name="ship"
                />
                <span>Free Shipping</span>
              </div>
              <div className={cx("d-flex", "offers")}>
                <input
                  name="etsy"
                  checked={filter.etsy_seller}
                  type="checkbox"
                  onChange={handleEtsy_sellerAPI}
                />
                <span>Etsy seller</span>
              </div>
              <h4 className="mt-3">Place</h4>
              <div className={cx("d-flex", "offers")}>
                <input
                  name="place"
                  value={""}
                  type="radio"
                  onClick={handleFilterPlace}
                />
                <span>All</span>
              </div>
              <div className={cx("d-flex", "offers")}>
                <input
                  name="place"
                  value={"Ha Noi"}
                  type="radio"
                  onClick={handleFilterPlace}
                />
                <span>Ha Noi</span>
              </div>
              <div className={cx("d-flex", "offers")}>
                <input
                  name="place"
                  type="radio"
                  value={"Hai Phong"}
                  onClick={handleFilterPlace}
                />
                <span>Hai Phong</span>
              </div>
              <div className={cx("d-flex", "offers")}>
                <input
                  name="place"
                  type="radio"
                  value={"Ho Chi Minh"}
                  onClick={handleFilterPlace}
                />
                <span>Ho Chi Minh</span>
              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>

        <div className="row">
          {currentPageData.map((item, index) => {
            return (
              <div className="col-lg-3" key={index}>
                <Link className="link" to={`/product/${item.id}`}>
                  <div className={cx("product")}>
                    <div className={cx("product-img")}>
                      <img className="card-img" src={item.image} alt="" />
                    </div>
                    <div className={cx("product-content")}>
                      <p className={cx("product-content-name")}>{item.name}</p>
                      <div className={cx("product-content-rating")}>
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />

                        {item.etsy_seller ? (
                          <div>
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
                        ) : (
                          ""
                        )}
                      </div>
                      {item.sales ? (
                        <div className={cx("product-content-sales")}>
                          <p>
                            {numberWithCommas(item.sales)}₫{" "}
                            <span>{numberWithCommas(item.price)}₫</span>
                          </p>
                        </div>
                      ) : (
                        <div className={cx("product-content-price")}>
                          <p>{numberWithCommas(item.price)}₫</p>
                        </div>
                      )}
                      <span style={{ fontSize: "12px", color: "gray" }}>
                        Add by Etsy seller
                      </span>
                      <br />
                      {item.free_ship && (
                        <p className={cx("product-content-freeShip")}>
                          Free Shipping
                        </p>
                      )}
                    </div>
                    <button>
                      More information{" "}
                      <span>
                        <FontAwesomeIcon icon={faArrowRight} />
                      </span>
                    </button>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <SweetPagination
        currentPageData={setCurrentPageData}
        dataPerPage={8}
        getData={product}
        navigation={true}
        getStyle={"style-1"}
      />
    </>
  );
}

export default SortProduct;
