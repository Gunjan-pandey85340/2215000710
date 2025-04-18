// import React, { useState } from 'react';
// import axios from 'axios';

// const NumberFetcher = () => {
//   const [type, setType] = useState('e'); // default: even
//   const [data, setData] = useState(null);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const numberTypes = [
//     { value: 'e', label: 'Even' },
//     { value: 'p', label: 'Prime' },
//     { value: 'f', label: 'Fibonacci' },
//     { value: 'r', label: 'Random' }
//   ];

//   const handleFetch = async () => {
//     setIsLoading(true);
//     setError('');
    
//     try {
//       const response = await axios.get(`http://localhost:9876/numbers/${type}`, {
//         timeout: 5000 // 5 second timeout
//       });
      
//       if (response.data && typeof response.data.avg === 'number') {
//         setData(response.data);
//       } else {
//         throw new Error('Invalid response format from server');
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || 
//                err.message || 
//                'Error fetching data. Please check your backend connection.');
//       setData(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const formatJsonOutput = (data) => {
//     if (!data) return '';
//     return JSON.stringify({
//       windowPrevState: data.windowPrevState,
//       windowCurrState: data.windowCurrState,
//       numbers: data.numbers,
//       avg: data.avg.toFixed(2)
//     }, null, 2);
//   };

//   return (
//     <div className="fetcher-container">
//       <div className="controls">
//         <label htmlFor="numberType">Select Number Type: </label>
//         <select 
//           id="numberType"
//           value={type} 
//           onChange={(e) => setType(e.target.value)}
//           disabled={isLoading}
//         >
//           {numberTypes.map(({ value, label }) => (
//             <option key={value} value={value}>{label}</option>
//           ))}
//         </select>

//         <button 
//           onClick={handleFetch} 
//           disabled={isLoading}
//         >
//           {isLoading ? 'Loading...' : 'Fetch Numbers'}
//         </button>
//       </div>

//       {error && (
//         <div className="error-message">
//           <p>Error: {error}</p>
//           <p>Make sure your backend server is running on port 9876.</p>
//         </div>
//       )}

//       {data && (
//         <div className="results">
//           <h3>Results:</h3>
//           <pre>{formatJsonOutput(data)}</pre>
          
//           <div className="stats">
//             <p>Previous Window: [{data.windowPrevState.join(', ')}]</p>
//             <p>Current Window: [{data.windowCurrState.join(', ')}]</p>
//             <p>Received Numbers: [{data.numbers.join(', ')}]</p>
//             <p>Average: {data.avg.toFixed(2)}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NumberFetcher;


import React, { useState } from 'react';
import axios from 'axios';

const NumberFetcher = () => {
  const [type, setType] = useState('e'); // default: even
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const numberTypes = [
    { value: 'e', label: 'Even' },
    { value: 'p', label: 'Prime' },
    { value: 'f', label: 'Fibonacci' },
    { value: 'r', label: 'Random' }
  ];

  const handleFetch = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.get(`http://localhost:9876/numbers/${type}`, {
        timeout: 5000 // 5 second timeout
      });

      // Check if response is valid and has the correct data format
      if (response.data && Array.isArray(response.data.numbers) && typeof response.data.avg === 'number') {
        setData(response.data);
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (err) {
      // Handle different error scenarios
      setError(err.response?.data?.message || err.message || 'Error fetching data. Please check your backend connection.');
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const formatJsonOutput = (data) => {
    if (!data) return '';
    return JSON.stringify({
      windowPrevState: data.windowPrevState,
      windowCurrState: data.windowCurrState,
      numbers: data.numbers,
      avg: data.avg.toFixed(2)
    }, null, 2);
  };

  return (
    <div className="fetcher-container">
      <div className="controls">
        <label htmlFor="numberType">Select Number Type: </label>
        <select 
          id="numberType"
          value={type} 
          onChange={(e) => setType(e.target.value)}
          disabled={isLoading}
        >
          {numberTypes.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>

        <button 
          onClick={handleFetch} 
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Fetch Numbers'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          <p>Error: {error}</p>
          <p>Make sure your backend server is running on port 9876.</p>
        </div>
      )}

      {data && (
        <div className="results">
          <h3>Results:</h3>
          <pre>{formatJsonOutput(data)}</pre>
          
          <div className="stats">
            <p>Previous Window: [{data.windowPrevState.join(', ')}]</p>
            <p>Current Window: [{data.windowCurrState.join(', ')}]</p>
            <p>Received Numbers: [{data.numbers.join(', ')}]</p>
            <p>Average: {data.avg.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NumberFetcher;
