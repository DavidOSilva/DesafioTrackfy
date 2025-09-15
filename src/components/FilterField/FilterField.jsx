import { useState, useRef, useEffect } from "react";
import Icon from "../Icon/Icon";
import styles from "./FilterField.module.css";
import Checkbox from "../Checkbox/Checkbox";
import { IoIosArrowDown } from "react-icons/io";
import { MdClear } from "react-icons/md";

function FilterField({
  label,
  name,
  options = [],
  selectedValues = [],
  onChange,
  icon = null,
}) {
  const safeSelectedValues = Array.isArray(selectedValues) ? selectedValues : []; // Garante que selectedValues seja sempre um array
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showClearButton, setShowClearButton] = useState(false);
  const ref = useRef(null);
  const inputRef = useRef(null);

  // Filtra opções pelo termo de busca
  const filteredOptions = options.filter(opt =>
    (opt.label || opt).toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sincroniza o estado do botão clear com mudanças externas nos selectedValues
  useEffect(() => {
    // Se não há dropdown aberto, atualiza o estado do botão clear
    if (!isOpen) {
      setShowClearButton(safeSelectedValues.length > 0);
    }
  }, [safeSelectedValues.length, isOpen]);

  // Fecha dropdown ao clicar fora
  const handleBlur = (e) => {
    if (ref.current && !ref.current.contains(e.relatedTarget)) {
      setIsOpen(false);
      setSearchTerm("");
      setShowClearButton(safeSelectedValues.length > 0); // Atualiza a visibilidade do botão clear quando fechar
    }
  };

  // Controla a abertura/fechamento do dropdown
  const handleToggleDropdown = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    
    // Foca no input quando abre
    if (newIsOpen) setTimeout(() => inputRef.current?.focus(), 0);
    
    // Quando o dropdown fecha, atualiza a visibilidade do botão clear
    if (!newIsOpen) setShowClearButton(safeSelectedValues.length > 0);

    // Quando abre, se não tem botão clear ainda, verifica se deve mostrar
    else if (!showClearButton) {
      setShowClearButton(safeSelectedValues.length > 0);
    }
  };

  // Limpa todas as seleções deste filtro
  const handleClear = () => {
    onChange(name, []);
    setShowClearButton(false);
  };

  // Alterna seleção de um item
  const handleToggle = (value) => {
    let newSelected;
    if (safeSelectedValues.includes(value)) {
      newSelected = safeSelectedValues.filter(v => v !== value);
    } else {
      newSelected = [...safeSelectedValues, value];
    }
    // Chama onChange passando o name e os novos valores
    onChange(name, newSelected);
  };

  return (
    <div
      className={styles.container}
      tabIndex={0}
      ref={ref}
      onBlur={handleBlur}
    >
        <div className={`${styles.filterButtonContainer}`}>
            <button
                className={`${styles.filterButton} ${showClearButton ? styles.filterButtonShorter : ""}`}
                type="button"
                onClick={handleToggleDropdown}
            >
                {icon && <Icon icon={icon} className={styles.icon}/>}
                <input
                    ref={inputRef}
                    type="text"
                    className={styles.searchInput}
                    placeholder={isOpen ? "" : `${label}${safeSelectedValues.length > 0 ? ` (${safeSelectedValues.length})` : ''}`}
                    value={isOpen ? searchTerm : ''}
                    onChange={e => setSearchTerm(e.target.value)}
                    readOnly={!isOpen}
                    style={{ cursor: isOpen ? 'text' : 'pointer' }}
                />
                <span className={styles.iconContainer}><Icon icon={IoIosArrowDown} className={`${styles.iconButton} ${isOpen ? styles.iconButtonRotated : ''}`}/></span>
            </button>
            {showClearButton && (
                <button className={styles.filterButtonClear} onClick={handleClear} type="button" >
                    <span className={styles.iconContainer}><Icon icon={MdClear} className={styles.iconButton}/></span>
                </button>
            )}
        </div>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownContent}>
            {filteredOptions.length > 0 ? (
                filteredOptions.map(opt => (
                <div key={opt.value || opt} className={styles.optionRow}>
                    <Checkbox
                    isChecked={safeSelectedValues.includes(opt.value || opt)}
                    onChange={() => handleToggle(opt.value || opt)}
                    text={opt.label || opt}
                    />
                </div>
                ))
            ) : (
                <div className={styles.noResults}>Nenhuma opção encontrada</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterField;