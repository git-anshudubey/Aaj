import conf from '../conf.js';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create({
                userId: ID.unique(),
                email,
                password,
                name
            });
            if (userAccount) {
                //call the another login method, this is just the functionality , it could be anything
                return this.login({ email, password })
            } else {
                return userAccount;
            }
        } catch {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession({ email, password });
        } catch (error) {
            throw error;
        }
    }

    async logout() {
        try {
            await this.account.deleteSession({
                sessionId: 'current'
            })
            {/* we can also do await this.account.deleteSessions()*/ }
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }

    async getCurrentUser() {
        try {
            await this.account.get()
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
        return null;
    }
}

const authService = new AuthService();

export default authService;