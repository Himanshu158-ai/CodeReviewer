import React, { useState } from 'react'
import { FaHome } from "react-icons/fa";
import { LiaFreeCodeCamp } from "react-icons/lia";
import { SiCodeceptjs } from "react-icons/si";
import { LuSend } from "react-icons/lu";
import axios from 'axios'
import Markdown from 'react-markdown'
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import { MdCompare } from "react-icons/md";
import Loader from './loader';

import './App.css'
import { useEffect } from 'react';

export const App = () => {
  const [output, setoutput] = useState(``)
  const [prompt, setprompt] = useState(``)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  async function handleClick() {
    setLoading(true);
    try {
      const response = await axios.post('https://codereviewer-o67m.onrender.com/ai/generate', {
        prompt: prompt
      });
      setoutput(response.data);
    } catch (error) {
      console.error("There was an error!", error);
      setoutput(error.message);
      // console.log("Server is not running");
    } finally {
      setLoading(false); // loader band
    }
  }

  return (
    <div className="container">
      <div className="left">
        <SiCodeceptjs size={45} color="white" />
        <div className="home">
          <div className="second">
            <FaHome className="fahome" size={20} />
            <p>Home</p>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="otuput">
          {loading ? (<Loader className="loa" />) :
            <SyntaxHighlighter
              className="code-highlighter"
              language="javascript"
              style={oneDark}
              customStyle={{
                borderRadius: "8px",
                padding: "1em",
                fontSize: "1rem",
                lineHeight: "1.5",
                overflowX: "auto",
                width: "100%",
                height: "100%",
              }}
              wrapLongLines={true}
            >
              {output}
            </SyntaxHighlighter>
          }

        </div>
        <div className="input">
          <input type="text" placeholder="Paste your code for review." onChange={(e) => {
            setprompt(e.target.value);
          }} />
          <div className="btns">
            <button onClick={handleClick}>Review</button>
          </div>
        </div>
      </div>
    </div>
  )
}
