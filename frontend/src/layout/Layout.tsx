
import React from "react";
import TopBar from "../components/home/TopBar";
import { Box } from "@mui/material";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <TopBar />
      <Box component="main" sx={{ mt: 3, px: 2 }}>
        {children}
      </Box>
    </>
  );
};

export default Layout;
