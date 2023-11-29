import React, { FC, PropsWithChildren } from "react";
import ShipProductForm, { ProductDataType } from "./ship.product.form";

const ShipProductsForm: FC<
  PropsWithChildren<{
    data: Array<ProductDataType>;
    onChange: (p: Array<ProductDataType>) => void;
  }>
> = ({ data = [] as Array<ProductDataType>, onChange = () => null }) => {
  return (
    <div>
      {data.map((item, itemIndex) => {
        const handleChange = (value: ProductDataType) => {
          const updatedData = [
            ...data.slice(0, itemIndex),
            value,
            ...data.slice(itemIndex + 1),
          ] as Array<ProductDataType>;
          onChange(updatedData);
        };

        return (
          <ShipProductForm
            key={itemIndex}
            data={item}
            onChange={handleChange}
          />
        );
      })}
    </div>
  );
};

export default ShipProductsForm;
