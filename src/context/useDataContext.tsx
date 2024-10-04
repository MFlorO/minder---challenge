import { useEffect, useState, createContext, useContext } from "react";
import { enpointTask, enpointCategories } from "../constants";
import { Category, Task } from "../interfaces";
import { createTask, updateTask } from "../functions";

interface ContextDataProps {
  tasks: Task[] | null;
  categories: Category[] | null;
  isLoading: boolean;
  onCreateTask: (task: Task) => void;
  updateTaskCompletion: (task: Task) => void
}

export const DataContext = createContext({} as ContextDataProps)

export const DataProvider = ({ children }: { children: React.ReactNode }) => {

  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {

      setIsLoading(true);

      try {
        const [taskResponse, categoryResponse] = await Promise.all([
          fetch(enpointTask, { method: "GET" }),
          fetch(enpointCategories, { method: "GET" }),
        ]);

        const taskResult = await taskResponse.json();
        const categoryResult = await categoryResponse.json();

        setTasks(taskResult);
        setCategories(categoryResult);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }

    };

    fetchData();
  }, []);

  const onCreateTask = async (task: Task) => {
    try {
      const createdTask = await createTask(task);

      setTasks((prevTasks) => {
        if (!prevTasks)  return [createdTask];

        return [...prevTasks, createdTask];
      });

    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
    }
  };

  const updateTaskCompletion = async (task: Task) => {
    try {
      await updateTask({ ...task, completed: !task?.completed });

      setTasks((prevTasks) => {
        if (!prevTasks) return null;
        
        const completed = !task?.completed

        return prevTasks.map((prevTask) => prevTask.id === task?.id ? { ...prevTask, completed } : prevTask );
      });
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
    }
  };

  return <DataContext.Provider value={{ tasks, categories, isLoading, onCreateTask, updateTaskCompletion }}>{children}</DataContext.Provider>
};

export const useDataContext = () => {   

  const Context = useContext(DataContext);

  if (Context === undefined){
    throw Error('Esta fuera del contexto')
  }

  return Context;
}