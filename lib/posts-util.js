import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(),'posts')

function getPostData(fileName){
    //full path to the file we want to get data from
    const filePath = path.join(postsDirectory, fileName)

    //use this file path for reacding the content of that file
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    /*in the file we have the meta data and the actual content, nodejs will extracte all the file content to us 
    to spilt it up  we'll use gray matther package 
    */
   //matter will return an obj with two properties
   //1- data property for meta data as a javascript obj
   //2- content property - the actual content (the markdown text as a string)
    const {data, content }= matter(fileContent);

    //get the file name without the extension
    const postSlug = fileName.replace(/\.md$/,'') //removes the file extention
    const postData = {
        slug: postSlug,
        ...data,
        content,
    };

    return postData
}

export function getAllPosts() {
   const postFiles = fs.readdirSync(postsDirectory); //get all posts
    const allPosts = postFiles.map(postFile => {
        return getPostData(postFile)
    })

    const sortedPosts = allPosts.sort((postA, postB)=> postA.data > postB.data ? -1 : 1)

    return sortedPosts
}

export function getFeaturedPosts() {
    const allPosts = getAllPosts();
  
    const featuredPosts = allPosts.filter(post => post.isFeatured);
  
    return featuredPosts;
}