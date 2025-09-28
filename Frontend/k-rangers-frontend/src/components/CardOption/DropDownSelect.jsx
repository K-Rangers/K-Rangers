import styles from "../../css/CardOption/DropDownSelect.module.css";

function DropDownSelect({options, value, onChange }) {
    return (
        <div className={styles.wrap}>
            <select
                className={styles.select}
                value={value}
                onChange={(e) => onChange && onChange(e.target.value)}
            >
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