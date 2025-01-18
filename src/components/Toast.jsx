import React from 'react'

const Toast = ({toast}) => {
  return (
    <div className="toast toast-top toast-center">
    <div
      className={` ${
        toast.type === "success" ? "alert alert-success" : "alert alert-error"
      }`}
    >
      {toast.message}
    </div>
  </div>
  )
}

export default Toast