import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Create Supabase client for admin operations
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-60f140bd/health", (c) => {
  return c.json({ status: "ok" });
});

// Signup endpoint
app.post("/make-server-60f140bd/signup", async (c) => {
  try {
    const { email, password, userData } = await c.req.json();
    
    if (!email || !password || !userData) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    // Create user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: userData,
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (authError) {
      console.error('Auth error during signup:', authError);
      return c.json({ error: `Authentication error during signup: ${authError.message}` }, 400);
    }

    // Store additional user data in KV store
    const userId = authData.user.id;
    const userProfile = {
      id: userId,
      name: userData.name,
      email: email,
      type: userData.type,
      interests: userData.interests,
      personality: userData.personality,
      avatar: `https://images.unsplash.com/photo-1556557286-bf3be5fd9d06?w=150&h=150&fit=crop&crop=face`,
      bio: "",
      totalEarnings: 0,
      ideasSold: 0,
      rating: 5.0,
      createdAt: new Date().toISOString()
    };

    await kv.set(`user:${userId}`, userProfile);

    return c.json({ 
      success: true, 
      user: userProfile,
      authUser: authData.user 
    });

  } catch (error) {
    console.error('Signup server error:', error);
    return c.json({ error: `Server error during signup: ${error.message}` }, 500);
  }
});

// Get user profile endpoint
app.get("/make-server-60f140bd/user/:userId", async (c) => {
  try {
    const userId = c.req.param('userId');
    const accessToken = c.req.header('Authorization')?.split(' ')[1];

    // Verify user is authenticated
    if (accessToken && accessToken !== Deno.env.get('SUPABASE_ANON_KEY')) {
      const { data, error } = await supabase.auth.getUser(accessToken);
      if (error || !data.user) {
        return c.json({ error: 'Unauthorized' }, 401);
      }
    }

    const userProfile = await kv.get(`user:${userId}`);
    if (!userProfile) {
      return c.json({ error: 'User not found' }, 404);
    }

    return c.json({ user: userProfile });

  } catch (error) {
    console.error('Get user profile error:', error);
    return c.json({ error: `Server error getting user profile: ${error.message}` }, 500);
  }
});

// Friends endpoints

// Get user's friends
app.get("/make-server-60f140bd/friends/:userId", async (c) => {
  try {
    const userId = c.req.param('userId');
    const accessToken = c.req.header('Authorization')?.split(' ')[1];

    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data: authUser, error } = await supabase.auth.getUser(accessToken);
    if (error || !authUser.user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const friends = await kv.getByPrefix(`friend:${userId}:`);
    const friendsList = friends.map(friend => friend.value);

    return c.json({ friends: friendsList });

  } catch (error) {
    console.error('Get friends error:', error);
    return c.json({ error: `Server error getting friends: ${error.message}` }, 500);
  }
});

// Send friend request
app.post("/make-server-60f140bd/friend-request", async (c) => {
  try {
    const { fromUserId, toUserId } = await c.req.json();
    const accessToken = c.req.header('Authorization')?.split(' ')[1];

    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data: authUser, error } = await supabase.auth.getUser(accessToken);
    if (error || !authUser.user || authUser.user.id !== fromUserId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const requestId = `${fromUserId}-${toUserId}-${Date.now()}`;
    const friendRequest = {
      id: requestId,
      fromUserId,
      toUserId,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    await kv.set(`friend_request:${requestId}`, friendRequest);
    await kv.set(`friend_request_to:${toUserId}:${requestId}`, friendRequest);

    return c.json({ success: true, request: friendRequest });

  } catch (error) {
    console.error('Send friend request error:', error);
    return c.json({ error: `Server error sending friend request: ${error.message}` }, 500);
  }
});

// Chat endpoints

// Get user's chats
app.get("/make-server-60f140bd/chats/:userId", async (c) => {
  try {
    const userId = c.req.param('userId');
    const accessToken = c.req.header('Authorization')?.split(' ')[1];

    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data: authUser, error } = await supabase.auth.getUser(accessToken);
    if (error || !authUser.user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const chats = await kv.getByPrefix(`chat:${userId}:`);
    const chatsList = chats.map(chat => chat.value);

    return c.json({ chats: chatsList });

  } catch (error) {
    console.error('Get chats error:', error);
    return c.json({ error: `Server error getting chats: ${error.message}` }, 500);
  }
});

// Send message
app.post("/make-server-60f140bd/message", async (c) => {
  try {
    const { chatId, senderId, text } = await c.req.json();
    const accessToken = c.req.header('Authorization')?.split(' ')[1];

    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data: authUser, error } = await supabase.auth.getUser(accessToken);
    if (error || !authUser.user || authUser.user.id !== senderId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const messageId = `${chatId}-${Date.now()}`;
    const message = {
      id: messageId,
      chatId,
      senderId,
      text,
      timestamp: new Date().toISOString(),
      type: 'text',
      status: 'sent'
    };

    await kv.set(`message:${messageId}`, message);
    await kv.set(`chat_message:${chatId}:${messageId}`, message);

    return c.json({ success: true, message });

  } catch (error) {
    console.error('Send message error:', error);
    return c.json({ error: `Server error sending message: ${error.message}` }, 500);
  }
});

// Get messages for a chat
app.get("/make-server-60f140bd/messages/:chatId", async (c) => {
  try {
    const chatId = c.req.param('chatId');
    const accessToken = c.req.header('Authorization')?.split(' ')[1];

    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data: authUser, error } = await supabase.auth.getUser(accessToken);
    if (error || !authUser.user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const messages = await kv.getByPrefix(`chat_message:${chatId}:`);
    const messagesList = messages.map(msg => msg.value).sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    return c.json({ messages: messagesList });

  } catch (error) {
    console.error('Get messages error:', error);
    return c.json({ error: `Server error getting messages: ${error.message}` }, 500);
  }
});

Deno.serve(app.fetch);