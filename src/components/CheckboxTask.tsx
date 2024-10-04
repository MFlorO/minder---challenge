import { useDataContext } from "../context";
import { Task } from "../interfaces";
import { Checkbox, Stack } from "@mui/material";

interface Props{
  task: Task;
} 

const CheckboxTask = ({ task }:Props) => {

  const { updateTaskCompletion } = useDataContext();

  const handleCheckboxChange = async () => await updateTaskCompletion(task);

  return (
    <Stack>
      <Checkbox checked={task.completed} onChange={handleCheckboxChange}/>
    </Stack>
  )
}

export default CheckboxTask;