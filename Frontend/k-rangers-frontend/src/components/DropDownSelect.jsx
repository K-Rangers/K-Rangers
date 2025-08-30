import styles from "../css/DropDownSelect.module.css";

function DropDownSelect({ name, placeholder, options, value, onChange }) {
    return (
        <div className={styles.wrap}>
            <select
                name={name}
                className={styles.select}
                value={value}
                onChange={(e) => onChange && onChange(e.target.value)}
                aria-label={placeholder}
            >
                <option value="" disabled hidden>
                    {placeholder}
                </option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            <span className={styles.arrow} aria-hidden="true">▾</span>
        </div>
    );
}
export default DropDownSelect;