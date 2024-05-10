import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Table, Thead, Tbody, Tr, Th, Td, IconButton, Collapse, Box, Input, useToast } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { EditIcon } from '@chakra-ui/icons';
import { Navbar } from './Navbar';

export default function Admin() {
  const [studentsData, setStudentsData] = useState([]);
  const [selectedStudentIndex, setSelectedStudentIndex] = useState(null);
  const toast = useToast();

  const token = Cookies.get('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/university', {
          headers: {
            Authorization: token,
          },
        });
        setStudentsData(response.data.students);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchData();
  }, [token]);

  const handleExpand = (index) => {
    setSelectedStudentIndex(index === selectedStudentIndex ? null : index);
  };

  const handleEdit = async (studentId, field, value) => {
    console.log(studentId, field, value, "EDIT");
    try {
      const response = await axios.put(`http://localhost:8080/university/admin/${studentId}`, { [field]: value }, {
        headers: {
          Authorization: token,
        },
      });
      console.log(response.data);
      toast({
        title: 'Update Successful',
        description: 'Student data updated successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating student data:', error);
      toast({
        title: 'Update Failed',
        description: 'Failed to update student data. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleEditSubject = async (studentId, subjectId, marks) => {

    try {
      const response = await axios.put(`http://localhost:8080/university/admin/marks/${studentId}/${subjectId}`, { marks }, {
        headers: {
          Authorization: token,
        },
      });
      console.log(response.data);
      toast({
        title: 'Update Successful',
        description: 'Subject marks updated successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating subject marks:', error);
      toast({
        title: 'Update Failed',
        description: 'Failed to update subject marks. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Navbar />
      <Box>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Username</Th>
              <Th>Email</Th>
              <Th>Roll Number</Th>
              <Th>Field</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {studentsData.map((student, index) => (
              <React.Fragment key={student._id}>
                <Tr>
                  <Td>
                    <IconButton
                      aria-label="Expand"
                      icon={<ChevronDownIcon />}
                      onClick={() => handleExpand(index)}
                    />
                  </Td>
                  <Td onDoubleClick={(e) => e.target.tagName !== 'INPUT' && e.target.setAttribute('contentEditable', true)} onBlur={(e) => handleEdit(student._id, 'username', e.target.innerText)}>{student.username}</Td>
                  <Td onDoubleClick={(e) => e.target.tagName !== 'INPUT' && e.target.setAttribute('contentEditable', true)} onBlur={(e) => handleEdit(student._id, 'email', e.target.innerText)}>{student.email}</Td>
                  <Td onDoubleClick={(e) => e.target.tagName !== 'INPUT' && e.target.setAttribute('contentEditable', true)} onBlur={(e) => handleEdit(student._id, 'rollnumber', e.target.innerText)}>{student.rollnumber}</Td>
                  <Td>{student.field}</Td>
                  <Td>
                    <IconButton aria-label="Edit" icon={<EditIcon />} onClick={() => handleEdit(student._id)} />
                  </Td>
                </Tr>
                <Tr>
                  <Collapse in={selectedStudentIndex === index} animateOpacity>
                    <Td colSpan={5}>
                      <Table variant="simple">
                        <Thead>
                          <Tr>
                            <Th>Subject</Th>
                            <Th>Marks</Th>
                            <Th>Action</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {student.subjectsWithMarks.map((subject) => (
                            <Tr key={subject.subjectId}>
                              <Td>{subject.subject}</Td>
                              <Td>
                                <Input defaultValue={subject.marks} onBlur={(e) => handleEditSubject(student._id, subject.subjectId, e.target.value)} />
                              </Td>
                              <Td>
                                <IconButton
                                  aria-label="Edit"
                                  icon={<EditIcon />}
                                  onClick={() => handleEditSubject(student._id, subject.subjectId)}
                                />
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </Td>
                  </Collapse>
                </Tr>
              </React.Fragment>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
