'use client';

import React, { useEffect, useState, useMemo } from 'react';
import ProductList from '../components/ProductList';
import { getProducts } from '../services';
import { ProductsWithImages } from '@/types';
import { Pagination } from '../../../components/pagination';
import  Loading  from '../../../app/loading';
import { SearchBox } from '../../../components/searchBox';
import { CategoryFilter } from '@/components/categoryFilter';
function ProductListView() {
  const [products, setProducts] = useState<ProductsWithImages[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getProducts();
      setProducts(result);
      setLoading(false);
    };
    fetchData();
  }, []);

  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))),
    [products],
  );

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory =
        selectedCategory === 'all' || p.category === selectedCategory;

      const matchSearch = p.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [products, selectedCategory, searchTerm]);

  // calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <div className=" text-center">
      <div className="inline-flex my-6  border-2 rounded-md border-gray-400 py-5 px-5">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onChange={setSelectedCategory}
        />
        <SearchBox
          searchTerm={searchTerm}
          onChange={(val) => {
            setSearchTerm(val);
            setCurrentPage(1);
          }}
        />
      </div>

      {loading ? <Loading /> : (
        <div className='my-5'>
          <ProductList products={paginatedProducts} />
        </div>
      )}

      <h2 className='text-red-600 text-xl'>{
        paginatedProducts.length === 0 ? 'No products found' : ''
        }</h2>

      <div className="justify-center flex">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default ProductListView;
