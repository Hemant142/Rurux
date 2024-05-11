import React, { useEffect, useState } from 'react';
import { Navbar } from './Navbar';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Stat, StatLabel, StatNumber, CircularProgress, CircularProgressLabel, Heading } from '@chakra-ui/react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Cookies from 'js-cookie';
import ProgressBar from "@ramonak/react-progress-bar";

export default function Performance() {
  const [userData, setUserData] = useState(null);
  const [subjectsWithMarks, setSubjectsWithMarks] = useState([]);

  const userID = Cookies.get('userId');
  const token = Cookies.get('token');

  console.log(userID)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://jungle-green-rattlesnake-gear.cyclic.app/university/${userID}`, {
          headers: {
            Authorization: token,
          },
        });
        console.log(response, "Perfornamce");
        setUserData(response.data.student);
        setSubjectsWithMarks(response.data.subjectsWithMarks);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [userID, token]);

  // Calculate total marks only if subjectsWithMarks is not empty
  const totalMarks = subjectsWithMarks.length > 0 ? subjectsWithMarks.reduce((total, subject) => total + subject.marks, 0) : 0;

  // Calculate progress percentage only if totalMarks is not zero
  const progressPercentage = totalMarks !== 0 ? (totalMarks / (subjectsWithMarks.length * 100)) * 100 : 0;

  // Pie chart data
  const pieChartData = [
    { name: 'Completed', value: progressPercentage },
    { name: 'Remaining', value: 100 - progressPercentage }
  ];

  // Colors for pie chart sectors
  const COLORS = ['#0088FE', '#FFBB28'];

  // Get color based on percentage
  const getChartColor = () => {
    if (progressPercentage < 50) return '#FF4136'; 
    if (progressPercentage < 80) return '#FF851B';
    return '#2ECC40'; // green
  };

  // Get color for bar chart based on marks
  const getBarColor = (marks) => {
    return marks.map((mark) => {
      if (mark.marks < 40) return '#FF4136'; // red
      if (mark.marks < 60) return '#FF851B'; // orange
      return '#2ECC40'; // green
    });
  };

  // Find subjects with lowest and highest marks
  const lowestMarkSubject = subjectsWithMarks.reduce((min, current) => current.marks < min.marks ? current : min, subjectsWithMarks[0]);
  const highestMarkSubject = subjectsWithMarks.reduce((max, current) => current.marks > max.marks ? current : max, subjectsWithMarks[0]);

  return (
    <Box>
      <Navbar />
      {userData && (
        <Box boxShadow="md" borderRadius="lg" mb="4" p="4" bg="white"   display="flex" justifyContent={"space-evenly"} alignItems="center">
          <Box  p="4">
            <Stat textAlign={"left"}>
              <StatNumber fontSize="3xl" color={"teal"} fontFamily={"initial"}>{userData.username}</StatNumber>
              <StatLabel fontSize="xl">Rollnumber:</StatLabel>
              <StatNumber fontSize="2xl" color={"teal"}>{userData.rollnumber}</StatNumber>
              <StatLabel fontSize="xl">Total Marks:</StatLabel>
              <StatNumber fontSize="2xl" color={"teal"}>{totalMarks}</StatNumber>
              <StatLabel fontSize="xl">Field:</StatLabel>
              <StatNumber fontSize="2xl" color={"teal"}>{userData.field}</StatNumber>
            </Stat>
          </Box>
        
          <Box  p="4">
            <CircularProgress
              value={progressPercentage}
              size="200px"
              thickness="15px"
              color={getChartColor()}
            >
              <CircularProgressLabel fontSize="2xl">{`${progressPercentage.toFixed(2)}%`}</CircularProgressLabel>
            </CircularProgress>
            <Box mr="4">
        <span>Over all percentage</span>
      </Box>
      <Box color='teal'>
        <span > {totalMarks} / {subjectsWithMarks.length * 100}</span>
      </Box>
          </Box>
 
          <Box border={"2px solid teal"} bg="white" p="4" maxWidth={"300px"} boxShadow="md" borderRadius="lg">
            <ResponsiveContainer width="100%" height={300}>
            <span>Over all Performance of the year</span>
              <PieChart>
                <Pie data={pieChartData} dataKey="value" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
              <Box mr="4">
        
      </Box>
            </ResponsiveContainer>
          </Box>
<Box>
{/* Display card for the subject with the lowest marks */}
<Heading as='h3' size='lg' color={"teal"}>Highest and Lowest Marks</Heading>
<Box mt="4" p="4" bg="red" color={"white"} boxShadow="md" borderRadius="lg">
        <h2>{lowestMarkSubject.subject}</h2>
        <ProgressBar  isLabelVisible={false} completed={(lowestMarkSubject.marks / 100) * 100} bgColor="#eebd4d" height="20px" labelAlignment="center" labelSize="14px" />
        <p>Score: {lowestMarkSubject.marks} / 100</p>
      </Box>

      {/* Display card for the subject with the highest marks */}
      <Box mt="4" p="4" bg="teal" color={"white"} boxShadow="md" borderRadius="lg">
        <h2>{highestMarkSubject.subject}</h2>
        <ProgressBar bgColor={
                     "#3fc066"
                    } completed={(highestMarkSubject.marks / 100) * 100}  height="20px" labelAlignment="center" labelSize="14px" />
        <p>Score: {highestMarkSubject.marks} / 100</p>
      </Box>

</Box>
        </Box>
      )}
      
      <Box mb="4" overflowX="auto">
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Subject</Th>
              {subjectsWithMarks.map((subject) => (
                <Th key={subject.subject}>{subject.subject}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Th>Marks</Th>
              {subjectsWithMarks.map((subject) => (
                <Td key={subject.subject}>{subject.marks}</Td>
              ))}
            </Tr>
          </Tbody>
        </Table>
      </Box>

      <Box>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={subjectsWithMarks}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="subject" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="marks">
              {subjectsWithMarks.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(subjectsWithMarks)[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
