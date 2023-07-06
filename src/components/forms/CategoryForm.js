import React from "react";

const CategoryForm = ({ name, setName, loading, handleSubmit }) => {
  return (
    <form
      action="#"
      onSubmit={handleSubmit}
    >
      <div
        className="form-group"
      >
        <label>Name</label>
        <input
          type="text"
          className="form-control mb-4"
          value={name}
          onChange={e => setName(e.target.value)}
          autoFocus
          required
        />
        <button className="btn btn-primary">
          { loading ? (
            <>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <span className='d-inline-flex ms-2'>Loading...</span>
            </>
          ) : "Save"
          }
        </button>
      </div>
    </form>
  )
}
export default CategoryForm;
