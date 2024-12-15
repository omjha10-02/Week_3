// import React, { useState } from "react";
// import axios from "axios";

// const FileUpload = () => {
//   const [file, setFile] = useState(null);
//   const [summary, setSummary] = useState(null);
//   const [error, setError] = useState("");

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setSummary(null); // Clear previous summary
//     setError(""); // Clear previous error
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!file) {
//       setError("Please select a file.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       // Log the full response data to check the structure
//       console.log("Response Data: ", response.data);

//       // Check if the response contains the required fields (updated to access 'summary' object)
//       if (
//         response.data.summary &&
//         response.data.summary.objectives &&
//         response.data.summary.inclusion_exclusion_criteria &&
//         response.data.summary.methodology
//       ) {
//         setSummary(response.data.summary);
//       } else {
//         setError("No valid summary generated.");
//       }
//     } catch (err) {
//       setError(err.response?.data?.error || "An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
//       <h2>Upload for Summary</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="file" accept=".csv, .pdf" onChange={handleFileChange} />
//         <button type="submit">Upload</button>
//       </form>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {summary && (
//         <div>
//           <h3>Summary</h3>

//           <div>
//             <h4>Study Objectives:</h4>
//             <ul>
//               {summary.objectives && summary.objectives.length > 0 ? (
//                 summary.objectives.map((objective, index) => (
//                   <li key={index}>{objective}</li>
//                 ))
//               ) : (
//                 <p>No objectives available</p>
//               )}
//             </ul>
//           </div>

//           <div>
//             <h4>Inclusion/Exclusion Criteria:</h4>
//             {summary.inclusion_exclusion_criteria ? (
//               <div>
//                 <h5>Inclusion:</h5>
//                 <ul>
//                   {summary.inclusion_exclusion_criteria.inclusion &&
//                     summary.inclusion_exclusion_criteria.inclusion.length > 0 ? (
//                     summary.inclusion_exclusion_criteria.inclusion.map((inclusion, index) => (
//                       <li key={index}>{inclusion}</li>
//                     ))
//                   ) : (
//                     <p>No inclusion criteria available</p>
//                   )}
//                 </ul>
//                 <h5>Exclusion:</h5>
//                 <ul>
//                   {summary.inclusion_exclusion_criteria.exclusion &&
//                     summary.inclusion_exclusion_criteria.exclusion.length > 0 ? (
//                     summary.inclusion_exclusion_criteria.exclusion.map((exclusion, index) => (
//                       <li key={index}>{exclusion}</li>
//                     ))
//                   ) : (
//                     <p>No exclusion criteria available</p>
//                   )}
//                 </ul>
//               </div>
//             ) : (
//               <p>No inclusion/exclusion criteria available</p>
//             )}
//           </div>

//           <div>
//             <h4>Methodology:</h4>
//             <ul>
//               {summary.methodology && summary.methodology.length > 0 ? (
//                 summary.methodology.map((method, index) => (
//                   <li key={index}>{method}</li>
//                 ))
//               ) : (
//                 <p>No methodology available</p>
//               )}
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileUpload;
