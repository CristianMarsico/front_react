/**
 * Objeto que contiene estilos personalizados para el componente Select.
 * Puedes aplicar estos estilos al componente Select para personalizar su apariencia y comportamiento.
 *
 * @constant
 * @type {Object}
 */

const customStylesTagSelect = {
    /**
     * Estilos para el control principal del componente Select, que es la parte visible del componente.
     *
     * @param {Object} provided - Estilos proporcionados por defecto.
     * @param {Object} state - Estado actual del componente.
     * @returns {Object} - Estilos modificados para el control.
     */
    control: (provided, state) => ({
        ...provided,
        top: '0',
        fontSize: '1rem',
        borderRadius: '6px', // Cambiar el radio de las esquinas
    }),

    /**
     * Estilos para las opciones del componente Select, que son las opciones desplegables.
     *
     * @param {Object} provided - Estilos proporcionados por defecto.
     * @param {Object} state - Estado actual de la opción.
     * @returns {Object} - Estilos modificados para las opciones.
     */
    option: (provided, state) => ({
        ...provided,
        width: '100%',
        padding: '3.5px 0 3.5px 15px',
        fontSize: '1rem',
        margin: '1px 0',
        borderRadius: '6px',
        background: state.isSelected ? '#4B89F7' : '#fff', // Cambiar el color de fondo de la opción seleccionada
        color: state.isSelected ? 'black' : 'black', // Cambiar el color del texto de la opción seleccionada
        fontWeight: state.isSelected ? 'bold' : '',
        textTransform: state.isSelected ? "uppercase" : '',
        textAlign: state.isSelected ? 'center' : '',
        '&:hover': {
            border: '2px solid gray',
            borderRadius: '6px',
            textTransform: "uppercase",
            fontSize: '1rem',
            backgroundColor: '#fff', // Cambiar el color de fondo al pasar el cursor por encima de una opción
            color: 'black', // Cambiar el color del texto al pasar el cursor por encima de una opción
            textAlign: 'center',
            fontWeight: 'bold'
        },
    }),
};

export default customStylesTagSelect;