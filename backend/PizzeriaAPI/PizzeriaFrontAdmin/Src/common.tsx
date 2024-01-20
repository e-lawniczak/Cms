import * as Axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as ReactDOM from 'react-dom';

export const baseApiUrl = "https://localhost:7156";
export const axiosBaseConfig = {
  headers: {
    'Bearer': getCookie("token"),
  }
}

export const testFunc = () => {
  console.log("działasswss");
}



export const callApi = (method: "GET" | "POST" | "PATCH" | "DELETE", url: string, data: any) => {
  const callUrl = "https://localhost:7156" + url;

  let axiosObj = {
    method: method,
    url: callUrl,
  } as any;
  if (data != null)
    axiosObj.data = data;

}

export function getCookie(cname: any) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
// export interface PopupProps {
//   popupClass?: string
//   popupBody?: any,
//   popupHeader?: any,
//   popupFooter?: any,
//   children?: any,
//   closePopup: () => void
//   popupProps: {
//     [x: string]: any

//   }
//   [x: string]: any
// }
// export const Popup = (props: PopupProps) => {
//   const
//     { popupBody, popupClass, popupFooter, popupHeader, popupProps, children, closePopup } = props;
//   return <div id="popupElement" className="popup-overlay">
//     <div className={["popup", popupClass].join(" ")}>
//       { <div className="popup-header">{popupHeader &&<div className="header-content">{popupHeader}</div>}<div className="close" onClick={closePopup}>X</div></div>}
//       {popupBody && <div className="popup-body">{children}</div>}
//       {popupFooter && <div className="popup-footer">{popupFooter}</div>}
//     </div>
//   </div>
// }

export interface PictureDto {
  pictureId: any
  name: any
  link: any
  filePath: any
  resizedFilePath: any
  entityWithPictureIdList: any[]

}
export interface ImageProps {
  imageProps?: {
    [x: string]: any
  }
  onImageClick?: (item?: PictureDto, e?:any) => void;
  item?: PictureDto
  src: string
  imageClass?: string
  [x: string]: any
}
export const Image = (props: ImageProps) => {
  const
    { imageClass, src, onImageClick = () => {}, item } = props;
  return <div className={['img-container', imageClass].join(" ")} onClick={(e)=>onImageClick(item, e)}>
    <img src={src}  />
  </div>
}
export interface InputProps {
  register: any,
  inputProps: {
    [x: string]: any
  }
  inputClass?: string
  wrapperClass?: string
  [x: string]: any
}
export const PInput = (props: InputProps) => {
  const
    { register, inputClass, wrapperClass, inputProps } = props;
  return <div className={['input-wrapper', wrapperClass].join(" ")}>
    <input {...register} className={['input-field', inputClass].join(" ")} {...inputProps} />
  </div>
}