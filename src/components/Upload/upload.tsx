import React, { FC, ChangeEvent, useRef, useState, useEffect } from "react";
import axios from "axios";
import Button from "../Button/button";
import UploadList from "./uploadList";
interface UploadProps {
  action: string;
  onSuccess?: (result: string, file: File) => void;
  onError?: (err: string, file: File) => void;
  onProgress?: (percent: number, file: File) => void;
  onChange?: (file: File) => void;
  onRemove?: (file: UploadFile) => void;
  defaultFileList?: UploadFile[];
}

type UploadStatus = "error" | "success" | "ready" | "uploading";
export interface UploadFile {
  name?: string;
  size?: number;
  uid?: string;
  status?: UploadStatus;
  percent?: number;
  response?: any;
  error?: any;
}
export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    onSuccess,
    onError,
    onProgress,
    onChange,
    onRemove,
    defaultFileList,
  } = props;
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    inputRef.current && inputRef.current.click();
  };
  const postFiles = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + "file-upload",
      name: file.name,
      size: file.size,
      percent: 0,
      status: "ready",
    };
    setFileList([_file, ...fileList]);
    let formData = new FormData();
    formData.append("file", file);
    axios
      .post(action, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (e) => {
          let uploadPercent = Math.round((e.loaded * 100) / e.total) || 0;
          //是不是如果有进度条就应该更新进度条了。让我们去写一个数组存储当前文件的所有状态
          updateFile(_file, { status: "uploading", percent: uploadPercent });
          onProgress && onProgress(uploadPercent, file);
        },
      })
      .then((res) => {
        updateFile(_file, { status: "success", response: res.data });
        onSuccess && onSuccess(res.data, file);
      })
      .catch((err) => {
        updateFile(_file, { status: "error", error: err });
        onError && onError(err, file);
      })
      .finally(() => {
        onChange && onChange(file);
      });
  };
  const updateFile = (_file: UploadFile, fileObj: Partial<UploadFile>) => {
    setFileList((preFileList) =>
      preFileList.map((file) => {
        if (file.uid === _file.uid) {
          return { ...file, ...fileObj };
        } else {
          return file;
        }
      })
    );
  };
  useEffect(() => {
    console.log("filelist", fileList);
  }, [fileList]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    let files = e.target.files;
    // postFiles(files)
    if (!files) {
      return;
    }
    Array.from(files).forEach((file) => {
      postFiles(file);
    });
  };
  const handleRemove = (_file: UploadFile) => {
    setFileList((preFileList) =>
      preFileList.filter((file) => {
        return file.uid !== _file.uid;
      })
    );
  };
  return (
    <div>
      <Button btnType="primary" onClick={handleClick}>
        upload
      </Button>
      <input
        type="file"
        onChange={handleChange}
        className="xdf-input-file"
        ref={inputRef}
        style={{ display: "none" }}
      ></input>
      <UploadList fileList={fileList} onRemove={handleRemove}></UploadList>
    </div>
  );
};
Upload.defaultProps = {};
export default Upload;
