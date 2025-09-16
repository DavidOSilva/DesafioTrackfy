import Icon from "../Icon/Icon";

import styles from "./ToggleSelector.module.css";

function ToggleSelector({ options, legend, value, onChange }) {
  const optionKeys = Object.keys(options);
  const selectedIndex = optionKeys.indexOf(value);

  const sliderWidth = `calc((100% - 8px) / ${optionKeys.length})`;
  const sliderTransform = `translateX(${selectedIndex * 100}%)`;

  return (
    <div className={`${styles.container}`}>
      <span className={styles.legend}>{legend}</span>
      <div
        className={styles.slider}
        style={{
          width: sliderWidth,
          transform: sliderTransform,
        }}
      ></div>
      {optionKeys.map((key) => {
        const { label, icon } = options[key];
        return (
          <button
            key={key}
            className={`${styles.option} ${value === key ? styles.optionActive : ""}`}
            onClick={() => onChange(key)}
          >
            {icon && <Icon icon={icon} className={styles.optionIcon} />}
            {label}
          </button>
        );
      })}
    </div>
  );
}

export default ToggleSelector;