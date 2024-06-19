

const apiUrlBase = 'https://397vncv6uh.execute-api.us-west-2.amazonaws.com/test/login';

    function getApiData() {
      let outPut = document.getElementById("demo");
      const username = document.getElementById('usernameFetch').value;
      const apiUrl = `${apiUrlBase}/get/${username}`; 
      
      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          // console.log(data.username);
          outPut.textContent = JSON.stringify(data, null, 2);

          // document.getElementById("name").textContent = data.username || "N/A";
          // document.getElementById("cid").textContent = data.cid || "N/A";
          // document.getElementById("password").textContent = data.password || "N/A";
        })
        .catch(error => {
          console.error('Error:', error);
          outPut.textContent = 'Error fetching data.';
        });
    }

    function createApiData() {
      let outPut = document.getElementById("demo");
      const username = document.getElementById('username').value;
      const cid = document.getElementById('cid').value;
      const password = document.getElementById('password').value;
      const apiUrl = `${apiUrlBase}/create`;

      const userData = {
        username: username,
        cid: cid,
        password: password
      };

      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        outPut.textContent = 'Data created successfully!';
      })
      .catch(error => {
        console.error('Error:', error);
        outPut.textContent = 'Error creating data.';
      });
    }

    function updateApiData() {
      let outPut = document.getElementById("demo");
      const username = document.getElementById('username').value;
      const cid = document.getElementById('cid').value;
      const password = document.getElementById('password').value;
      const apiUrl = `${apiUrlBase}/update/${username}`;
    
      console.log("Form Values - Username:", username, "CID:", cid, "Password:", password);
    
      const userData = {
        username: username,
        cid: cid,
        password: password
      };
    
      console.log("Update Data - Request Body:", userData);
    
      fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Update Data - Response:", data);
        outPut.textContent = 'Data updated successfully!';
    
        // Update the fields with the new data
        document.getElementById("name").textContent = userData.username || "N/A";
        document.getElementById("cid").textContent = userData.cid || "N/A";
        document.getElementById("password").textContent = userData.password || "N/A";
      })
      .catch(error => {
        console.error('Error:', error);
        outPut.textContent = 'Error updating data.';
      });
    }
    
    

    function deleteApiData() {
      let outPut = document.getElementById("demo");
      const username = document.getElementById('usernameDelete').value;
      const apiUrl = `${apiUrlBase}/delete/${username}`;

      fetch(apiUrl, {
        method: 'DELETE'
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        outPut.textContent = 'Data deleted successfully!';
      })
      .catch(error => {
        console.error('Error:', error);
        outPut.textContent = 'Error deleting data.';
      });
    }
