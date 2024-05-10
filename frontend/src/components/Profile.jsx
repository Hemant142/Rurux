import React, { useEffect, useState } from 'react';
import { Navbar } from './Navbar';
import { Box, Text, Image, Input, Button } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import axios from 'axios';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({});

  const userID = Cookies.get('userId');
  const token = Cookies.get('token');

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/university/${userID}`, {
        headers: {
          Authorization: token,
        },
      });
      setUser(response.data.student);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const saveChanges = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/university/${userID}`, editedUser, {
        headers: {
          Authorization: token,
        },
      });
      alert(response.data.message);
      setEditMode(false);
      fetchUser(); // Fetch updated user data after saving changes
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  return (
    <Box>
      <Navbar />
      {user && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          backgroundColor="teal.500"
          minHeight="100vh"
        >
          <Box
            maxW="md"
            p="8"
            bg="white"
            boxShadow="lg"
            rounded="lg"
            textAlign="left"
            width="100%"
            mt="40" // Add margin to create a gap between Navbar and Profile Box
          >
            <Image
              src="https://cdn-icons-png.flaticon.com/256/345/345736.png"
              alt="Profile Avatar"
              mx="auto"
              mt="-100px" // Move the image upward using negative margin
              mb="4"
              borderRadius="full"
              boxSize="100px"
              zIndex="1" // Ensure the image is above the box
            />
            <Text
              fontSize="2xl"
              color="teal.600"
              fontWeight="bold"
              mb="4"
            >
              Profile
            </Text>

            <Box mb="4" >
              <Text
                color="teal.600"
                fontSize="sm"
                fontWeight="semibold"
                mb="2"
              >
                Name:
              </Text>
              {editMode ? (
                <Input
                  type="text"
                  name="name"
                  value={editedUser.name || user.name}
                  onChange={handleInputChange}
                  className="text-lg text-teal-700 font-bold border-b-2 focus:outline-none"
                />
              ) : (
                <Text className="text-lg text-teal-700 font-bold">
                  {user.username}
                </Text>
              )}
            </Box>

            <Box mb="4" >
              <Text
                color="teal.600"
                fontSize="sm"
                fontWeight="semibold"
                mb="2"
              >
                Roll Number:
              </Text>
              {editMode ? (
                <Input
                  type="text"
                  name="rollNumber"
                  value={editedUser.rollNumber || user.rollnumber}
                  onChange={handleInputChange}
                  className="text-lg text-teal-700 font-bold border-b-2 focus:outline-none"
                />
              ) : (
                <Text className="text-lg text-teal-700 font-bold">
                  {user.rollnumber}
                </Text>
              )}
            </Box>

            <Box mb="4" >
              <Text
                color="teal.600"
                fontSize="sm"
                fontWeight="semibold"
                mb="2"
              >
                Email:
              </Text>
              {editMode ? (
                <Input
                  type="text"
                  name="email"
                  value={editedUser.email || user.email}
                  onChange={handleInputChange}
                  className="text-lg text-teal-700 font-bold border-b-2 focus:outline-none"
                />
              ) : (
                <Text className="text-lg text-teal-700 font-bold">
                  {user.email}
                </Text>
              )}
            </Box>

            <Box mb="4" >
              <Text
                color="teal.600"
                fontSize="sm"
                fontWeight="semibold"
                mb="2"
              >
                Field:
              </Text>
              {editMode ? (
                <Input
                  type="text"
                  name="field"
                  value={editedUser.field || user.field}
                  onChange={handleInputChange}
                  className="text-lg text-teal-700 font-bold border-b-2 focus:outline-none"
                />
              ) : (
                <Text className="text-lg text-teal-700 font-bold">
                  {user.field}
                </Text>
              )}
            </Box>

            {/* <Button
              onClick={editMode ? saveChanges : handleEdit}
              bg="teal.600"
              mt="2"
              color="white"
              py="2"
              px="4"
              rounded="md"
              fontWeight="bold"
              _hover={{ rounded: 'full' }}
              _focus={{ outline: 'none' }}
              width="100%"
            >
              {editMode ? 'Save Changes' : 'Edit Profile'}
            </Button> */}
          </Box>
        </Box>
      )}
    </Box>
  );
}
