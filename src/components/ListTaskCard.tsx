import { CircularProgress, Stack, Typography } from "@mui/material"
import TaskCard from "./TaskCard";
import { Category, Task } from "../interfaces"

interface Props{
  tasks: Task[] | undefined;
  categories: Category[] | null;
  statusTitle: string;
}

const ListTaskCard = ({ tasks, categories, statusTitle }: Props) => {    
  return (
    <Stack width='100%' direction='column' height='max-content' gap={2}>
      <Typography variant="h6" component="h3" color='black' fontWeight={500}>{statusTitle}</Typography>
      {
          tasks && categories
          ? <Stack width='100%' gap={2}>
          {
              tasks?.map( task => {
                  
                const category = categories.find((cat) => cat.id === task.category_id);
    
                return category &&(<TaskCard task={task} category={category} key={task?.id}/>)
              })
          }
          </Stack> 
          : <CircularProgress />
      }
    </Stack>
  )
}

export default ListTaskCard;