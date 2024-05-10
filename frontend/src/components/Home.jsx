import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react"
import React from "react"
import { Navbar } from "./Navbar"

export const Home = () =>{

    return <>
    <Navbar/>
    <Flex align="center" justify="center" mt={16}>
      <Box textAlign="center">
        <Image
          src="https://blog.planview.com/wp-content/uploads/2017/08/Tip_1_Juggling-too-many-task-Gif_Twitter.gif"
          alt="Your Website Image"
          mx="auto"
          mb={16}
          maxW="100%"
          h="auto"
          boxShadow="md"
        />
        <Text fontSize={['lg', 'xl', '2xl']}>
         
        Discover endless opportunities for growth and learning at our esteemed university.
          Explore our wide range of courses, cutting-edge research, and vibrant campus life.
          Join us on a journey of academic excellence and personal development!

        </Text>
      </Box>
    </Flex>
    
    </>
}