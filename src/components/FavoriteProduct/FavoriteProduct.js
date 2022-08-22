import { useState } from "react";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppContext } from "../../App";

import { removeFavoriteCart } from "../../features/favoriteProduct";
import styles from "./FavoriteProduct.module.scss";

function FavoriteProduct() {
  const { isLoggedIn } = useContext(AppContext);
  const idUser = isLoggedIn.account.id;
  const productCartList = useSelector((state) => state.favoriteProduct.value);

  const [productRender, setProductRender] = useState([]);
  useEffect(() => {
    let dataShoppingCart = JSON.parse(
      localStorage.getItem(`favoriteProduct${idUser}`)
    );
    if (dataShoppingCart) setProductRender(dataShoppingCart);
    window.scrollTo(0, 0);
  }, [productCartList, idUser]);
  console.log(productCartList[idUser]);
  const dispatch = useDispatch();
  return (
    <div className="container">
      {isLoggedIn.account.state ? (
        productCartList.length > 0 ? (
          <div className="d-flex flex-wrap justify-content-between">
            {productRender.map((item, index) => {
              return (
                <div className={styles.favoriteProduct}>
                  <div
                    className="card mb-3"
                    style={{
                      maxWidth: "500px",
                      marginRight: "30px",
                      height: "200px",
                      overflow: "hidden",
                    }}
                  >
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src={item.image}
                          style={{
                            height: "200px",
                            width: "200px",
                            objectFit: "cover",
                          }}
                          className="img-fluid rounded-start "
                          alt="..."
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className={styles.name}>{item.name}</h5>
                          <p className="card-text">
                            Star seller -
                            <small className="text-muted">
                              {item.free_ship && " Free Ship"}
                            </small>
                          </p>
                          <p className="card-text"></p>
                          <Link to={`/product/${item.id}`}>
                            <button>More Detail</button>
                          </Link>
                          <button
                            onClick={() =>
                              dispatch(removeFavoriteCart({ idUser, index }))
                            }
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <h1>Add your favorite product</h1>
        )
      ) : (
        <h1>Sign in to use your favorite cabinet</h1>
      )}
    </div>
  );
}

export default FavoriteProduct;
