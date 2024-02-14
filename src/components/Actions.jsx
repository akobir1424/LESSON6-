import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Stack } from '@mui/material';
import Students from '../pages/Teachers';
import axios from 'axios';


const handleDelete = async (id) => {
  try {
    await axios.delete(
      `https://654e0ef4cbc3253557424b9d.mockapi.io/students/${id}`
    );
    const updatedTeachers = Students.filter((student) => student.id !== id);
    setTeachers(updatedTeachers);
  } catch (error) {
    console.error("Xatolik:", error);
  }
};

const Actions = () => {
  return (
    <Stack direction="row" spacing={3}>
      <IconButton color="warning">
        <EditIcon />
      </IconButton>
      <IconButton color="error">
        <DeleteIcon onClick={() => handleDelete(Students.id)}                          
        />
      </IconButton>
    </Stack>
  );
};

export default Actions;
