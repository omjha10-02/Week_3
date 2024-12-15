

// import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import UploadPage from "./components/UploadPage";
// import SummaryPage from "./components/SummaryPage";

// const App = () => {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   // Toggle dark and light mode
//   const toggleDarkMode = () => {
//     setIsDarkMode((prev) => !prev);
//   };

//   return (
//     <Router>
//       <div style={{ backgroundColor: isDarkMode ? "#121212" : "#FFFFFF", color: isDarkMode ? "#FFFFFF" : "#000000", minHeight: "100vh" }}>
//         <button
//           style={{
//             position: "absolute",
//             top: "20px",
//             right: "20px",
//             padding: "10px",
//             backgroundColor: isDarkMode ? "#333" : "#ccc",
//             color: isDarkMode ? "#fff" : "#000",
//             border: "none",
//             cursor: "pointer",
//           }}
//           onClick={toggleDarkMode}
//         >
//           {isDarkMode ? "Light Mode" : "Dark Mode"}
//         </button>

//         <Routes>
//           <Route path="/" element={<UploadPage />} />
//           <Route path="/summary" element={<SummaryPage />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UploadPage from "./components/UploadPage";
import SummaryPage from "./components/SummaryPage";

const App = () => {
  return (
    <Router>
      <div style={{ minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<UploadPage />} />
          <Route path="/summary" element={<SummaryPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
