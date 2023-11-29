import React, { PropsWithChildren, useState } from "react";
import ResponsiveAppBar from "../components/navbar/appbar";
import LeftDrawer from "../components/pagecontents/orders/leftpanel.drawer";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import SettingsPanel from "../components/pagecontents/settings/setting.panel";
import { ApiStatusType, setApiStatus } from "../redux/authslice";

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const showLeft = useSelector(
    (state: RootState) => state.authReducer.showLeft
  );
  const showSettingsPanel = useSelector(
    (state: RootState) => state.authReducer.settingPanel
  );
  const dispatch = useDispatch();

  const handleChangeApiStatus = (value: string) => {
    dispatch(setApiStatus(value as ApiStatusType["type"]));
  };

  return (
    <div>
      <ResponsiveAppBar />
      <div className="w-full flex">
        <div
          style={{
            width: 250,
            display: showLeft ? "block" : "",
          }}
          className={showLeft ? "" : "xl:block hidden"}
        >
          {!showSettingsPanel ? (
            <LeftDrawer
              // data={selectedText}
              onChange={handleChangeApiStatus}
            />
          ) : (
            <SettingsPanel />
          )}
        </div>
        <div className="flex flex-1">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
