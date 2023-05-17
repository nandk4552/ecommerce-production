import React from 'react'

const ImageCard = ({p}) => {
  return (
     <div className="w-100 h-100 overflow-hidden ">
        {/* accesing photo dynamically */}
        <img
          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p?._id}`}
          className="scale-on-hover card-img-top  border-bottom img-responsive img object-fit-center"
          alt={p?.name}
          height={"200px"}
          width={"300px"}
        />
      </div>
  )
}

export default ImageCard
