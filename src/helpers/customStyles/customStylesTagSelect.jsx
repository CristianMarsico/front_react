const customStylesTagSelect = {
    // Aquí puedes definir los estilos que desees cambiar
    control: (provided, state) => ({
        ...provided,
        top: '0',
        padding: '0px',
        margin: '0px',
        fontSize: '1rem',
        background: '#fff', // Cambiar el fondo del control
        border: '1px solid #dee2e6', // Cambiar el borde del control
        borderRadius: '4px', // Cambiar el radio de las esquinas
        // boxShadow: state.isFocused ? '0 0 0 3px #007bff' : 'none', // Cambiar el efecto de sombra al enfocar
        '&:hover': {
            border: '1px solid #007bff', // Cambiar el borde al pasar el cursor por encima
        },
    }),
    option: (provided, state) => ({
        ...provided,
        width: '100%',
        padding: '7px',
        fontSize: '1rem',
        margin: '1px 0',
        borderRadius: '15px',
        backgroundColor: state.isSelected ? '#4B89F7' : '#fff', // Cambiar el color de fondo de la opción seleccionada
        color: state.isSelected ? 'black' : 'black', // Cambiar el color del texto de la opción seleccionada
        '&:hover': {
            border: '1px solid red',
            backgroundColor: '#fff', // Cambiar el color de fondo al pasar el cursor por encima de una opción
            color: 'black', // Cambiar el color del texto al pasar el cursor por encima de una opción
        },
    }),
};

export default customStylesTagSelect;