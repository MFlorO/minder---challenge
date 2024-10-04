import { enpointTask } from "../constants";
import { Task } from "../interfaces";

export const createTask = async (newTask: Task) => {
  try {
    const response = await fetch(`${enpointTask}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask), 
    });

    if (!response.ok) throw new Error("Error al crear la tarea");

    return await response.json();
  } catch (error) {
    console.error("Error al crear la tarea:", error);
    throw error;
  }
};
