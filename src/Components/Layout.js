import React from "react";
import { Provider, defaultTheme, View, Flex } from "@adobe/react-spectrum";
import Navbar from "./Navbar";
import Sidebar from "./SideBar";

const Layout = ({ children }) => {
  return (
    <Provider theme={defaultTheme} colorScheme="light">
      <View height="100vh">
        <Navbar />
        <Flex direction="row" height="100%">
          <Sidebar />
          <View flex={1} padding="size-200">
            {children}
          </View>
        </Flex>
      </View>
    </Provider>
  );
};

export default Layout;
