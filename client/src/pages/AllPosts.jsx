import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";

import { Link } from 'react-router-dom'
import { Button } from '../components'

function AllPosts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    return (
        <div className='w-full py-12 bg-slate-50 min-h-screen'>
            <Container>
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">All Posts</h1>
                        <p className="text-slate-600 mt-2">Manage and view all community posts.</p>
                    </div>
                    <Link to="/add-post">
                        <Button className="shadow-lg shadow-secondary/30 hover:shadow-secondary/50 bg-secondary hover:bg-secondary/90 text-white font-semibold px-6 py-2.5">
                            + Create Post
                        </Button>
                    </Link>
                </div>

                {posts.length > 0 ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                        {posts.map((post) => (
                            <div key={post.$id} className=''>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100">
                        <p className="text-xl text-slate-500 mb-6">No posts found yet.</p>
                        <Link to="/add-post">
                            <Button className="bg-primary text-white hover:bg-primary/90">
                                Create the first post
                            </Button>
                        </Link>
                    </div>
                )}
            </Container>
        </div>
    )
}

export default AllPosts