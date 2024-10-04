import { Stack, Typography } from "@mui/material"
import { useDataContext } from "./context";
import { AddTask, ListTaskCard, NewTask } from "./components";

function App() {

  const { tasks, categories, isLoading } = useDataContext();

  if(isLoading) return <Stack>CARGANDO.</Stack>

  const completedTasks = tasks?.filter((task) => task.completed);
  const pendingTasks = tasks?.filter((task) => !task.completed);

  return (
    <Stack width='100%' height='max-contenet' minHeight='100vh' direction='column' paddingY='4%' gap={4} sx={{
      paddingX: {
        xs: '2%',
        sm: '15%',
      },
    }}
    >
      <Typography variant="h3" component="h1" color='#000'>Lista de Tareas</Typography>
      <ListTaskCard tasks={pendingTasks} categories={categories} statusTitle='Pendientes' />
      <ListTaskCard tasks={completedTasks} categories={categories} statusTitle='Terminadas' />
      <AddTask />
      <NewTask categories={categories} />
    </Stack>
  )
}

export default App;
