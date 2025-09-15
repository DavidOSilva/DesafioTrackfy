const Icon = ({ icon, className, ...props }) => {
    
  // Se for string, é um uicon (flaticon)
  if (typeof icon === "string") {
    return <i className={`${icon} ${className || ''}`} {...props} />;
  }

  // Se for function/component, é um react-icon
  if (typeof icon === "function") {
    const IconComponent = icon;
    return <IconComponent className={className} {...props} />;
  }

  // Fallback para casos inesperados
  return null;
};

export default Icon;