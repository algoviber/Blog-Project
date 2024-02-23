import { useEffect } from "react";
import Post from "../post";
import { useState } from "react";

export default function Indexpage(){
    const[posts,setPosts]=useState([]);
    useEffect(()=>{
        fetch('https://blog-api-back.vercel.app/post').then(response=>{
            response.json().then(posts=>{
            setPosts(posts);
            });
        });
    },[]);
    return (
        <>
            {posts.length > 0 && posts.map(post => (
                <Post {...post}/>
            ))}
        </>
    );
}
