import { faXmark, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import clsx from "clsx";
import { useEffect, useState } from "react";
import styles from "./Login.module.scss";
import Swal from "sweetalert2";
import { useRef } from "react";

function useOutsideAlerter(ref, hide) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        hide(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, hide]);
}

function Register({ setOpenRegister, setGoLogin }) {
  const [isFocus, setIsFocus] = useState({});
  const [userRegister, setUserRegister] = useState({});
  const [canClickButton, setCanClickButton] = useState(true);
  const [dataUser, setDataUser] = useState([]);
  const boxRef = useRef();
  const [eyeShowPass, setEyeShowPass] = useState(true);

  const handleShowPassword = () => {
    let passwordId = document.querySelector("#passwordId");
    if (passwordId.type === "text") {
      passwordId.type = "password";
      setEyeShowPass(true);
    } else if (passwordId.type === "password") {
      passwordId.type = "text";
      setEyeShowPass(false);
    }
  };

  useOutsideAlerter(boxRef, setGoLogin);
  useEffect(() => {
    axios
      .get("http://localhost:8000/account")
      .then((res) => setDataUser(res.data));
  }, []);

  const show = (e) => {
    setIsFocus({ [e.target.name]: true });
  };

  const hide = (e) => {
    setIsFocus({ [e.target.name]: false });
  };

  const getValueRegis = (e) => {
    setUserRegister((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    if (userRegister.name && userRegister.email && userRegister.password) {
      setCanClickButton(false);
    } else setCanClickButton(true);
  };

  const handleSubmitAndPost = (e) => {
    e.preventDefault();
    var re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (re.test(userRegister.email) && userRegister.name !== "") {
      let checkValidAccount = false;
      dataUser.forEach((item) => {
        if (
          item.name === userRegister.name &&
          item.email === userRegister.email
        )
          checkValidAccount = true;
      });
      if (checkValidAccount) {
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: "Available Account",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        axios
          .post("http://localhost:8000/account", userRegister)
          .then(() => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your account has been saved",
              showConfirmButton: false,
              timer: 1500,
            });

            setOpenRegister(false);
            setGoLogin(false);
          })
          .catch((err) => console.log(err));
      }
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "email not valid",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div className="">
      <form onSubmit={handleSubmitAndPost}>
        <div className={styles.bgc}>
          <div ref={boxRef} className={styles.loginBox}>
            <div onClick={() => setGoLogin(false)} className={styles.cancel}>
              <FontAwesomeIcon icon={faXmark} />
            </div>
            <h3 style={{ paddingLeft: "5px" }}>Create your account</h3>
            <p style={{ paddingLeft: "5px" }}>Registration is easy.</p>
            <div
              className={clsx(styles.searchBox, {
                [styles.borderFocus]: isFocus.email,
              })}
            >
              <p>
                Email Address <span>*</span>
              </p>
              <input
                onChange={getValueRegis}
                name="email"
                onBlur={hide}
                onFocus={show}
                type="text"
              />
            </div>
            <div
              className={clsx(styles.searchBox, {
                [styles.borderFocus]: isFocus.password,
              })}
            >
              <p>
                Password <span>*</span>
              </p>
              <input
                onChange={getValueRegis}
                name="password"
                onBlur={hide}
                onFocus={show}
                id="passwordId"
                type="password"
              />
              {eyeShowPass ? (
                <FontAwesomeIcon
                  onClick={handleShowPassword}
                  className={clsx(styles.eyeShow)}
                  icon={faEye}
                />
              ) : (
                <FontAwesomeIcon
                  onClick={handleShowPassword}
                  className={clsx(styles.eyeShow)}
                  icon={faEyeSlash}
                />
              )}
            </div>
            <div
              className={clsx(styles.searchBox, {
                [styles.borderFocus]: isFocus.name,
              })}
            >
              <p>
                user name <span>*</span>
              </p>
              <input
                onChange={getValueRegis}
                name="name"
                onBlur={hide}
                onFocus={show}
                type="text"
              />
            </div>
            <h4>Forgot your password?</h4>
            <button
              type="submit"
              className={clsx(styles.signIn, {
                [styles.fadedButton]: canClickButton,
              })}
            >
              Sign Up
            </button>
            <h4>Trouble Signing in?</h4>
            <p>
              By clicking Sign in or Continue with Google, Facebook, or Apple,
              you agree to Etsy's Terms of Use and Privacy Policy. Etsy may send
              you communications; you may change your preferences in your
              account settings. We'll never post without your permission.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
