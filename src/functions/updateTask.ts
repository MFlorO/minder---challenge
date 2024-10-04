import { enpointTask } from "../constants";
import { Task } from "../interfaces";

export const updateTask = async (updateTask: Task) => {
  try {
    const response = await fetch(`${enpointTask}/${updateTask?.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateTask), // Usa updatedData directamente
    });

    if (!response.ok) throw new Error("Error al actualizar la tarea");

    return await response.json();
  } catch (error) {
    console.error("Error al actualizar la tarea:", error);
    throw error;
  }
};
