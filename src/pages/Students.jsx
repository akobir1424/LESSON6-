import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { Actions, Loader, AddStudent } from './../components';

const Students = () => {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  const [openAdd, setOpenAdd] = useState(false);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        'https://654e0ef4cbc3253557424b9d.mockapi.io/students'
      );
      const data = await res.data;
      setStudents(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const addStudent = async (student) => {
    setLoading(true);
    try {
      const { firstName, lastName, age, group, teacher, avatar } = student;
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('age', age);
      formData.append('group', group);
      formData.append('teacher', teacher);
      formData.append('avatar', avatar);

      await axios.post(
        'https://654e0ef4cbc3253557424b9d.mockapi.io/students',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      {openAdd && (
        <AddStudent
          openAdd={openAdd}
          setOpenAdd={setOpenAdd}
          addStudent={addStudent}
          fetchStudents={fetchStudents}
        />
      )}
      <Stack
        direction="row"
        sx={{
          padding: '20px 0',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h4">Students</Typography>
        <Button variant="contained" onClick={() => setOpenAdd(true)}>
          Add
        </Button>
      </Stack>

      {loading ? <Loader /> : null}
      {error ? (
        <Typography
          variant="h4"
          color="error"
          sx={{ textAlign: 'center', paddingTop: '20px' }}
        >
          {error.message}
        </Typography>
      ) : null}
      {students.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Avatar</TableCell>
                <TableCell>Firstname</TableCell>
                <TableCell>Lastname</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Group</TableCell>
                <TableCell>Teacher</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow
                  key={student.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {student.id}
                  </TableCell>
                  <TableCell>
                    <img
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                      }}
                      src={student.avatar}
                      alt={student.firstName}
                    />
                  </TableCell>
                  <TableCell>{student.firstName}</TableCell>
                  <TableCell>{student.lastName}</TableCell>
                  <TableCell>{student.age}</TableCell>
                  <TableCell>{student.group}</TableCell>
                  <TableCell>{student.teacher}</TableCell>
                  <TableCell>
                    <Actions />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </div>
  );
};

export default Students;
