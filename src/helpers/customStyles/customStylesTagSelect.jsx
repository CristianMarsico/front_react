const customStylesTagSelect = {
    // Aquí puedes definir los estilos que desees cambiar
    control: (provided, state) => ({
        ...provided,
        top: '0',
        fontSize: '1rem',
        borderRadius: '6px', // Cambiar el radio de las esquinas
    }),
    option: (provided, state) => ({
        ...provided,
        width: '100%',
        padding: '7px',
        fontSize: '1rem',
        margin: '1px 0',
        borderRadius: '0px',
        background: state.isSelected ? '#4B89F7' : '#fff', // Cambiar el color de fondo de la opción seleccionada
        color: state.isSelected ? 'black' : 'black', // Cambiar el color del texto de la opción seleccionada
        fontWeight: state.isSelected ? 'bold' : '',
        textTransform: state.isSelected ? "uppercase" : '',
        textAlign: state.isSelected ? 'center' : '',
        '&:hover': {
            border: '2px solid red',
            borderRadius: '10px',
            textTransform: "uppercase",
            fontSize: '1.2rem',
            backgroundColor: '#fff', // Cambiar el color de fondo al pasar el cursor por encima de una opción
            color: 'red', // Cambiar el color del texto al pasar el cursor por encima de una opción
            textAlign: 'center',
            fontWeight: 'bold'
        },
    }),
};

export default customStylesTagSelect;