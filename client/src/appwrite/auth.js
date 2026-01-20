import conf from '../conf/conf';
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
            return await this.account.get();
        } catch (error) {
            // 401 is the expected error when a user is not logged in
            if (error.code !== 401) {
                console.log("Appwrite service :: getCurrentUser :: error", error);
            }
        }

        return null;
    }
}

const authService = new AuthService();

export default authService;