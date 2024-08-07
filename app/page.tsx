'use client';

import { useState, useEffect } from "react";
import { Spinner, Flex } from "@chakra-ui/react";
import Header from "@/components/Header";
import AddTask from "@/components/AddTask";
import NoTask from "@/components/NoTask";
import Task from "@/components/Task";
import Loading from "@components/Loading";

import { ITask } from "@types";

export default function Home() {
  const [task, setTask] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [allTasks, setAllTasks] = useState([]);

  const handleCreateTask = async () => {
    if (!task.trim()) {
      console.log('Task is empty');
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("/api/task/new", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task }),
      });
      if (response.ok) {
        console.log('Task created successfully');
        setTask('');
        await fetchTasks();
      } else {
        console.log('Error creating task');
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/task/all');
      if (!response.ok) {
        throw new Error('Error fetching tasks');
      }
      const data = await response.json();
      console.log('Fetched tasks:', data);
      setAllTasks(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCompleteTask = async (id: string) => {
    try {
      const response = await fetch(`/api/task/complete/${id}`, {
        method: "PATCH",
      });
      if (response.ok) {
        await fetchTasks();
      } else {
        console.log('Error completing task');
      }
    } catch (error) {
      console.log("Error completing task", error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      const response = await fetch(`/api/task/delete/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setAllTasks((prevTasks) => prevTasks.filter((task: ITask) => task._id !== id));
      } else {
        console.log('Error deleting task');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <Header />
      <AddTask task={task} setTask={setTask} handleCreateTask={handleCreateTask} />
      {isLoading ? (
        <Loading />
      ) : (
        <Flex direction="column" p="2rem">
          {allTasks.length > 0 ? (
            allTasks.map((individualTask: ITask) => (
              <Task
                key={individualTask._id}
                individualTask={individualTask}
                handleCompleteTask={handleCompleteTask}
                handleDeleteTask={handleDeleteTask}
              />
            ))
          ) : (
            <NoTask />
          )}
        </Flex>
      )}
    </>
  );
}