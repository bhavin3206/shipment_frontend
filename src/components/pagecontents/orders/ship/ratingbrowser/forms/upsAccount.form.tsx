import React, { PropsWithChildren, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../redux/store";

const UpsAccountsForm: React.FC<
  PropsWithChildren<{
    accountNumber: string;
    onChange: (accountNumber: string) => any;
  }>
> = ({ accountNumber, onChange }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const upsAccounts = useSelector(
    (state: RootState) => state.authReducer.upsAccounts
  );
  useEffect(() => {
    onChange(upsAccounts[0].accountNumber);
  }, []);
  return (
    <div className="h-full bg-gray-100 border border-gray-200 rounded ">
      {upsAccounts?.map((upsAccount: any, index: any) => {
        return (
          <div
            key={index}
            className={
              index == selectedIndex
                ? "flex justify-center items-center border border-blue-500 bg-gray-100 rounded-md m-4 cursor-pointer"
                : "flex justify-center items-center border border-gray-400 rounded-md m-4 "
            }
            onClick={() => {
              setSelectedIndex(index);
              onChange(upsAccount.accountNumber);
            }}
          >
            <img src="/ups.svg" alt="" className="w-12 h-12 p-2" />
            <div className="px-4 py-2" key={index}>
              {"UPS " + upsAccount.accountNumber}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UpsAccountsForm;
