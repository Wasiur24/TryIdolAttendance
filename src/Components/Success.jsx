import React from "react";

function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
      <div className="relative flex flex-col items-center justify-center p-10 bg-white rounded-lg shadow-2xl max-w-md w-full transform transition duration-500 hover:scale-110 hover:rotate-1">
        {/* Animated Checkmark */}
        <div className="flex items-center justify-center mb-6">
          <div className="checkmark-container">
            <svg
              className="checkmark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                className="checkmark-circle"
                cx="26"
                cy="26"
                r="24"
                fill="none"
              />
              <path
                className="checkmark-check"
                fill="none"
                d="M14 26l10 10 14-18"
              />
            </svg>
          </div>
        </div>

        {/* Success Text */}
        <h1 className="text-3xl font-bold text-green-600 text-center animate-fadeIn">
          Attendance Recorded Successfully!
        </h1>

        {/* Hovering Button */}
        <button
          onClick={() => (window.location.href = "/user")}
          className="mt-6 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white text-lg font-medium rounded-lg shadow-md transition-transform duration-500 hover:scale-110 hover:rotate-2"
        >
          Go Back
        </button>
      </div>

      {/* Styles */}
      <style jsx>{`
        /* Animation Styles */
        @keyframes checkmark-circle {
          0% {
            stroke-dasharray: 0, 150;
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dasharray: 150, 150;
            stroke-dashoffset: 0;
          }
        }

        @keyframes checkmark-check {
          0% {
            stroke-dasharray: 0, 36;
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dasharray: 36, 36;
            stroke-dashoffset: 0;
          }
        }

        .checkmark {
          width: 100px;
          height: 100px;
        }

        .checkmark-circle {
          stroke: #4caf50;
          stroke-width: 3;
          stroke-linecap: round;
          animation: checkmark-circle 1s ease-in-out forwards;
        }

        .checkmark-check {
          stroke: #4caf50;
          stroke-width: 3;
          stroke-linecap: round;
          animation: checkmark-check 0.7s ease-in-out 0.5s forwards;
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1.2s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}

export default SuccessPage;
