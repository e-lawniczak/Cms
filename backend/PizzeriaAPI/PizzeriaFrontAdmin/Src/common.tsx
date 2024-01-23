import * as Axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as ReactDOM from 'react-dom';
import { Editor } from '@tinymce/tinymce-react';


export const PictureListElement = (props: { item: PictureDto, onClick?: any, [x: string]: any }) => {
  const { item, onClick, src } = props;
  return <div className='picture-list-element' onClick={onClick}>
    <Image src={src || baseApiUrl + `/GetPicture/Mini/${item.pictureId}`} item={item} />
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
      if (!defaultValue) return false
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
export const PEditor = (props: { controlname: string, formEls: { setValue: any, getValues: any }, register: any, editorProps: any }) => {
  const { controlname, editorProps, register, formEls: { getValues, setValue } } = props
  const editorRef = React.useRef(null);
  const log = () => {
    if (editorRef.current) {
      setValue(controlname, editorRef.current.getContent())
    }
  }
  return <Editor
    {...register}
    apiKey='no-api-key'
    onInit={(evt, editor) => editorRef.current = editor}
    initialValue={getValues(controlname)}
    onEditorChange={log}
    init={{
      height: 500,
      menubar: false,
      plugins: [
        'a11ychecker', 'advlist', 'advcode', 'advtable', 'autolink', 'checklist', 'export',
        'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
        'powerpaste', 'fullscreen', 'formatpainter', 'insertdatetime', 'media', 'table', 'help', 'wordcount', 'code'
      ],
      toolbar: 'undo redo | casechange blocks | bold italic backcolor | ' +
        'alignleft aligncenter alignright alignjustify | ' +
        'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
    }}
    {...editorProps}
  />
}
export const PageWrapper = (props: { children?: any, className?: string }) => {
  return <div className={["react-page", props.className || ""].join(" ")}>
    {props.children}
  </div>
}
export interface PageDto {
  id: number,
  title: string,
  content: string,
  isVisible: boolean,
  pictureIdList: number[]
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
export interface ContactInfoDto {
  id: number,
  isVisible: boolean,
  text: string,
  pictureIdList: number[]
}
export interface TabSliderDto {
  id: number,
  isVisible: boolean,
  title: string,
  informationTabIdList: any[],
  pictureIdList: any[]
}
export interface InformationTabDto {
  informationTabId: number,
  title: string,
  text: string,
  buttonText: string,
  isVisible: boolean,
  tabSliderId: number
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
export interface TestimonialDto {
  id: number,
  isVisible: boolean,
  firstName: string,
  lastName: string,
  text: string,
  roleId: number,
  pictureIdList: any[]

}
export interface GalleryDto {
  name: string,
  mainText: string,
  subText: string,
  id: number,
  isVisible: boolean,
  pictureIdList: any[]
}
export interface RoleDto {

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
export interface ProductDto {
  name: string,
  price: number,
  description: string,
  discountPrice: number,
  score: number,
  isRecommended: boolean,
  categoryId: number,
  id: number,
  isVisible: boolean,
  pictureIdList: any[]
}
export interface CategoryDto {
  id: number,
  isVisible: boolean,
  name: string,
  link: string,
  productIdList: any,
  pictureIdList: any
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
  headers: { Authorization: `Bearer ${getCookie("token")}` }

}

export const testFunc = () => {
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