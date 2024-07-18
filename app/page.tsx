'use client'

import { useState, useEffect } from "react";

import Header from "@/components/Header";

import AddTask from "@/components/AddTask";

export default function Home() {
  const [task, setTask] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleCreateTask = async () => {
    setIsLoading(true)
  try {
    const response = await fetch("/api/tasks/new", {
      method: 'POST',
      body: JSON.stringify({
        task: task
      }),
    })
    if(response.ok) {
      setTask('')
    }
    else {
      console.log('error')
    } 
    
  }
  catch(error) {
    console.log(error)
    }
    setIsLoading(false)
  }
  return (
    <>
      <Header />
      <AddTask task={task} setTask={setTask} handleCreateTask={handleCreateTask} />
    </>
  );
}
