import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styles from "./Categories.module.scss";
import classNames from "classnames/bind";
import { AppContext } from "../../../App";
import clsx from "clsx";
import { Link } from "react-router-dom";

function PopularCategories({ menuResponsiveAppear, user }) {
  const [products, setProducts] = useState([]);
  const cx = classNames.bind(styles);

  const { isLoggedIn } = useContext(AppContext);
  useEffect(() => {
    axios
      .get("http://localhost:8000/categories")
      .then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="">
      {user && (
        <>
          {isLoggedIn.account.state === true ? (
            <h1 className={styles.userGreeting}>
              Welcome back,
              <span> {isLoggedIn.account.name}</span> !
            </h1>
          ) : (
            <h1 className={styles.greeting}>
              Find things you'll love. Support independent sellers. Only on
              Etsy.
            </h1>
          )}
        </>
      )}
      <div className={cx("container")}>
        <div
          className={clsx(styles.listProducts, "row", {
            toBottom: menuResponsiveAppear,
          })}
        >
          {products.map((product, index) => {
            if (index >= 6) {
              return "";
            } else {
              return (
                <div
                  key={index}
                  className={cx(
                    "col-lg-2",
                    "col-md-4",
                    "col-sm-6",
                    "col-12",
                    "product",
                    {}
                  )}
                >
                  <div
                    className={clsx(styles.productImg, {
                      [styles.zIndex]: menuResponsiveAppear,
                    })}
                  >
                    <Link to={`/sortProduct/${product.id}`}>
                      <img src={product.image} alt="" />
                    </Link>
                  </div>
                  <p
                    className={clsx(styles.productName, {
                      [styles.zIndex]: menuResponsiveAppear,
                    })}
                  >
                    {product.name}
                  </p>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default PopularCategories;
