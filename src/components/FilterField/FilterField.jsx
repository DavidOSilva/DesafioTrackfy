import { useState, useRef, useEffect } from "react";
import Icon from "../Icon/Icon";
import styles from "./FilterField.module.css";
import Checkbox from "../Checkbox/Checkbox";
import { IoIosArrowDown } from "react-icons/io";
import { MdClear } from "react-icons/md";

function FilterField({
  label,
  name,
  options = [], // Segue a estrutura [{ value: "", label: "" }, ...]
  selectedValues = [],
  onChange,
  icon = null,
  initialValues = [],
  isMulti = true
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
    onChange(name, initialValues);
    setShowClearButton(false);
  };

  // Alterna seleção de um item
  const handleToggle = (value) => {
    if (isMulti) {
      const newSelected = safeSelectedValues.includes(value) ? 
      safeSelectedValues.filter(v => v !== value) // Remove se já está selecionado
        : [...safeSelectedValues, value]; // Adiciona se não está selecionado
      onChange(name, newSelected);
    } else {
      // Para seleção única, define o valor e fecha o dropdown
      onChange(name, [value]);
      setIsOpen(false);
      setSearchTerm("");
    }
  };

  // Gera o texto do placeholder com base nas seleções
  const getPlaceholderText = () => {
    if (safeSelectedValues.length === 1) {
      const selectedValue = safeSelectedValues[0]; // Pega o único valor selecionado
      const selectedOption = options.find(opt => (opt.value || opt) === selectedValue); // Encontra a opção correspondente
      return selectedOption ? (selectedOption.label || selectedOption) : selectedValue; // Retorna o label
    }
    if (safeSelectedValues.length > 0)  return `${label} (${safeSelectedValues.length})`;
    return label;
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
                    placeholder={isOpen ? "" : getPlaceholderText()}
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

                <div key={opt.value || opt} className={styles.optionRow} onClick={() => handleToggle(opt.value || opt)}>

                    {isMulti ? (
                      <div className={styles.checkboxWrapper}>
                        <Checkbox
                          isChecked={safeSelectedValues.includes(opt.value || opt)}
                          text={opt.label || opt}
                          // onChange={() => handleToggle(opt.value || opt)}
                        />
                      </div>
                    ) : (
                      <div
                        className={styles.optionItem}
                        onClick={() => handleToggle(opt.value || opt)}
                      >
                        {opt.label || opt}
                      </div>
                    )}

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