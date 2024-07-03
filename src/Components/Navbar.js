import React from "react";
import { Flex, View, Image } from "@adobe/react-spectrum";
import image from "../assets/havahavai.png"; // Adjust the path to your image
import profile from "../assets/Avatar - Desktop - Light.png"; // Adjust the path to your profile image

const Navbar = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      UNSAFE_style={{ padding: "16px", backgroundColor: "#dee2e6" }}
    >
      <Image src={image} alt="Logo" height="size-300" width="size-1500" />
      <Image src={profile} alt="Profile" height="size-500" width="size-600" />
    </Flex>
  );
};

export default Navbar;
