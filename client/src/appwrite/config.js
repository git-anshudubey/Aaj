import conf from '../conf/conf.js'
import { Client, ID, Databases, Storage, Query } from 'appwrite';

export class Service {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);  //storage is bucket referred here. 
    }

    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
          return await this.databases.create(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            //ID.unique(),
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId,
            }
          )   
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateRows(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }

            )
            
        } catch (error) {
             console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.delete(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.get(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false;
        }

    }

    async getPosts(queries = [Query.equal('status', 'active')]){
        try {
            return await this.databases.list(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                // for the queries we have to create the indexes.
                //the query we have added as parameter can also be written here.

            )
            
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }

    //files functionalities on ./appwrite/files.js

    
}

const service = new Service();

export default service;