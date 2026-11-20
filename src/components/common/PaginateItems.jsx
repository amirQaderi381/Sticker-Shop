import { useState } from "react";
import ProductListing from "../ProuctListing";
import ReactPaginateModule from "react-paginate";
const ReactPaginate = ReactPaginateModule.default || ReactPaginateModule;

const PaginateItems = ({ productsPerPage, products, status }) => {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + productsPerPage;
  console.log(`Loading products from ${itemOffset} to ${endOffset}`);

  const currentProducts = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / productsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * productsPerPage) % products.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`,
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <ProductListing currentProducts={currentProducts} status={status} />
      <ReactPaginate
        containerClassName="flex justify-center items-center gap-2 mt-8 mb-4"
        pageClassName="border border-gray-300 w-10 h-10 text-gray-700 hover:bg-palette-light"
        pageLinkClassName="flex items-center justify-center w-full h-full"
        activeClassName="!bg-palette-primary !text-white"
        previousClassName="px-3"
        nextClassName="px-3"
        disabledClassName="opacity-50 cursor-not-allowed"
        breakLabel="..."
        nextLabel={null}
        previousLabel={null}
        onPageChange={handlePageClick}
        pageRangeDisplayed={6}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default PaginateItems;