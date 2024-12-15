// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const SummaryPage = () => {
//   const [summary, setSummary] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedSummary = localStorage.getItem("summary");
//     if (storedSummary) {
//       setSummary(JSON.parse(storedSummary));
//     }
//   }, []);

//   const handleBack = () => {
//     navigate("/");
//   };

//   return (
//     <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
//       <h3>Summary</h3>

//       {summary ? (
//         <>
//           <div>
//             <h4>Study Objectives:</h4>
//             <ul>
//               {summary.objectives.map((objective, index) => (
//                 <li key={index}>{objective}</li>
//               ))}
//             </ul>
//           </div>

//           <div>
//             <h4>Inclusion/Exclusion Criteria:</h4>
//             <div>
//               <h5>Inclusion:</h5>
//               <ul>
//                 {summary.inclusion_exclusion_criteria.inclusion.map((inclusion, index) => (
//                   <li key={index}>{inclusion}</li>
//                 ))}
//               </ul>
//               <h5>Exclusion:</h5>
//               <ul>
//                 {summary.inclusion_exclusion_criteria.exclusion.map((exclusion, index) => (
//                   <li key={index}>{exclusion}</li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           <div>
//             <h4>Methodology:</h4>
//             <ul>
//               {summary.methodology.map((method, index) => (
//                 <li key={index}>{method}</li>
//               ))}
//             </ul>
//           </div>
//         </>
//       ) : (
//         <p>No summary available.</p>
//       )}

//       <button onClick={handleBack}>Back to Upload</button>
//     </div>
//   );
// };

// export default SummaryPage;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SummaryPage = () => {
  const [summary, setSummary] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedSummary = localStorage.getItem("summary");
    if (storedSummary) {
      setSummary(JSON.parse(storedSummary));
    }
  }, []);

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h3>Summary</h3>

      {summary ? (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Category</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>Study Objectives</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <ul>
                  {summary.objectives.map((objective, index) => (
                    <li key={index}>{objective}</li>
                  ))}
                </ul>
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>Inclusion Criteria</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <ul>
                  {summary.inclusion_exclusion_criteria.inclusion.map((inclusion, index) => (
                    <li key={index}>{inclusion}</li>
                  ))}
                </ul>
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>Exclusion Criteria</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <ul>
                  {summary.inclusion_exclusion_criteria.exclusion.map((exclusion, index) => (
                    <li key={index}>{exclusion}</li>
                  ))}
                </ul>
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>Methodology</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <ul>
                  {summary.methodology.map((method, index) => (
                    <li key={index}>{method}</li>
                  ))}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>No summary available.</p>
      )}

      <button onClick={handleBack} style={{ marginTop: "20px" }}>Back to Upload</button>
    </div>
  );
};

export default SummaryPage;
