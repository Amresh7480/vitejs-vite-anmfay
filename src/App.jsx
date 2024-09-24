import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Card from './Card.jsx';
import Test from './Test.jsx';
function App() {
  const images = [
    'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  // Effect to handle the image change and progress bar
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            // When progress reaches 100%, reset and change image
            setCurrentImageIndex(
              (prevIndex) => (prevIndex + 1) % images.length
            );
            return 0;
          } else {
            return prevProgress + 1; // Increment progress by 5%
          }
        });
      }, 50); // Update every 50ms
    }
    return () => {
      clearInterval(interval);
    };
  }, [isPlaying]);

  // Update background image when currentImageIndex changes
  useEffect(() => {
    // Reset progress when the image changes
    if (progress >= 100) {
      setProgress(0);
    }
  }, [currentImageIndex]);

  return (
    <>
    {/*Parent Div*/}
      <div
        className="flex flex-col h-dvh bg-cover bg-center relative lg:flex-row  "
        style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
      >
        {/*Div 1*/}
        <div className="flex flex-row bg-black-500 text-white  items-center justify-start h-screen lg:w-2/3 ">
          <div className="mx-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              NASA's Europa Clipper
            </h1>
            <p className="text-lg md:text-2xl mb-8">
              Earth's first mission to conduct detailed reconnaissance of
              Jupiter's moon, Europa.
            </p>
            <div className="flex flex-row">
              <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded">
                The Mission
              </button>
              <button className="bg-white mx-4 hover:bg-white-300 text-red-600 font-semibold py-2 px-6 rounded">
                The Mission
              </button>
            </div>
            <div className="flex flex-col my-5 lg:flex-row lg:h-64 lg:overflow-hidden">
              <Card
                heading="Admission Stats"
                text="Know everything regarindg fdfdfd"
                url="https://google.com"
              />

              <Card
                heading="Admission Stats"
                text="Know everything regarindg fdfdfd"
                url="https://google.com"
              />
            </div>
          </div>
        </div>

        {/* Image Thumbnails with Circular Progress */}
        
          <div className="flex flex-row space-x-3 lg:absolute bottom-0 right-0 mx-4 my-4">
            {images.map((src, index) => (
              <div key={index} className="relative inline-block h-12 w-12">
                <img
                  alt=""
                  src={src}
                  className="h-12 w-12 rounded-full ring-2 ring-white"
                />
                {index === currentImageIndex && (
                  <div className="absolute top-0 left-0 h-12 w-12">
                    <CircularProgressbar
                      value={progress}
                      maxValue={100}
                      strokeWidth={3}
                      styles={buildStyles({
                        strokeLinecap: 'round',
                        pathTransitionDuration: 0,
                        pathColor: '#ff0000',
                        trailColor: 'rgba(0,0,0,0.1)',
                        backgroundColor: 'transparent',
                      })}
                    />
                  </div>
                )}
              </div>
            ))}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-white p-2 rounded-full shadow h-12 w-12 justify-center align-items-center"
            >
              {isPlaying ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-800"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {/* Pause Icon */}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 9v6m4-6v6"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-800"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {/* Play Icon */}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.856v4.288a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      
    </>
  );
}

export default App;
