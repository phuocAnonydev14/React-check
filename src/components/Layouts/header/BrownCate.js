import clsx from "clsx";
import styles from "./Header.module.scss";

function BrownCate({ isAppearBrownCate, setIsAppearBrownCate }) {
  return (
    <ul
      className={clsx(styles.brownCate, {
        [styles.brownCateDisappear]: isAppearBrownCate,
      })}
    >
      <li>
        <a href="#1"> Jewelry & Accessories</a>
        <div className={styles.linkUnderline}></div>
      </li>
      <li>
        <a href="#2">Clothing & Shoes</a>
        <div className={styles.linkUnderline}></div>
      </li>
      <li>
        <a href="#3"> Home & Living</a>
        <div className={styles.linkUnderline}></div>
      </li>
      <li>
        <a href="#4"> Wedding & Party</a>
        <div className={styles.linkUnderline}></div>
      </li>
      <li>
        <a href="#4"> Toys & Entertainment</a>
        <div className={styles.linkUnderline}></div>
      </li>
      <li>
        <a href="#4">Art & Collectibles</a>
        <div className={styles.linkUnderline}></div>
      </li>
      <li>
        <a href="#4">Craft & Tools</a>
        <div className={styles.linkUnderline}></div>
      </li>
    </ul>
  );
}

export default BrownCate;
