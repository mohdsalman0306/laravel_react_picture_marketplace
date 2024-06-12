const Categories = ({categories}) => {
  return (
    <>
        <h6>Categories</h6>
        <ul className="list-group">
            {
                categories?.map(category => (
                    <li key={category.id} className="list-group-item border-0">
                        <div className="form-check-flex-grow-1">
                            <input
                                type="radio"
                                className="form-check-input"
                                name=""
                                id={category.id} />
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
