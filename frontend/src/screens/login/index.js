import React, {useCallback, useContext, useEffect, useState} from 'react'
import styles from './index.module.css'
import Input from "../../components/input"
import Button from "../../components/button"
import userRequests from "../../services/http/user"
import AppContext from "../../contexts/app.context"
import PinInput from "../../components/pin-input"

const LoginScreen = () => {
    const [login, setLogin] = useState('');
    const [pin, setPin] = useState('');
    const [loading, setLoading] = useState(false);
    const [init, setInit] = useState(false);

    const context = useContext(AppContext);

    const onChangeLogin = useCallback((ev) => {
        setLogin(ev.target.value);
    }, [setLogin]);

    const onChangePin = useCallback((index, value) => {
        const oldPin = pin.split("");
        oldPin[index] = value;

        setPin(oldPin.join(""));
    }, [setPin, pin]);

    const submitForm = useCallback(async (e) => {
		e.preventDefault();
        try {
            setLoading(true);
            const response = await userRequests.login(login, pin);

            context.login(response.data.data.token);
        } catch(e) {
            alert("Invalid pin-code");
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, [setLoading, context, login, pin]);

    useEffect(() => {
        setInit(true);
    }, []);

    const rootClassName = `${styles.root} ${(init ? styles.ready : '')}`;

    return (
        <section className={rootClassName}>
            <div className={styles.sectionContainer}>
                <div className={styles.row}>
                    <div className={styles.header}>
                        <h3 className={styles.headerTitle}>Welcome back!</h3>
                        <p className={styles.headerText}>Please log in by input your login and PIN code.</p>
                    </div>

                    <div className={styles.form}>
                        <form onSubmit={submitForm}>
                            <div className={styles.formInput}>
                                <Input label={"Login"} value={login}
                                       id={"login"}
                                       onChange={onChangeLogin}/>
                            </div>

                            <div className={styles.formInput}>
                                <PinInput value={pin}
                                          label={"Enter your PIN code"}
                                          maxLength={4}
                                          onChange={onChangePin} />
                            </div>
                        </form>
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.formButton}>
                        <Button variant={"success"} text={"Login"}
                                type={'submit'}
                                disabled={loading}
                                onClick={submitForm} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginScreen;
