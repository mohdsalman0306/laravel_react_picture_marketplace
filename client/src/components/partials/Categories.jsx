const Categories = ({categories, setCategoryId, categoryId, setPictureExt}) => {
  return (
    <>
        <h6>
            {
                categoryId && <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        setCategoryId('')
                        setPictureExt('')
                    }}
                    className="text-capitalize text-danger fw-bold mx-1">
                    All
                </span>
            }
            Categories
        </h6>
        <ul className="list-group">
            {
                categories?.map(category => (
                    <li key={category.id} className="list-group-item border-0">
                        <div className="form-check-flex-grow-1">
                            <input
                                type="radio"
                                className="form-check-input mx-2"
                                name="category_id"
                                id={category.id}
                                value={category.id}
                                onChange={(e) => {
                                    setPictureExt('')
                                    setCategoryId(e.target.value)
                                }}
                                checked={category.id == categoryId}
                                />
                            <label htmlFor={category.id} className="form-check-label">
                                {category.name}
                            </label>
                        </div>
                    </li>
                ))
            }
        </ul>
    </>
  )
}

export default Categories
