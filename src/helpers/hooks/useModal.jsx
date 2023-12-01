import { useState } from "react"

/**
 * Hook personalizado para gestionar el estado de un modal.
 *
 * @returns {Array} - Un array con elementos que permiten controlar el estado del modal.
 * - `isOpen` (boolean): Un estado que indica si el modal está abierto o cerrado.
 * - `open` (function): Una función para abrir el modal.
 * - `close` (function): Una función para cerrar el modal.
 */
export const useModal = () => {

    const [isOpen, setIsOpen] = useState(false)

    /**
     * Abre el modal.
     */
    const open = () => setIsOpen(true)

    /**
     * Cierra el modal.
     */
    const close = () => setIsOpen(false)

    return [isOpen, open, close]
}
