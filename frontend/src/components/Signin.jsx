import { Box, Button, Center, FormControl, FormLabel, Heading, Input, Select, useToast, Link, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";

export const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    field: "",
  });

  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post("https://jungle-green-rattlesnake-gear.cyclic.app/university/register", formData);

      if (response.status === 201) {
        // Handle success
        toast({
          title: "Registration Successful",
          description: "Your account has been created successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        // Reset form data after successful submission
        setFormData({
          username: "",
          email: "",
          password: "",
          field: "",
        });
        // Redirect to login page after successful registration
        navigate("/login");
      } else {
        // Handle errors
        toast({
          title: "Registration Failed",
          description: response.response.data.message,
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
      <Navbar/>
    <Center h="100vh">
      <Box w="80%" maxW="400px" bg="white" p={8} borderRadius="lg" boxShadow="md">
        <Heading as="h1" textAlign="center" mb={6} color="teal.500">
          Sign Up Here!
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Branch</FormLabel>
            <Select name="field" value={formData.field} onChange={handleChange} placeholder="Select Branch">
              <option value="Arts">Art</option>
              <option value="Commerce">Commerce</option>
              <option value="Engineering">B.tech</option>
            </Select>
          </FormControl>
          <Button mt={6} colorScheme="teal" size="lg" type="submit" w="100%">
            Sign Up
          </Button>
        </form>
        <Center mt={4}>
        <Text textAlign="center" mt="10px">
                Registered User?{" "}
                <span
                  onClick={() => navigate("/login")}
                  style={{
                    color: "teal",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Login
                </span>
                </Text>
        </Center>
      </Box>
    </Center>
    </Box>
  );
};
