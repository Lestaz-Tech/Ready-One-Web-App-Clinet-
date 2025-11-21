/**
 * API Client Utility
 * Handles all API requests with proper error handling and logging
 */

export const apiClient = async (url, options = {}) => {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  
  try {
    // Build full URL if relative
    const fullUrl = url.startsWith('http') 
      ? url 
      : `${apiUrl}${url}`;

    console.log(`[API] ${options.method || 'GET'} ${fullUrl}`);
    
    // Check for missing auth token when headers are provided
    if (options.headers?.Authorization === 'Bearer undefined') {
      const authError = 'No authentication token. Please log in first.';
      console.error('[API] Auth error:', authError);
      throw new Error(authError);
    }

    if (options.headers?.Authorization) {
      console.log('[API] Authorization header present');
    }

    // Build headers - merge with defaults
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    // Create fetch options
    const fetchOptions = {
      ...options,
      headers
    };

    const response = await fetch(fullUrl, fetchOptions);

    // Log response status
    console.log(`[API] Response: ${response.status} ${response.statusText}`);

    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');
    
    let data;
    if (isJson) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    console.log('[API] Response data:', data);

    // Handle error responses
    if (!response.ok) {
      console.error(`[API Error] ${response.status}:`, data);
      
      // Special handling for auth errors
      if (response.status === 401) {
        const authError = typeof data === 'object' 
          ? (data.error || 'Unauthorized. Please log in again.')
          : 'Unauthorized. Please log in again.';
        throw new Error(authError);
      }
      
      const errorMsg = typeof data === 'object' 
        ? (data.error || data.message || `HTTP ${response.status}: ${response.statusText}`)
        : (data || `HTTP ${response.status}: ${response.statusText}`);
      throw new Error(errorMsg);
    }

    console.log('[API] Success');
    return data;

  } catch (error) {
    console.error('[API Error]', error.message);
    
    // Handle network errors specifically
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      const msg = `Cannot connect to backend at ${apiUrl}. Make sure the server is running: npm run dev in the backend folder.`;
      console.error('[API] Network error:', msg);
      throw new Error(msg);
    }
    
    // Re-throw the error as-is
    throw error;
  }
};

// Convenience methods
export const api = {
  get: (url, options = {}) => 
    apiClient(url, { ...options, method: 'GET' }),

  post: (url, body, options = {}) => {
    const bodyStr = typeof body === 'string' ? body : JSON.stringify(body);
    console.log('[API] POST Body:', bodyStr);
    return apiClient(url, { 
      ...options, 
      method: 'POST',
      body: bodyStr
    });
  },

  put: (url, body, options = {}) => {
    const bodyStr = typeof body === 'string' ? body : JSON.stringify(body);
    return apiClient(url, { 
      ...options, 
      method: 'PUT',
      body: bodyStr
    });
  },

  delete: (url, options = {}) => 
    apiClient(url, { ...options, method: 'DELETE' }),

  // For FormData (file uploads)
  postFormData: (url, formData, options = {}) => {
    console.log('[API] POST FormData:', formData);
    return apiClient(url, { 
      ...options, 
      method: 'POST',
      headers: {
        // Remove Content-Type to let browser set it with boundary
        ...options.headers
      },
      body: formData
    });
  }
};
