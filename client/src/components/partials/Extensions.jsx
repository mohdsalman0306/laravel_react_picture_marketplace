const Extensions = ({extensions}) => {
  return (
    <>
        <h6>Extensions</h6>
        <ul className="list-group">
            {
                extensions?.map((extension, index) => (
                    <li key={index} className="list-group-item border-0">
                        <div className="form-check-flex-grow-1">
                            <input
                                type="radio"
                                className="form-check-input mx-2"
                                name=""
                                id={index} />
                            <label htmlFor={index} className="form-check-label">
                                {extension.ext}
                            </label>
                        </div>
                    </li>
                ))
            }
        </ul>
    </>
  )
}

export default Extensions

