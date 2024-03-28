import { useState } from 'react';
import styles from './App.module.scss';

function App() {
  const [email, setEmail] = useState<string>('');
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [errorMail, setErrorMail] = useState<boolean>(false);
  const [showSuscribed, setShowSuscribed] = useState<boolean>(false);

  const regexMail =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;

  function checkEmail(email: string) {
    if (regexMail.test(email)) {
      setValidEmail(true);
      setErrorMail(false);
      setEmail(email);
    } else {
      setValidEmail(false);
      setErrorMail(true);
    }
  }
  function setDefault() {
    setValidEmail(false);
    setEmail('');
    setErrorMail(false);
    setShowSuscribed(false);
  }
  function sendForm() {
    if (validEmail) setShowSuscribed(true);
  }

  return (
    <main className={styles.main}>
      {!showSuscribed ? (
        <div className={styles.card}>
          <img
            src="/assets/images/illustration-sign-up-mobile.svg"
            alt="imagen ilustrativa"
            title="imagen ilustrativa"
            className={styles.imgMobile}
          />
          <section>
            <h1>Stay updated!</h1>
            <p>Join 60,000+ product managers receiving monthly updates on:</p>
            <ul className={styles.list}>
              <li className={styles.itemList}>
                <img src="/assets/images/icon-list.svg" alt="icono list" />
                <p>Product discovery and building what matters</p>
              </li>
              <li className={styles.itemList}>
                <img src="/assets/images/icon-list.svg" alt="icono list" />
                <p>Measuring to ensure updates are a success</p>
              </li>
              <li className={styles.itemList}>
                <img src="/assets/images/icon-list.svg" alt="icono list" />
                <p>And much more!</p>
              </li>
            </ul>
            <form onSubmit={sendForm}>
              <label htmlFor="email">Email adress</label>
              <input
                className={[
                  errorMail && styles.errorInput,
                  styles.inputMail,
                ].join(' ')}
                type="email"
                id="email"
                onBlur={e => {
                  checkEmail(e.target.value);
                }}
                placeholder="email@company.com"
              />
              {errorMail && <small>Valid email required</small>}
              <button className={styles.buttonSend} disabled={!validEmail}>
                Subscribe to monthly newsletter
              </button>
            </form>
          </section>
          <img
            src="/assets/images/illustration-sign-up-desktop.svg"
            alt="imagen ilustrativa"
            title="imagen ilustrativa"
            className={styles.imgDesktop}
          />
        </div>
      ) : (
        <div className={[styles.card, styles.cardSuccess].join(' ')}>
          <section className={styles.sectionSuccess}>
            <img
              className={styles.iconSuccess}
              src="/assets/images/icon-success.svg"
              alt="icono success"
            />
            <h1>Thanks for subscribing!</h1>
            <p>
              A confirmation email has been sent to{' '}
              <span className={styles.mailBold}>{email}</span>. Please open it
              and click the button inside to confirm your subscription
            </p>
          </section>

          <button className={styles.buttonSend} onClick={setDefault}>
            Demiss message
          </button>
        </div>
      )}
    </main>
  );
}

export default App;
