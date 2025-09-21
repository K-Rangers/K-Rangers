import styles from "../css/DropDownSelect.module.css";

function DropDownSelect({ name, placeholder, options, value, onChange }) {
    return (
        <div className={styles.wrap}>
            <select
                name={name}
                className={styles.select}
                value={value}
                onChange={(e) => onChange && onChange(e.target.value)}
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
            <span className={styles.arrow}>▾</span>
        </div>
    );
}
export default DropDownSelect;