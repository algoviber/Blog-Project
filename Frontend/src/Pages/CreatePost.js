import Editor from "../Editor";
import { useState } from "react";
import { Navigate } from "react-router-dom";



export default function CreatePost(){
    const[title,setTitle] = useState('');
    const[summary,setSummary] = useState('');
    const[content,setContent] = useState('');
    const[files,setFiles] = useState('');
    const[redirect,setRedirect]=useState(false);
    async function createNewPost(ev){
        let uploadedImageUrl;
        const data = new FormData();
        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('file',files[0]);
        data.append('upload_preset','aryanblog');
        data.append('cloud_name','blogapparyan');

        ev.preventDefault();

        await fetch('https://api.cloudinary.com/v1_1/blogapparyan/image/upload', {
            method: 'post',
            body: data
        })
        .then((res)=> res.json())
        .then((data2)=>{
            //console.log(data2);
             uploadedImageUrl=data2.url;
        }).catch((err)=>{
            console.log(err)
        });
        
        data.set('url',uploadedImageUrl);
        
        const response = await fetch('https://blog-project-y3yj.onrender.com/post',{
           method: 'POST',
            body: data,
            credentials: 'include',
        });
        if(response.ok){
            setRedirect(true);
        }

    }

    if(redirect){
        return <Navigate to={'/'} />;
    }
    return(
        <form onSubmit={createNewPost}>
            <input type="title" placeholder={"Title"} value={title} onChange={ev => setTitle(ev.target.value)}/>
            <input type="summary" placeholder={"Summary"} value={summary} onChange={ev => setSummary(ev.target.value)}/>
            <input type="file"  onChange={ev => setFiles(ev.target.files)}/>
            <Editor value={content} onChange={setContent}/>
            <button style={{marginTop:'5px'}}>Create Post</button>
        </form>
    );
}
