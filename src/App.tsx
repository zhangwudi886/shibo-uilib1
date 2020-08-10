import React, { ChangeEvent, MouseEvent } from "react";
import logo from "./logo.svg";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import Button from "./components/Button/button";
import Icon from "./components/Icon/icon";
import Upload, { UploadFile } from "./components/Upload/upload";
library.add(fas);
function App() {
  const onSuccess = (data: string, file: File) => {
    console.log("上传成功的回调", data, file);
  };
  const onError = (data: string, file: File) => {
    console.log("上传失败的回调", data, file);
  };
  const onChange = (file: File) => {
    console.log("状态改变的回调", file);
  };
  const defaultFileList: UploadFile[] = [
    {
      name: "react牛逼plus.png",
      percent: 0,
      size: 17996,
      status: "uploading",
      uid: "1597024113200file-upload",
    },
    {
      name: "react牛逼plus.png",
      percent: 0,
      size: 17996,
      status: "error",
      uid: "1597024113201file-upload",
    },
    {
      name: "react牛逼plus.png",
      percent: 0,
      size: 17996,
      status: "success",
      uid: "1597024113203file-upload",
    },
    {
      name: "react牛逼plus.png",
      percent: 62,
      size: 17996,
      status: "ready",
      uid: "1597024113204file-upload",
    },
  ];
  return (
    <div className="App">
      <header className="App-header">
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          onSuccess={onSuccess}
          onError={onError}
          onChange={onChange}
          defaultFileList={defaultFileList}
        ></Upload>
      </header>
    </div>
  );
}

export default App;
