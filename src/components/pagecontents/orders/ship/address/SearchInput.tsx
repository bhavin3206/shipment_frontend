import React, { useState, useCallback, useEffect } from "react";
// import debounce from "lodash.debounce";
import { useDebounce } from "use-debounce";

import upsService from "../../../../../services/ups.service";
import { Autocomplete, Stack, TextField } from "@mui/material";
interface SearchInputProps {
  searchInputValue: string;
  options: string[];
  onClickFunction: (curRow: any) => void;
  placeholder: string;
}
export default function SearchInput(props: SearchInputProps) {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedFromValue] = useDebounce(searchValue, 1000);
  const [searchResults, setSearchResults] = useState(Array<Object>);
  const [searchTitles, setSearchTitles] = useState(Array<String>);

  useEffect(() => {
    setSearchValue(props.searchInputValue);
  }, [props.searchInputValue]);

  useEffect(() => {
    if (!handleSearchChange) return;
    handleSearchChange(debouncedFromValue);
  }, [debouncedFromValue]);

  const handleSearchChange = (value: string) => {
    upsService
      .getAddress(value)
      .then((data) => {
        console.log(data);
        setSearchResults(data.data.items);
        const titles = data.data.items.map((item: any) => {
          return item.address.label;
        });
        console.log(titles);
        setSearchTitles(titles);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleMenuItemClick = (value: any) => {
    const curRow = searchResults.find(
      (result: any) => result.address.label === value
    );
    props.onClickFunction(curRow);
  };
  return (
    <div>
      <Stack spacing={2}>
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          value={props.searchInputValue}
          size="small"
          sx={{
            "& .MuiInputLabel-root": {
              fontSize: "14px",
            },
            "& .MuiOutlinedInput-input": {
              fontSize: "14px",
            },
          }}
          onChange={(event, value) => handleMenuItemClick(value)}
          onInputChange={(event, value) => {
            setSearchValue(value);
          }}
          options={searchTitles}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Address"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
      </Stack>
    </div>
  );
}
