import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-12 bg-slate-50 min-h-screen">
            <Container>
                <div className="w-full max-w-4xl mx-auto">
                    <div className="w-full mb-8 relative border-4 border-white shadow-xl rounded-2xl overflow-hidden aspect-video">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                        {isAuthor && (
                            <div className="absolute top-4 right-4 flex space-x-2">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-500" className="shadow-lg backdrop-blur-sm bg-green-500/90 hover:bg-green-600">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-500" onClick={deletePost} className="shadow-lg backdrop-blur-sm bg-red-500/90 hover:bg-red-600">
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>

                    <article className="prose prose-lg prose-slate max-w-none bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
                        <h1 className="text-4xl font-extrabold mb-6 text-slate-900 leading-tight">{post.title}</h1>
                        <div className="browser-css text-slate-700 leading-relaxed">
                            {parse(post.content)}
                        </div>
                    </article>
                </div>
            </Container>
        </div>
    ) : null;
}