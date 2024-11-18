

const getBaseUrl = () => 'https://backend.skyworthpakistan.com';
const handleError = (error, action) => {
  const message = error.message || "An unknown error occurred";
  console.error(`${action} Error:`, message);
  alert(`Error during ${action}: ${message}`);
  throw error;
};

export const postRequest = async (endpoint, body) => {
  try {
    const response = await fetch(`${getBaseUrl()}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const jsonResponse = await response.json();
    if (response.ok) {
      return jsonResponse;
    } else {
      throw new Error(jsonResponse.message || 'Request failed');
    }
  } catch (error) {
    handleError(error, "POST");
  }
};

export const getRequest = async (endpoint) => {
  try {
    const token = localStorage.getItem('skyworth_token');
    const response = await fetch(`${getBaseUrl()}/${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      handleUnauthorizedAccess(response);
    }
  } catch (error) {
    handleError(error, "GET");
  }
};

export const putRequest = async (endpoint, body) => {
  try {

    const token = localStorage.getItem('skyworth_token');
    const response = await fetch(`${getBaseUrl()}/${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const jsonResponse = await response.json();
    if (response.ok) {
      return jsonResponse;
    } else {
      throw new Error(jsonResponse.message || 'Request failed');
    }
  } catch (error) {
    handleError(error, "PUT");
  }
};
export const updateUserStatus = async (endpoint, newStatus) => {
  try {
    const token = localStorage.getItem('skyworth_token');
    const response = await fetch(`${getBaseUrl()}/${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify( newStatus ),
    });

    if (!response.ok) {
      throw new Error('Failed to update status');
    }
  } catch (error) {
    console.error(error);
  }
};
export const postRequestToken = async (endpoint, body) => {
  try {

    const token = localStorage.getItem('skyworth_token');
    const response = await fetch(`${getBaseUrl()}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const jsonResponse = await response.json();
    if (response.ok) {
      return jsonResponse;
    } else {
      throw new Error(jsonResponse.message || 'Request failed');
    }
  } catch (error) {
    handleError(error, "POST with Token");
  }
};

export const deleteRequestToken = async (endpoint) => {
  try {

    const token = localStorage.getItem('skyworth_token');
    const response = await fetch(`${getBaseUrl()}/${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const jsonResponse = await response.json();
    if (response.ok) {
      return jsonResponse;
    } else {
      throw new Error(jsonResponse.message || 'Request failed');
    }
  } catch (error) {
    handleError(error, "DELETE");
  }
};

// Handle unauthorized access
const handleUnauthorizedAccess = (response) => {
  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem('token');
    alert("Unauthorized: Please log in again.");
    window.location.href = '/login';
  } else {
    alert(`Error ${response.status}: ${response.statusText || 'Request failed'}`);
  }
};
