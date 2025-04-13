document.getElementById('dataForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form from reloading the page
  
    // Extract user data from the form
    const data = {
      Name: document.getElementById('Name').value,
      Email: document.getElementById('Email').value,
      Inquiry: document.getElementById('Inquiry').value
    };
  
    try {
      // Send the data to the backend
      const response = await fetch('http://localhost:3000/submit', { // Backend URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // Send data as JSON
      });
  
      const result = await response.json();
      alert(result.message); // Display success message to the user
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit data!'); // Display error message
    }
  });
  