import React from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'



const BuyNow = () => {

  const navigate = useNavigate()

  
  const inputFields = [
    {
      fieldName: 'Name',
      inputType: 'text',
      inputPlaceHolder: 'Name'
    },

    {
      fieldName: 'Serial Number',
      inputType: 'text',
      inputPlaceHolder: 'Serial Number',
    },
    {
      fieldName: 'Father Name',
      inputType: 'text',
      inputPlaceHolder: 'Father Name'
    },

    {
      fieldName: 'Address',
      inputType: 'text',
      inputPlaceHolder: 'Addtess'
    },
    {
      fieldName: 'Age',
      inputType: 'text',
      inputPlaceHolder: 'Age'
    },
    {
      fieldName: 'Date of Birth',
      inputType: 'date',
      inputPlaceHolder: 'Date of Birth'
    },
    {
      fieldName: 'CNIC',
      inputType: 'text',
      inputPlaceHolder: 'CNIC'
    },
  ]

  const discardOnClick = () => {
    navigate('/')
  }


  return (
    <div>
      <Navbar />
      <div className="mb-6 w-1/2 mx-auto px-6 mt-5 bg-neutral-800 rounded-xl py-5 ">
        <h1 className=" text-2xl font-bold mb-5 text-center text-gray-200">Add Your Details</h1>
        {inputFields.map((item, index) => {
          return (
            <div key={index} className=" w-full mt-3 mx-2">
              <label htmlFor="default-input"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{item.fieldName}</label>
              <input type={item.inputType} value={item.value} id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={item.inputPlaceHolder} />
            </div>
          )
        })}

        <div className='mt-4'>
          <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Save</button>
          <button onClick={discardOnClick} type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-white hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-red-800 dark:text-white dark:border-red-600 dark:hover:text-white dark:hover:bg-red-700">Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default BuyNow