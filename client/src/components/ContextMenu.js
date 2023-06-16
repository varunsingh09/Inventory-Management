import { useRef } from "react"
import { useOnClickOutside } from "../hooks/useOnClickOutside"

const ContextMenu = ({x, y, product, handleCancelClick, handleSubmit, handleDelete, closeContextMenu}) => {
  const contextMenuRef = useRef(null)
  useOnClickOutside(contextMenuRef, closeContextMenu)
  return (
    <div id='context-menu'style={{position: 'absolute', top: `${y}px`, left: `${x}px`}} ref={contextMenuRef} onClick={closeContextMenu}>
      <div id='context-menu-edit-button' className="context-menu-selection" onClick={(event) => handleCancelClick(event)}>Cancel</div>
      <div id='context-menu-submit-button' className="context-menu-selection" onClick={(event) => handleSubmit(event, product)}>Submit</div>
      <div id='context-menu-delete-button' className="context-menu-selection" onClick={(event) => handleDelete(event, product)}>Delete</div>
    </div>
  )
}

export default ContextMenu