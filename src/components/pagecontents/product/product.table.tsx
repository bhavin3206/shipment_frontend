import React, { PropsWithChildren, useEffect } from "react";
import MyTableComponent from "./table.component";
export interface ProductTableDataType {}

const ProductTable: React.FC<
  PropsWithChildren<{
    data: any;
    onChange: () => void;
  }>
> = ({ data, onChange }) => {
  useEffect(() => {
    console.log(data);
  }, [data]);
  const productTableHeaders: string[] = [
    "ID",
    "SKU",
    // "PresetGroup",
    "Weight",
    "Name",
    // "WarehouseLocation",
    // "Active",
    // "Bundle",
    "CreatedAt",
    "Image",
    // "Allocated",
    "Available",
    "DeclaredValue",
    "Dimensions",
    // "Fulfilment SKU",
    // "Harmonisation Code",
    // "Mapped Domestic",
    // "Mapped International",
    // "On Hand",
    // "Product Type",
    // "Tags",
    // "UPC",
    // "Variants",
    // "Category",
    "Modified Date",
    // "Total Available",
  ];

  const handleTableChange = () => {};
  return (
    <div>
      <MyTableComponent
        tableHeaders={productTableHeaders}
        data={data}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default ProductTable;
