import Image from 'next/image';
import  ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import PostHeader from './post-header';

import classes from './post-content.module.css';


function PostContent(props) {
  const {post} = props
  const imagePath =  `/images/posts/${post.slug}/${post.image}`;
  
  const customeRenders = {
    // image(image) {
    //   return (
    //     <Image
    //       src={`/images/posts/${post.slug}/${image.src}`}
    //       alt={image.alt}
    //       width={600}
    //       height={300}
    //     />
    //   );
    // },
    p(pragraph){
      const { node } = pragraph;
      if(node.children[0].tagName === 'img'){
        const image = node.children[0];
        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post.slug}/${image.properties.src}`}
              alt={image.properties.alt}
              width={600}
              height={300}
            />
          </div>
        )
      }
      return <p>{pragraph.children}</p>
    },
    code(code) {
      const {className, children} = code;
      const language = className.split('-')[1]; // className is something like language-js => We need the "js" part here
      return (
        <SyntaxHighlighter 
          style={atomDark} 
          language={language} 
          children={children} 
        />
      )
    }
  }

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customeRenders}>
        {post.content}
      </ReactMarkdown>
    </article>
  )
}

export default PostContent