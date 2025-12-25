import ProductForm from "../components/ProductFormWithAction"
import { getProductById } from "../services"


const ProductDetailView = async ({id}: {id: string}) => {
    const product = await getProductById(id)
    
  return (
    <div><ProductForm product={product}/></div>
  )
}

export default ProductDetailView