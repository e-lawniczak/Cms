import * as Axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as ReactDOM from 'react-dom';
import { Editor } from '@tinymce/tinymce-react';


export const prepareSocialIcon = (name: string[]) => {
    let key = name[name.length - 1]
    switch (key) {
        case "fb":
            return "mdi-facebook";
        case "x":
            return "mdi-twitter";
        case "insta":
            return "mdi-instagram";
        case "google":
            return "mdi-google-plus";
        default:
            return "mdi-cloud";
    }
}
export const prepareCategoryIcon = (name: string[]) => {
    let key = name[name.length - 1].toLocaleLowerCase()
    switch (key) {
        case "salads":
            return "linearicons-leaf";
        case "pizza":
            return "linearicons-pizza";
        case "burgers":
            return "linearicons-hamburger";
        case "desserts":
            return "linearicons-ice-cream";
        case "drinks":
            return "linearicons-coffe-cup";
        case "seafood":
            return "linearicons-steak";
        default:
            return "linearicons-dagger";
    }
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
    roleId: number,
    name: string,
    isVisible: boolean,
    teamMemberIdList: number[],
    testimonialIdList: number[]
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