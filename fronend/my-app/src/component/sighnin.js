import React from 'react'


const Sighnin = () => {
  
  return (
    <div className='row  '>
        <div className='col-6 !mt-20 !ml-24'>
            <div className='card'>
                <div className='card-body bg-light '>
                <h1>Sign in</h1>
                <form >
                    <div className='form-group'>
                        <label htmlFor='username'>Username</label>
                        <input type='text' name="username" className='form-control' id='username' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' name="password" className='form-control' id='password' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>firstname</label>
                        <input type='password' name="password" className='form-control' id='password' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>lastname</label>
                        <input type='password' name="password" className='form-control' id='password' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>national_code</label>
                        <input type='password' name="password" className='form-control' id='password' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>birthday</label>
                        <input type='password' name="password" className='form-control' id='password' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>sex</label>
                        <input type='password' name="password" className='form-control' id='password' />
                    </div>  
                    <button type="submit" className='btn mt-2 btn-primary'>Sign in</button>
                </form>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Sighnin