import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaCss3, FaHeart, FaHtml5, FaJs } from "react-icons/fa6";
import { FcSettings } from "react-icons/fc";
import SplitPane, { Pane } from "react-split-pane";
import { Logo } from "../assets";
import { useSelector } from "react-redux";
import { Alert, UserProfileDetails } from "../components";
import { AnimatePresence, motion } from "framer-motion";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { MdCheck, MdOutlineEdit } from "react-icons/md";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase.config";
import { Link, useNavigate, useParams } from "react-router-dom";

const ViewProject = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [output, setOutput] = useState("");
  const [title, setTitle] = useState("Untitled");
  const [isTitle, setIsTitle] = useState(false);
  const [alert, setAlert] = useState(false);

  const user = useSelector((state) => state.user?.user);
  const projects = useSelector((state) => state.projects?.projects);

  const [project, setProject] = useState(null);

  const { projectId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    updateOutput();
  }, [html, css, js]);

  useEffect(() => {
    if (projects && projectId) {
      setProject(projects?.find((project) => project.id === projectId));
      if (project) {
        console.log(project?.html);
        setHtml(project?.html);
        setCss(project?.css);
        setJs(project?.js);
        setOutput(project?.output);
      }
    }
  }, [projectId, project]);

  const updateOutput = () => {
    // Create the combined output
    const combinedOutput = `
      <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${js}</script>
      </body>
      </html>
    `;
    setOutput(combinedOutput);
  };

  const saveProgram = async () => {
    const _doc = {
      html: html,
      css: css,
      js: js,
      output: output,
    };

    console.log(_doc);

    await updateDoc(doc(db, "Projects", project?.id), _doc)
      .then((res) => {
        setAlert(true);
      })
      .catch((err) => console.log(err));
    setInterval(() => {
      setAlert(false);
    }, 3000);
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-col items-start justify-start overflow-hidden">
        <AnimatePresence>
          {alert && <Alert status={"Success"} alertMsg={"Project Saved..."} />}
        </AnimatePresence>
        <header className="w-full flex items-center justify-between px-12 py-4 ">
          <div className="flex items-center justify-center gap-6">
            <Link to={"/home/projects"}>
              <img className="w-32 h-auto object-contain" src={Logo} />
            </Link>
            <div className="flex flex-col items-start justify-start">
              {/* title */}
              <div className="flex items-center justify-center gap-3">
                <motion.p
                  key={"TitleLabel"}
                  className="px-3 py-2  text-white text-lg"
                >
                  {project?.title}
                </motion.p>
              </div>
              <div className="flex items-center justify-center px-3 -mt-2 gap-2">
                <p className="text-primaryText text-sm">
                  {project?.user?.displayName
                    ? project?.user?.displayName
                    : `${project?.user.email.split("@")[0]}`}
                </p>
                <motion.p
                  whileTap={{ scale: 0.9 }}
                  className="text-[10px] bg-emerald-500 rounded-sm px-2 py-[1px] text-primary font-semibold cursor-pointer hover:shadow-md hover:shadow-emerald-500"
                >
                  + Follow
                </motion.p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4">
            {project?.user?.uid === user?.uid && (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={saveProgram}
                className="px-4 py-4 bg-primaryText rounded-xl cursor-pointer text-base text-primary font-semibold"
              >
                Update
              </motion.button>
            )}
            {user && <UserProfileDetails />}
          </div>
        </header>

        <div>
          <SplitPane
            split="horizontal"
            minSize={100}
            maxSize={-100}
            defaultSize={"50%"}
          >
            <SplitPane split="vertical" minSize={500}>
              {/* html code */}
              <div className="w-full h-full flex flex-col items-start justify-start">
                <div className="w-full flex items-center justify-between">
                  <div className="bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3">
                    <FaHtml5 className="text-xl text-red-500" />
                    <p className="text-primaryText font-semibold border-t-gray-500">
                      HTML
                    </p>
                  </div>
                  <div className="cursor-pointer flex items-center justify-center gap-4 px-4">
                    <FcSettings className="text-xl" />
                    <FaChevronDown className="text-xl text-primaryText" />
                  </div>
                </div>

                <div className="w-full px-2">
                  <CodeMirror
                    value={html}
                    extensions={[javascript({ jsx: true })]}
                    height="600px"
                    theme="dark"
                    onChange={(value, viewUpdate) => {
                      // console.log("value:", value);
                      setHtml(value);
                    }}
                  />
                </div>
              </div>
              <SplitPane split="vertical" minSize={500}>
                {/* css code */}
                <div className="w-full h-full flex flex-col items-start justify-start">
                  <div className="w-full flex items-center justify-between">
                    <div className="bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3">
                      <FaCss3 className="text-xl text-sky-500" />
                      <p className="text-primaryText font-semibold border-t-gray-500">
                        CSS
                      </p>
                    </div>
                    <div className="cursor-pointer flex items-center justify-center gap-4 px-4">
                      <FcSettings className="text-xl" />
                      <FaChevronDown className="text-xl text-primaryText" />
                    </div>
                  </div>

                  <div className="w-full px-2">
                    <CodeMirror
                      value={css}
                      height="600px"
                      extensions={[javascript({ jsx: true })]}
                      theme="dark"
                      onChange={(value, viewUpdate) => {
                        //   console.log("value:", value);
                        setCss(value);
                      }}
                    />
                  </div>
                </div>
                {/* js code */}
                <div className="w-full h-full flex flex-col items-start justify-start">
                  <div className="w-full flex items-center justify-between">
                    <div className="bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3">
                      <FaJs className="text-xl text-yellow-500" />
                      <p className="text-primaryText font-semibold border-t-gray-500">
                        JS
                      </p>
                    </div>
                    <div className="cursor-pointer flex items-center justify-center gap-4 px-4">
                      <FcSettings className="text-xl" />
                      <FaChevronDown className="text-xl text-primaryText" />
                    </div>
                  </div>

                  <div className="w-full px-2">
                    <CodeMirror
                      height="600px"
                      value={js}
                      extensions={[javascript({ jsx: true })]}
                      theme="dark"
                      onChange={(value, viewUpdate) => {
                        //   console.log("value:", value);
                        setJs(value);
                      }}
                    />
                  </div>
                </div>
              </SplitPane>
            </SplitPane>

            <div
              className="bg-white"
              style={{ overflow: "hidden", height: "100%" }}
            >
              <iframe
                title="Result"
                srcDoc={output}
                style={{ border: "none", width: "100%", height: "100%" }}
              />
            </div>
          </SplitPane>
        </div>
      </div>
    </>
  );
};

export default ViewProject;
