import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 hover:-translate-y-1 h-full flex flex-col'>
                <div className='w-full justify-center mb-4 overflow-hidden rounded-xl h-48'>
                    <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                        className='rounded-xl w-full h-full object-cover transition-transform duration-300 hover:scale-105' />
                </div>
                <h2
                    className='text-lg font-bold text-slate-800 line-clamp-2'
                >{title}</h2>
            </div>
        </Link>
    )
}


export default PostCard