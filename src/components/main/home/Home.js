import PopularCategories from "../categoryhead/Categories";

import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { AppContext } from "../../../App";
import IconHeart from "../iconHeart/iconHeart";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

function Home() {
  const cx = classNames.bind(styles);
  const [products, setProducts] = useState([]);
  const { menuResponsiveAppear, goLogin, isLoggedIn } = useContext(AppContext);

  // console.log(isLoggedIn.account.state);
  const SelectionList = [
    "Anniversary Gifts",
    "Gifts For Him",
    "Gifts For Her",
    "Personalized Gifts Ideas",
    "Wedding Gifts",
  ];

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
    axios
      .get("http://localhost:8000/products")
      .then((res) => setProducts(res.data));
  }, []);

  return (
    <div className={cx("home")}>
      <PopularCategories user menuResponsiveAppear={menuResponsiveAppear} />
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
            <Link className="link" to="/sortProduct/7">
              <img
                src="https://img.freepik.com/free-vector/new-season-banner-template_1361-1221.jpg?size=626&ext=jpg&ga=GA1.2.602386609.1658394778"
                alt=""
              />
            </Link>
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
      <div style={{ marginInline: "30px" }}>
        <div className={cx("product-firstLine")}>
          <div className={cx("row", "background-cate")}>
            <div className={cx("background-banner")}>
              <img
                src="https://denisechandler.com/wp-content/themes/portfolio_oct2021/images/shop_sign.png"
                alt=""
              />
            </div>

            {products.map((item, index) => {
              if (item.id > 4) {
                var smHeight = true;
              } else smHeight = false;
              if (index <= 7) {
                return (
                  <div
                    className={cx("col-lg-3", "col-md-6", "col-sm-6", "col-12")}
                    key={item.id}
                  >
                    <div
                      className={cx("product-firstLine-product", {
                        smHeight: smHeight,
                      })}
                    >
                      <Link className="link" to={`/product/${item.id}`}>
                        <img className="card-img" src={item.image} alt="" />
                      </Link>
                      <p className={cx("product-firstLine-price")}>
                        {numberWithCommas(item.price)}₫
                        {item.sales && (
                          <span>({numberWithCommas(item.sales)}% off)</span>
                        )}
                      </p>
                      <div className={styles.iconHeart}>
                        <IconHeart item={item} index={index} />
                      </div>
                    </div>
                  </div>
                );
              } else return "";
            })}
          </div>
        </div>

        <div className={cx("product-secondLine")}>
          <div className={cx("product-secondLine-title")}>
            <h3>
              Sponsored by <span>Etsy Sellers</span>⚔️
            </h3>
            <p style={{ color: "#727272" }}>
              Fun fact: behind every sponsored item there is an Etsy seller
              hoping you'll check out their shop
            </p>
          </div>
          <div className=" d-flex flex-wrap justify-content-start ">
            {products.map((item, index) => {
              if (item.id >= 8 && item.id <= 12) {
                return (
                  <div
                    className={cx(
                      "product-firstLine-product",
                      "product-secondLine-product"
                    )}
                    key={item.id}
                  >
                    <Link to={`/product/${item.id}`}>
                      <img className="card-img" src={item.image} alt="" />
                    </Link>

                    <p
                      className={cx(
                        "product-firstLine-price",
                        "product-secondLine-price"
                      )}
                    >
                      {numberWithCommas(item.price)}₫
                      {item.sales ? (
                        <span>({numberWithCommas(item.sales)}% off)</span>
                      ) : (
                        ""
                      )}
                    </p>
                    <div className={clsx(styles.iconHeart)}>
                      <IconHeart item={item} index={index} />
                    </div>
                  </div>
                );
              } else return "";
            })}
          </div>
        </div>

        <div className={cx("product-thirdLine")}>
          <h3 className={cx("product-thirdLine-title")}>
            Favorite the items you like to get instant recommendations
          </h3>
          <div className={cx("row", "product-thirdLine-list")}>
            {products.map((item, index) => {
              if (item.id >= 13 && item.id <= 16) {
                return (
                  <div
                    className={cx("col-lg-3", "col-md-6", "col-sm-6", "col-12")}
                    key={item.id}
                  >
                    <div
                      className={cx(
                        "product-firstLine-product",
                        "product-thirdLine-list-product"
                      )}
                    >
                      <Link className="link" to={`/product/${item.id}`}>
                        <img className="card-img" src={item.image} alt="" />
                        <div
                          className={cx("product-thirdLine-list-product-title")}
                        >
                          <p>{item.name}</p>
                          <p></p>
                        </div>
                      </Link>
                      <div className={clsx(styles.iconHeart)}>
                        <IconHeart item={item} index={index} />
                      </div>
                    </div>
                  </div>
                );
              } else return "";
            })}
          </div>
        </div>

        <div className={cx("product-thirdLine")}>
          <div className={cx("product-thirdLine-title")}>
            <h3>Shop we think you will love</h3>
            <p style={{ color: "gray", fontSize: "18px" }}>
              Based on your recent activity
            </p>
          </div>
          <div
            className={cx(
              "row ",
              "product-thirdLine-list",
              "product-fourthLine-list",
              "m-auto"
            )}
          >
            {products.map((item, index) => {
              if (item.id >= 17 && item.id <= 19) {
                return (
                  <div
                    className={cx("col-lg-4", "col-md-6", "col-sm-6", "col-12")}
                    key={item.id}
                  >
                    <div
                      className={cx(
                        "product-firstLine-product",
                        "product-thirdLine-list-product"
                      )}
                    >
                      <Link className="link" to={`/product/${item.id}`}>
                        <img className="card-img" src={item.image} alt="" />
                        <div
                          className={cx("product-thirdLine-list-product-title")}
                        >
                          <p style={{ marginBottom: "unset" }}>{item.name}</p>
                          <p>
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <span style={{ marginLeft: "10px" }}>
                              {" "}
                              {Math.floor(Math.random() * 1000)} items
                            </span>
                          </p>
                        </div>
                      </Link>
                      <div className={clsx(styles.iconHeart)}>
                        <IconHeart item={item} index={index} />
                      </div>
                    </div>
                  </div>
                );
              } else return "";
            })}
          </div>
        </div>

        <div className="explore mt-5 ">
          <div className="explore-title text-center mb-5">
            <h3 style={{ fontSize: "35px", fontWeight: "300" }}>
              Explore one-of-a-kind finds
            </h3>
            <p style={{ color: "gray", fontWeight: "500" }}>
              There's no Etsy warehouse—just millions of people selling the
              things they love
            </p>
          </div>

          <div className="explore-content">
            <PopularCategories />
          </div>
        </div>

        <div className={cx("product-secondLine", "selection")}>
          <div className={cx("product-secondLine-title")}>
            <h3 style={{ color: "black" }}>Shop our selections</h3>
            <p style={{ color: "#727272" }}>
              Curated collections hand-picked by Etsy editors
            </p>
          </div>
          <div className=" d-flex flex-wrap justify-content-start ">
            {products.map((item, index) => {
              let i;
              if (item.id === 13) i = 0;
              else if (item.id === 14) i = 1;
              else if (item.id === 15) i = 2;
              else if (item.id === 16) i = 3;
              else i = 4;
              if (item.id >= 13 && item.id <= 17) {
                return (
                  <div
                    className={cx(
                      "product-firstLine-product",
                      "product-secondLine-product"
                    )}
                    key={item.id}
                  >
                    <div style={{ height: "180px" }}>
                      <Link to={`/product/${item.id}`}>
                        <img className="card-img" src={item.image} alt="" />
                      </Link>
                    </div>
                    <div className={cx("selection-content")}>
                      <h6>{SelectionList[i]}</h6>
                    </div>
                  </div>
                );
              } else return "";
            })}
          </div>
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1400 48"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
        style={{
          transform: "rotate(180deg)",
          marginBottom: "-1px",
          marginTop: "50px",
        }}
      >
        <path
          fill="#fdebd2"
          d="M1400 0l-55 12-23 10-23 4-6-1-9 1-5 2-24 8h-11l-18-5-11-1-10-1h-7l-8 3-8 1-14-4v1l-3 1-9-5-3-1-17 2-10-1-9-1-8 1-7 1-2 1h-13l-2-1-13-2h-20l-11 2-14 3h-18l-10 1-3-1-2-1-4-1h-4l-16 1h-2l-7-1h-6l-8 1-6-2-5-1-2 1-20-1-10 2h-6l-11-1-9-1h-4l-3 1-19 1h-19l-3-1-11 1h-2l-7 3h-23l-3 1h-19l-16-1-17 1h-8l-2-1-20-2-4 1-4-1h-2l-12 1-2 1h-13l-9 1h-4l-6-1-10 1-9-1h-15l-9 2-12-2-12-2-3 2-5 2-11-3-6 1h-6l-28 1-5 2h-33l-3 1-4 2h-17l-5 1-4-1-7-1h-5l-4 1-13 3-2-2-2-1h-15l-22-1h-2l-11 1h-5l-2-1h-19l-9 1-6-1h-2l-9 2-15 2h-4l-12 1h-25l-12 1-7 1h-4l-4 1h-4l-4 1h-20l-3-1h-7l-1-1v-4l-1 1h-2l-9 1-2 2-6 2-7 1-5 2h-2l-3-2-8-1h-4l-11 3h-1l-3-2-11-3-20-6-9-3h-3l-9 2h-5l-11-4-13-3-11-15-21-4L0 0h1400z"
        ></path>
      </svg>
      <div className={cx("definition")}>
        <div className={cx("definition-content")}>
          <h2>What is Etsy?</h2>
          <p>Read our wonderfully weird story</p>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12 ">
              <h5 style={{ fontSize: "28px", marginBottom: "15px" }}>
                A community doing good
              </h5>
              <p style={{ fontSize: "16px" }}>
                Etsy is a global online marketplace, where people come together
                to make, sell, buy, and collect unique items. We’re also a
                community pushing for positive change for small businesses,
                people, and the planet.{" "}
                <span style={{ textDecoration: "underline dashed" }}>
                  people, and the planet. Here are some of the ways we’re making
                  a positive impact, together. people, and the planet.{" "}
                </span>
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <h5 style={{ fontSize: "28px", marginBottom: "15px" }}>
                Support independent creators
              </h5>
              <p style={{ fontSize: "16px" }}>
                There’s no Etsy warehouse – just millions of people selling the
                things they love .{" "}
                <span style={{ textDecoration: "underline dashed" }}>
                  We make the whole process easy, helping you connect directly
                  with makers to find something extraordinary. things they love.{" "}
                </span>
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <h5 style={{ fontSize: "28px", marginBottom: "15px" }}>
                Peace of mind
              </h5>
              <p style={{ fontSize: "16px" }}>
                Your privacy is the highest priority of our dedicated team. And
                if you ever need assistance, we are always ready to step in for
                support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
