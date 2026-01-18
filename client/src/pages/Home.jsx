import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    if (posts.length === 0) {
        return (
            <div className="w-full py-16 mt-4 text-center">
                <Container>
                    <div className="flex flex-col items-center justify-center min-h-[400px] bg-slate-100 rounded-3xl p-8 border border-white/20 shadow-inner">
                        <div className="max-w-xl">
                            <h1 className="text-4xl font-extrabold text-slate-900 mb-6">
                                Welcome to the Community
                            </h1>
                            <p className="text-xl text-slate-600 mb-8">
                                Login to explore amazing stories and share your own.
                            </p>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-12 bg-slate-50 min-h-screen'>
            <Container>
                {/* Hero Section */}
                <div className="mb-12 text-center md:text-left space-y-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                        Discover & Share <span className="text-primary">Stories</span>
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl">
                        A community-driven platform to write, read, and connect. Explore the latest posts from our creators below.
                    </p>
                    <hr className="border-slate-200 mt-8" />
                </div>

                {/* Posts Grid */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Latest Posts</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                        {posts.map((post) => (
                            <div key={post.$id} className='transform hover:-translate-y-1 transition-transform duration-300'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Home