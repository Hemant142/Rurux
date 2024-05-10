import React from "react";
import {
  Box,
  Button,
  Flex,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import { TbMenu } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

export const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const toast = useToast();
  let token = Cookies.get("token");

  let userType = Cookies.get("userType");
  console.log(userType, "usertype");
  console.log(token, "token");
  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/university/logout",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        // Clear cookies
        Cookies.remove("token");
        Cookies.remove("userId");
        Cookies.remove("userType");

        // Show success message
        toast({
          title: "Logout Successful",
          description: "You have successfully logged out!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        // Reload the application
        window.location.reload();
      } else {
        // Show error message if logout fails
        toast({
          title: "Logout Failed",
          description: "Failed to logout. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      // Show error message if logout fails due to network error
      console.error("Error occurred during logout:", error);
      toast({
        title: "Error",
        description: "An error occurred during logout. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <section>
        <nav>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            paddingX={"30px"}
            border={"1px solid red"}
          >
            <div>
              <Text color="teal" fontWeight="bold" letterSpacing="3px">
                AVENTURE
              </Text>
            </div>
            <Box
              display={{
                base: "none",
                sm: "none",
                md: "flex",
                lg: "flex",
                xl: "flex",
              }}
              justifyContent={"space-between"}
              alignItems={"center"}
              gap={"5px"}
              w={{ sm: "60%", md: "60%", lg: "42%", xl: "42%" }}
              color={"#505256"}
              fontWeight={"600"}
            >
              <NavLink to={"/"} _hover={{ color: "black" }}>
                Home
              </NavLink>
              {!userType=="undefined" ? (
                <Box></Box>
              ) : (
                <NavLink to={"/performance"} _hover={{ color: "black" }}>
                  My Performance
                </NavLink>
              )}

              {token ? (
                <Button onClick={handleLogout}>Logout</Button>
              ) : (
                <NavLink to={"/signin"}>
                  <Button>Login</Button>
                </NavLink>
              )}
              {!userType=="undefined" ? (
                <Box></Box>
              ) : (
                <NavLink to={"/profile"} _hover={{ color: "black" }}>
                  Profile
                </NavLink>
              )}
            </Box>
            {/* Small screen Size */}
            <Box
              display={{
                base: "flex",
                sm: "flex",
                md: "none",
                lg: "none",
                xl: "none",
              }}
              onClick={onOpen}
              ref={btnRef}
            >
              <TbMenu />
            </Box>

            <Drawer
              isOpen={isOpen}
              placement="top"
              onClose={onClose}
              finalFocusRef={btnRef}
              h={"20px"}
              w={"90%"}
              top={"-40px"}
            >
              <DrawerOverlay />
              <DrawerContent position={"absolute"} marginTop={"40px"}>
                <DrawerCloseButton />

                <DrawerBody>
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"space-between"}
                    alignItems={"left"}
                    gap={"10px"}
                    color={"#505256"}
                    fontWeight={"600"}
                  >
                    <Link href="#" _hover={{ color: "black" }}>
                      Features
                    </Link>
                    <Link href="#" _hover={{ color: "black" }}>
                      Github
                    </Link>
                    <Link href="#" _hover={{ color: "black" }}>
                      For Developers
                    </Link>
                    <Button w={"80%"} _hover={{ color: "black" }}>
                      Documentation
                    </Button>
                  </Box>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Flex>
        </nav>
      </section>
    </>
  );
};
