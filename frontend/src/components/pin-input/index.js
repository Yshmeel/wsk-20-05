import {useCallback, useMemo, useRef} from "react"
import styles from './index.module.css'

const PinInput = (props) => {
    const {
        label,
        value = '',
        maxLength = 4,
        onChange
    } = props;

    const inputRefs = useRef([]);

    const onChangeHandler = useCallback((index, ev) => {
        onChange(index, ev.target.value);

        if(index !== (maxLength - 1)) {
            inputRefs.current[index + 1].focus();
        }
    }, [onChange]);

    const onKeyUp = useCallback((index, e) => {
        if(e.key === "Backspace" && inputRefs.current[index - 1]) {
            e.preventDefault();

            onChange(index, '');
            inputRefs.current[index].value = '';
            inputRefs.current[index - 1].focus();
        }
    }, [inputRefs.current, onChange]);

    const renderedInputs = useMemo(() => {
        const values = value.split("");

        return new Array(maxLength).fill(null).map((v, i) => {
            const getRef = (ref) => {
                inputRefs.current[i] = ref;
            };

            return (
                <input type="text" value={values[i] || ''}
                       className={styles.input}
                       maxLength={1}
                       ref={getRef}
                       key={"pin-input" + i}
                       onKeyDown={(e) => onKeyUp(i, e)}
                       onChange={(e) => onChangeHandler(i, e)} />
            );
        });
    }, [maxLength, value, onChangeHandler]);

    return (
        <div className={styles.root}>
            <span className={styles.label}>{label}</span>
            <div className={styles.inputs}>
                {renderedInputs}
            </div>
        </div>
    );
};

export default PinInput;
