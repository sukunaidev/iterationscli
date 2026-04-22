import { useEffect, useState } from "react"

export default function Time(){
  const now = new Date();
  const formattedHours = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours(); 
  const formattedMinutes = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
  const formattedSeconds = now.getSeconds() < 10 ? "0" +now.getSeconds() : now.getSeconds();
  const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

  const [currentTime, setCurrentTime] = useState<string>(formattedTime);
  
  useEffect(() => {
    setInterval(() => {
      const now = new Date();
      const formattedHours = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours(); 
      const formattedMinutes = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
      const formattedSeconds = now.getSeconds() < 10 ? "0" +now.getSeconds() : now.getSeconds();
      const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
      setCurrentTime(formattedTime);
    }, 1000)
  }, [currentTime])

  return (

    <div className="bg-white text-black dark:bg-black dark:text-white flex items-center justify-center">
      <div className="flex-col ">
        <div className=" text-gray-400 mt-4 text-5xl mt-10">{currentTime}</div>
      </div>
    </div>
  )
}
