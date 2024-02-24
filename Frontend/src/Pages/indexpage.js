import { useEffect } from "react";
import Post from "../post";
import { useState } from "react";

export default function Indexpage(){
    const[posts,setPosts]=useState([]);
    useEffect(()=>{
        fetch('https://api-alpha-orcin-41.vercel.app/post').then(response=>{
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
