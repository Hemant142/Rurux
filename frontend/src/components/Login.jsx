import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Center, FormControl, FormLabel, Heading, Input, Link, Text, useToast } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Navbar } from "./Navbar";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const toast = useToast();
  const navigate = useNavigate();
//   let userType = Cookies.get("userType");
// console.log(userType,"usertype")
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/university/login", formData);

      console.log(response, "huyehs")
      if (response.status === 200) {
        // Store token in a cookie
        Cookies.set("token", response.data.token);
        Cookies.set("userId", response.data.userId);
        Cookies.set("userType", response.data.userType);
        // Handle success
        toast({
          title: "Login Successful",
          description: "You have successfully logged in!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        // Reset form data after successful submission
        setFormData({
          email: "",
          password: "",
        });

        // Check if admin is logged in
        if (response.data.userType === "admin@123") {
          toast({
            title: "Admin logged in successfully!",
            status: "info",
            duration: 5000,
            isClosable: true,
          });
          // Redirect to admin page
          navigate("/admin");
        } else {
          // Redirect to dashboard or home page after successful login
          navigate("/");
        }
      } else {
        // Handle errors
        toast({
          title: "Login Failed",
          description: response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error occurred:", error);
      // Handle network errors
      toast({
        title: "Error",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Box>
      <Navbar />
      <Center h="100vh">
        <Box w="80%" maxW="400px" bg="white" p={8} borderRadius="lg" boxShadow="md">
          <Heading as="h1" textAlign="center" mb={6} color="teal.500">
            Login Here!
          </Heading>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
            </FormControl>
            <Button mt={6} colorScheme="teal" size="lg" type="submit" w="100%">
              Login
            </Button>
          </form>
          <Center mt={4}>
            <Text textAlign="center">
              New user?{" "}
              <Link as={RouterLink} to="/signin" color="teal.500">
                Sign Up
              </Link>
            </Text>
          </Center>
        </Box>
      </Center>
    </Box>
  );
};
