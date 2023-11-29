import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import upsService from "../../../../services/ups.service";
export interface CustomDeclarationDataType {
  itn: string;
  taxId: string;
}
const CustomDeclaration: FC<
  PropsWithChildren<{
    data: CustomDeclarationDataType;
    onChange: (p: CustomDeclarationDataType) => void;
  }>
> = ({ data, onChange }) => {
  const [taxIds, setTaxIds] = useState<Array<string>>([]);
  const handleInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    onChange({ ...data, [name]: value });
  };
  const handleSelectChanged = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    onChange({ ...data, [name]: value });
  };
  const handleTaxIdChange = (event: SelectChangeEvent<typeof data.taxId>) => {
    const {
      target: { value },
    } = event;
    onChange({ ...data, taxId: value });
  };

  useEffect(() => {
    upsService
      .getTaxes()
      .then((taxesData) => {
        const taxData = JSON.parse(taxesData);
        // Map over the tax identifiers and create an array of selected values
        const taxNumbers = taxData.data.map(
          (tax: any) => tax.number + "-" + tax.nickname
        );
        setTaxIds(taxNumbers);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <Grid2 container spacing={2} className="pt-2">
        <Grid2 xs={12} md={12}>
          <FormControl
            className="w-full "
            variant="outlined"
            sx={{ minWidth: 120 }}
          >
            <InputLabel id="taxId" className=" mt-[-7px]">
              Tax Identifiers
            </InputLabel>
            <Select
              className="w-full"
              value={data.taxId ? data.taxId : ""}
              label="Tax Identifier"
              labelId="taxId"
              size="small"
              sx={{
                fontSize: "14px",
              }}
              onChange={handleTaxIdChange}
            >
              {taxIds.map((item: string, index: number) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid2>

        <Divider
          style={{
            flexGrow: 1,
            marginLeft: "0.5rem",
            marginRight: "0.5rem",
          }}
        />
      </Grid2>
    </div>
  );
};

export default CustomDeclaration;
