const request = require('supertest');
const server = require('../server');

describe('Testing user authentication and management endpoints', () => {
    it('should successfully sign up a new user', async () => {
        const res = await request(server)
            .post('/signup')
            .send({ email: 'newuser@example.com', password: 'securepass123' });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('user');
    });

    it('should successfully log in an existing user with correct credentials', async () => {
        const res = await request(server)
            .post('/login')
            .send({ email: 'newuser@example.com', password: 'securepass123' });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'Login successful');
    });

    it('should return 404 for a non-existing user during login', async () => {
        const res = await request(server)
            .post('/login')
            .send({ email: 'nonexistent@example.com', password: 'invalidpassword' });
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('error', 'User not found');
    });

    it('should return 401 for incorrect password during login', async () => {
        const res = await request(server)
            .post('/login')
            .send({ email: 'newuser@example.com', password: 'wrongpassword' });
        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('error', 'Invalid password');
    });

    it('should retrieve user information for a valid user ID', async () => {
        const userId = 1;
        const res = await request(server)
            .get(`/users/${userId}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('user');
        expect(res.body.user.id).toBe(userId);
    });

    it('should return 404 for an invalid user ID during user information retrieval', async () => {
        const invalidUserId = 9999;
        const res = await request(server)
            .get(`/users/${invalidUserId}`);
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('error', 'User not found');
    });

    it('should update user details for a valid user ID', async () => {
        const userId = 1;
        const updatedEmail = 'updateduser@example.com';
        const updatedPassword = 'updatedpass123';
        const res = await request(server)
            .put(`/users/${userId}`)
            .send({ email: updatedEmail, password: updatedPassword });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('user');
        expect(res.body.user.email).toBe(updatedEmail);
    });

    it('should delete user account for a valid user ID', async () => {
        const userId = 1;
        const res = await request(server)
            .delete(`/users/${userId}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'User deleted successfully');
    });

    it('should return 404 for an invalid user ID during user deletion', async () => {
        const invalidUserId = 9999;
        const res = await request(server)
            .delete(`/users/${invalidUserId}`);
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('error', 'User not found');
    });
});

describe('Testing messaging functionality', () => {
    it('should send a message successfully and cache it', async () => {
        const senderId = 1;
        const receiverId = 2;
        const messageContent = 'This is a test message';
        const res = await request(server)
            .post('/messages')
            .send({ senderId, receiverId, messageContent });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('message', 'Message sent successfully');
    });

    it('should return 400 if senderId or receiverId is missing', async () => {
        const res = await request(server)
            .post('/messages')
            .send({ messageContent: 'Test message content' });
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error', 'senderId or receiverId is missing');
    });

    it('should return 400 if messageContent is empty', async () => {
        const res = await request(server)
            .post('/messages')
            .send({ senderId: 1, receiverId: 2, messageContent: '' });
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error', 'messageContent cannot be empty');
    });

    it('should return 404 if senderId or receiverId does not exist', async () => {
        const res = await request(server)
            .post('/messages')
            .send({ senderId: 999, receiverId: 888, messageContent: 'Test message content' });
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('error', 'Sender or receiver not found');
    });
});
