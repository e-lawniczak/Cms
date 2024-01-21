import * as Axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as ReactDOM from 'react-dom';

export const PictureListElement = (props: { item: PictureDto, onClick?: any, [x: string]: any }) => {
  const { item, onClick } = props;
  return <div className='picture-list-element' onClick={onClick}>
    <Image src={item.link} item={item} />
  </div>
}
export const sortFunc = (a: any, b: any, key?: string) => {
  if (!key) {
    return b.id - a.id
  } else {
    return b[key] - a[key]
  }
}
export function Select(props: { register: any, data: any, name: any, selectProps?: any, defaultValue?: any }) {
  const { name, data, register, selectProps, defaultValue = null } = props,
    isSelected = (item: any, value: any) => {
      let flag = false;
      if (selectProps?.multiple) {
        value.forEach((i: any) => {
          if (i == item.value) flag = true
        });
        return flag
      } else {
        return item.value == value
      }
    }

  return (
    <select className='select-comp' {...register(name)} {...selectProps}>
      {data.map((item: any, idx: any) => (
        <option key={idx} value={item.value} selected={isSelected(item, defaultValue)}>
          {item.label}
        </option>
      ))}
    </select>
  );
}

export const PageSettingsSection = (props: { className?: any, title?: any, subtext?: any, children?: any, }) => {
  return <section className={["card settings-section", props.className || ""].join(" ")}>
    {props.title && <div className="section-title">{props.title}</div>}
    {props.subtext && <div className="section-subtext">{props.subtext}</div>}
    <div className="section-content">
      {props.children}
    </div>
  </section>
}

export const PageWrapper = (props: { children?: any, className?: string }) => {
  return <div className={["react-page", props.className || ""].join(" ")}>
    {props.children}
  </div>
}
export interface BannerDto {
  id: number,
  title: string,
  text: string,
  subText: string,
  link: string,
  isVisible: boolean,
  pictureIdList: any[],
  sliderId: number
}
export interface SliderDto {
  sliderId: number,
  name: string,
  isVisible: boolean,
  bannerIdList: any[]
}
export interface MenuElementDto {
  menuElementId: number,
  text: string,
  link: string,
  isVisible: boolean,
  parentMenuElementId: number
}
export interface TeamMemberDto {
  id: number,
  isVisible: boolean,
  pictureIdList: any[],
  firstName: string,
  lastName: string,
  roleId: 0,
  socialMediaIdList: any[]
}
export interface KeyValueDto {
  id: number,
  key: string,
  value: string,

}
export interface SocialMediaDto {
  id: any,
  name: string,
  link: string,
  isMain: any,
  teamMemberId: any,
  isVisible: boolean,
  pictureIdList: any[]
}
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
  onImageClick?: (item?: PictureDto, e?: any) => void;
  item?: PictureDto
  src: string
  imageClass?: string
  [x: string]: any
}

export const Image = (props: ImageProps) => {
  const
    { imageClass, src, onImageClick = () => { }, item } = props;
  return <div className={['img-container', imageClass || ""].join(" ")} onClick={(e) => onImageClick(item, e)}>
    <img src={src} />
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
  return <div className={['input-wrapper', wrapperClass || ""].join(" ")}>
    <input {...register} className={['input-field', inputClass || ""].join(" ")} {...inputProps} />
  </div>
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
export const mapObjectToSelect = (object: any, keyLabel: any, valueLabel: any) => {
  let retObj = [] as { label: string, value: any }[]
  object?.forEach((item: any, idx: any) => {
    retObj.push({ label: item[keyLabel], value: item[valueLabel] })
  });
  return retObj;
}

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