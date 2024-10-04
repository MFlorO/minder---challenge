import { Stack, Typography } from "@mui/material"
import { Category, Task } from "../interfaces";
import CheckboxTask from "./CheckboxTask";

interface Props{
  task: Task;
  category: Category;
}

const TaskCard = ({ task, category }:Props) => {
    
  return (
    <Stack width='100%' direction='row' alignItems='center' boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px' bgcolor={category.color ? category.color : '#fff'} p='1.2%' gap={2}
    sx={{
      height: {
        xs: '110px',
        sm: '60px',
      },
    }}
    >
      <CheckboxTask task={task} />
      <Stack>
        <Typography fontSize='18px' color='#000'>{category.name}: {task?.title}</Typography>
        <Typography fontSize='15px'>{task?.description}</Typography>
      </Stack>
    </Stack>
  )
}

export default TaskCard;