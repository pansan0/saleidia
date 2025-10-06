import { projectId, publicAnonKey } from './supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-60f140bd`;

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  token?: string;
  body?: any;
}

async function apiCall(endpoint: string, options: ApiOptions = {}) {
  const { method = 'GET', token = publicAnonKey, body } = options;
  
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  };

  if (body && method !== 'GET') {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error);
    throw error;
  }
}

// Friend API functions
export const friendsApi = {
  getFriends: (userId: string, token: string) =>
    apiCall(`/friends/${userId}`, { token }),

  sendFriendRequest: (fromUserId: string, toUserId: string, token: string) =>
    apiCall('/friend-request', {
      method: 'POST',
      token,
      body: { fromUserId, toUserId }
    }),

  searchUsers: (query: string, token: string) =>
    apiCall(`/search/users?q=${encodeURIComponent(query)}`, { token }),
};

// Chat API functions
export const chatApi = {
  getChats: (userId: string, token: string) =>
    apiCall(`/chats/${userId}`, { token }),

  getMessages: (chatId: string, token: string) =>
    apiCall(`/messages/${chatId}`, { token }),

  sendMessage: (chatId: string, senderId: string, text: string, token: string) =>
    apiCall('/message', {
      method: 'POST',
      token,
      body: { chatId, senderId, text }
    }),

  createChat: (userId1: string, userId2: string, token: string) =>
    apiCall('/chat', {
      method: 'POST',
      token,
      body: { userId1, userId2 }
    }),
};

// User API functions
export const userApi = {
  getUser: (userId: string, token: string) =>
    apiCall(`/user/${userId}`, { token }),

  updateProfile: (userId: string, updates: any, token: string) =>
    apiCall(`/user/${userId}`, {
      method: 'PUT',
      token,
      body: updates
    }),

  uploadAvatar: (userId: string, imageFile: File, token: string) => {
    const formData = new FormData();
    formData.append('avatar', imageFile);
    
    return fetch(`${API_BASE_URL}/user/${userId}/avatar`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    }).then(res => res.json());
  },
};

export default apiCall;