import ProductItem from './ProductItem';
import { ProductsWithImages } from '@/types';

function ProductList(props: { products: ProductsWithImages[] }) {
  const { products } = props;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6  justify-items-center">
      {products.map((item) => (
        <ProductItem key={item.id} product={item} />
      ))}
    </div>
  );
}

export default ProductList;
