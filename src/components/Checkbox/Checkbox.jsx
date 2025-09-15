import styles from "./Checkbox.module.css"

function Checkbox({isChecked, onChange=() => {}, text=""}) {

    return (
        <label className={`${styles.label} ${styles.filterLabelContainer}`}>
                <>
                    <span className={`${styles.labelText}`}>{text}</span>
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={onChange}
                    />
                    <svg
                        className={`${styles.checkbox} ${isChecked ? styles.active : ""}`}
                        aria-hidden="true"
                        fill="none"
                        viewBox="0 0 17 15"
                    >
                        <path
                            d="M2 9L6 12L15 0"
                            strokeWidth="2"
                            stroke={isChecked ? "#fff" : "none"}
                            strokeLinecap="round"
                        />
                    </svg>
                </>
        </label>
    )

}

export default Checkbox;