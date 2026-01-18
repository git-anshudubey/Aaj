import React from 'react'
import { Container, PostForm } from '../components'

function AddPost() {
    return (
        <div className='py-12 bg-slate-50 min-h-screen'>
            <Container>
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Create New Post</h1>
                    <p className="text-slate-600 mt-2">Share your thoughts with the world.</p>
                </div>
                <PostForm />
            </Container>
        </div>
    )
}

export default AddPost