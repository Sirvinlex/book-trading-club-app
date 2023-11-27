import React from "react";

const ErrorPage = () => {
  const handleSubmit = (e) =>{
    e.preventDefault()
    
  }
  let myArr = []
  const handleChange = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    console.log(e.target.checked)
    if (e.target.checked){
      myArr.push(value)
    }else{
      myArr = myArr.filter((item) => item !== value)
    }
    console.log(myArr)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
  <div>
    <input
    onChange={handleChange}
      // defaultChecked={false}
      type="checkbox"
      id="subscribeNews"
      name="subscribe"
      value="newsletter" />
    <label for="subscribeNews">Subscribe to newsletter?</label>
  </div>
  <div>
    <button type="submit">Subscribe</button>
  </div>
</form>
      {/* <form onSubmit={handleSubmit}>
      <fieldset>
      <legend>Choose your interests</legend>
      <div>
        <input onChange={handleChange} type="checkbox" id="coding" name="interest" value="coding" />
        <label for="coding">Coding</label>
      </div>
      <div>
        <input onChange={handleChange} type="checkbox" id="music" name="interest" value="music" />
        <label for="music">Music</label>
      </div>
    </fieldset>
    <button type="submit">submit</button>
      </form> */}
    </div>
  )
}

export default ErrorPage;

{/* <form>
        <div>
        <label className='books-container-body'>
        <input type="checkbox" id="coding" name="interest" value="coding" />
                      <div className='book-details'>
                        <p className='book-title'>title</p>
                        <p className='book-description'>description description</p>
                        <p className='creator-details'>
                          from user1 from abuja
                        </p>
                      </div>
                      <div className='book-stats'>
                        <p className='request-count'>requests: 0</p>
                        <p className='requestor-list'>(Sam, Peter, Chidi, Sam, David, Sam, Peter, Chidi, Sam, David)</p>
                      </div>
                      <button type='submit' onClick={() => console.log(' test')} className='remove-book-btn'><FaTimes size={30}/></button>
      </label>
        </div>
        <div>
        <label className='books-container-body'>
        <input type="checkbox" id="coding" name="interest" value="coding" />
                      <div className='book-details'>
                        <p className='book-title'>title</p>
                        <p className='book-description'>description description</p>
                        <p className='creator-details'>
                          from user1 from abuja
                        </p>
                      </div>
                      <div className='book-stats'>
                        <p className='request-count'>requests: 0</p>
                        <p className='requestor-list'>(Sam, Peter, Chidi, Sam, David, Sam, Peter, Chidi, Sam, David)</p>
                      </div>
                      <button type='submit' onClick={() => console.log(' test')} className='remove-book-btn'><FaTimes size={30}/></button>
      </label>
        </div>
      </form> */}