import React from 'react'
import ProductDetailComponent from '../../components/ProductDetailComponent/ProductDetailComponent'
import { useParams } from 'react-router-dom'

const ProductDetailPage=()=> {
  const params=useParams();

  return (
    <div style={{padding:'0 80px'}}>
        <ProductDetailComponent ProductID={params.id}/>
    </div>
    
  )
}

export default ProductDetailPage