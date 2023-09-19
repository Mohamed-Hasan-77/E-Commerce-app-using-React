import React from 'react'
import heading from './heading.module.css'

export default function MainHeading(props) {
  return <>
    <div className=" my-5 text-center ">
    {/* <h2 className="title text-danger fw-bold fs-1"> Our Products </h2> */}
    <h2 class={`${heading.main_heading} fw-bold fs-1 `}>  {props.pageHome || props.pageBrands || props.pageBrandProducts || props.pageCategories || props.pageCategoryProducts|| props.CartHeading || props.orderHeading || props.orderDetails || props.favoritesHeading} </h2>
    {/* <p className='text-secondary'>Lorem ipsum dolor sit amet consectetur</p> */}
</div>
</>
}
