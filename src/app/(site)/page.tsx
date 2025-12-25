import { Button } from '@/components/ui';
import Welcome from '@/components/Welcome';
import ProductList from '@/modules/products/components/ProductList';
import { getProducts } from '@/modules/products/services';
import Link from 'next/link';

export default async function Home() {
  const data = await getProducts();
  data.splice(4);
  return (
    <div>
      <Welcome />
      <div className="container mx-auto p-4 my-5">
        <p className="font-bold  text-2xl ">Last Products</p>
      </div>
      {data.length === 0 ? (
        <div className="container mx-auto p-4">
          <p className="font-bold  text-2xl text-center text-red-500 my-5 ">no products</p>
        </div>
      ) : (
        <div className="container mx-auto">
          <ProductList products={data} />
          <div className="text-center my-5">
            <Button className="text-xl bg-gray-600">
              <Link href="/products">See All Products</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
