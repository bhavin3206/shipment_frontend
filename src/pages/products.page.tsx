import React, { useEffect, useState } from "react";
import ProductTable from "../components/pagecontents/product/product.table";
import bigcommerceService from "../services/bigcommerce.service";
import { Divider, Typography } from "@mui/material";

const Product = () => {
  const [tableData, setTableData] = useState<any>();
  const handleProductTableChange = () => {};
  useEffect(() => {
    bigcommerceService
      .getProducts()
      .then((data) => {
        const productData = JSON.parse(data.data);
        console.log(productData);
        setTableData(productData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex flex-col w-full h-full items-left">
      <Typography
        variant="h5"
        className="w-full text-left mb-2 pb-2"
        gutterBottom
      >
        Products
      </Typography>
      <Divider />
      <Typography className="text-left pt-2 text-[#828181]" gutterBottom>
        List all products from stores.
        <br />
      </Typography>
      <ProductTable data={tableData} onChange={handleProductTableChange} />
    </div>
  );
};

export default Product;
