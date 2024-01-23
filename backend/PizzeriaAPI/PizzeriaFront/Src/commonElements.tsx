import axios, * as Axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as ReactDOM from 'react-dom';
import { Editor } from '@tinymce/tinymce-react';
import { KeyValueDto, MenuElementDto, SocialMediaDto, baseApiUrl, prepareSocialIcon } from './common';

export const PageWrapper = (props: { children?: any, className?: string }) => {
    const
        { children, className } = props,
        [data, setData] = useState()
    return <>

        <Header className={className} />
        <div className={["react-page-container", className + "-header"].join(" ")}>
            {children}
        </div>
        <Footer className={className} />
    </>
}

const Header = (props: { className?: string }) => {
    const
        [menuElements, setMenuElements] = useState<{ parent: MenuElementDto, children: MenuElementDto[] }[]>(),
        [phone, setPhone] = useState<KeyValueDto>(),
        [address, setAddress] = useState<KeyValueDto>(),
        [socials, setSocials] = useState<SocialMediaDto[]>(),
        [logo, setLogo] = useState<KeyValueDto>(),
        getMenuElements = async () => {
            let res = await axios.get(baseApiUrl + `/GetVisibleMenuElementList`)
            let obj = [] as any[]
            if (res.status == 200) {
                res.data.forEach((el: MenuElementDto) => {
                    if (el.parentMenuElementId < 0 || el.parentMenuElementId == null) {
                        obj.push({ parent: el, children: [] })
                    }

                })
                res.data.forEach((el: MenuElementDto) => {
                    if (el.parentMenuElementId > 0 || el.parentMenuElementId != null) {
                        let index = obj.findIndex((i: any) => i.parent.menuElementId == el.parentMenuElementId)
                        obj[index].children.push(el)
                    }
                })

                setMenuElements(obj)
            }
        },
        getPhone = async () => {
            let res = await axios.get(baseApiUrl + `/GetKeyValueByKey/phone`)
            setPhone(res.data)
        },
        getAddress = async () => {
            let res = await axios.get(baseApiUrl + `/GetKeyValueByKey/address`)
            setAddress(res.data)
        },
        getSocials = async () => {
            let res = await axios.get(baseApiUrl + `/GetAllMainSocialMedia`)
            setSocials(res.data)
        },
        getLogo = async () => {
            let res = await axios.get(baseApiUrl + `/GetKeyValueByKey/main_logo`)
            let t = res.data as KeyValueDto;
            let s = t.value.split("/")
            s[2] = "Full"
            t.value = s.join("/")
            setLogo(t)
        },
        mappedMenuElements = menuElements && menuElements.map((el: { parent: MenuElementDto, children: MenuElementDto[] }) => {
            return <li className="rd-nav-item">
                <a className="rd-nav-link" href={el.parent.link}>{el.parent.text}</a>
                <ul className='child-menu'>
                    {el.children.map((child: MenuElementDto, idx: number) => {
                        return <li className="child rd-nav-item">
                            <a className="rd-nav-link" href={child.link}>{child.text}</a>
                        </li>
                    })}
                </ul>
            </li>
        }).filter((i: any) => i),
        x = ""

    React.useEffect(() => {
        getMenuElements()
        getPhone()
        getAddress()
        getSocials()
        getLogo()
    }, [])

    return <>
        <header className={["section page-header", props.className + "-header"].join(" ")}>

            <div className="rd-navbar-wrap">
                <nav className="rd-navbar rd-navbar-modern" data-layout="rd-navbar-fixed" data-sm-layout="rd-navbar-fixed" data-md-layout="rd-navbar-fixed" data-md-device-layout="rd-navbar-fixed" data-lg-layout="rd-navbar-static" data-lg-device-layout="rd-navbar-fixed" data-xl-layout="rd-navbar-static" data-xl-device-layout="rd-navbar-static" data-xxl-layout="rd-navbar-static" data-xxl-device-layout="rd-navbar-static" data-lg-stick-up-offset="56px" data-xl-stick-up-offset="56px" data-xxl-stick-up-offset="56px" data-lg-stick-up="true" data-xl-stick-up="true" data-xxl-stick-up="true">
                    <div className="rd-navbar-inner-outer">
                        <div className="rd-navbar-inner">

                            <div className="rd-navbar-panel">

                                <button className="rd-navbar-toggle" data-rd-navbar-toggle=".rd-navbar-nav-wrap"><span></span></button>

                                <div className="rd-navbar-brand"><a className="brand" href="/"><img className="brand-logo-dark" src={baseApiUrl + logo?.value} alt="" width="198" height="66" /></a></div>
                            </div>
                            <div className="rd-navbar-right rd-navbar-nav-wrap">
                                <div className="rd-navbar-aside">
                                    <ul className="rd-navbar-contacts-2">
                                        <li>
                                            <div className="unit unit-spacing-xs">
                                                <div className="unit-left"><span className="icon mdi mdi-phone"></span></div>
                                                <div className="unit-body"><a className="phone" href={`tel:${phone?.value}`}>{phone?.value}</a></div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="unit unit-spacing-xs">
                                                <div className="unit-left"><span className="icon mdi mdi-map-marker"></span></div>
                                                <div className="unit-body"><a className="address" href="#">{address?.value}</a></div>
                                            </div>
                                        </li>
                                    </ul>
                                    <ul className="list-share-2">
                                        {socials?.map((social: SocialMediaDto, idx: number) => {
                                            let iconClass = prepareSocialIcon(social.name.split("_"))
                                            return <li key={idx}><a className={["icon mdi", iconClass].join(" ")} href={social.link}></a></li>

                                        })}
                                    </ul>
                                </div>
                                <div className="rd-navbar-main">

                                    <ul className="rd-navbar-nav">
                                        <li className="rd-nav-item active">
                                            <a className="rd-nav-link" href="/">Home</a>
                                        </li>
                                        <li className="rd-nav-item">
                                            <a className="rd-nav-link" href="/About">About us</a>
                                        </li>
                                        {mappedMenuElements}

                                    </ul>
                                </div>
                            </div>
                            <div className="rd-navbar-project-hamburger rd-navbar-project-hamburger-open rd-navbar-fixed-element-1" data-multitoggle=".rd-navbar-inner" data-multitoggle-blur=".rd-navbar-wrap" data-multitoggle-isolate="data-multitoggle-isolate">
                                <div className="project-hamburger">
                                    <span className="project-hamburger-arrow"></span><span className="project-hamburger-arrow"></span><span className="project-hamburger-arrow"></span>
                                </div>
                            </div>
                            <div className="rd-navbar-project">
                                <div className="rd-navbar-project-header">
                                    <h5 className="rd-navbar-project-title">Gallery</h5>
                                    <div className="rd-navbar-project-hamburger rd-navbar-project-hamburger-close" data-multitoggle=".rd-navbar-inner" data-multitoggle-blur=".rd-navbar-wrap" data-multitoggle-isolate="data-multitoggle-isolate">
                                        <div className="project-close"><span></span><span></span></div>
                                    </div>
                                </div>
                                <div className="rd-navbar-project-content rd-navbar-content">
                                    <div>
                                        <div className="row gutters-20" data-lightgallery="group">
                                            <div className="col-6">

                                                <article className="thumbnail thumbnail-creative">
                                                    <a href="images/project-1-1200x800-original.jpg" data-lightgallery="item">
                                                        <div className="thumbnail-creative-figure">
                                                            <img src="images/project-1-195x164.jpg" alt="" width="195" height="164" />
                                                        </div>
                                                        <div className="thumbnail-creative-caption"><span className="icon thumbnail-creative-icon linearicons-magnifier"></span></div>
                                                    </a>
                                                </article>
                                            </div>
                                            <div className="col-6">

                                                <article className="thumbnail thumbnail-creative">
                                                    <a href="images/project-2-1200x800-original.jpg" data-lightgallery="item">
                                                        <div className="thumbnail-creative-figure">
                                                            <img src="images/project-2-195x164.jpg" alt="" width="195" height="164" />
                                                        </div>
                                                        <div className="thumbnail-creative-caption"><span className="icon thumbnail-creative-icon linearicons-magnifier"></span></div>
                                                    </a>
                                                </article>
                                            </div>
                                            <div className="col-6">

                                                <article className="thumbnail thumbnail-creative">
                                                    <a href="images/project-3-1200x800-original.jpg" data-lightgallery="item">
                                                        <div className="thumbnail-creative-figure">
                                                            <img src="images/project-3-195x164.jpg" alt="" width="195" height="164" />
                                                        </div>
                                                        <div className="thumbnail-creative-caption"><span className="icon thumbnail-creative-icon linearicons-magnifier"></span></div>
                                                    </a>
                                                </article>
                                            </div>
                                            <div className="col-6">

                                                <article className="thumbnail thumbnail-creative">
                                                    <a href="images/project-4-1200x800-original.jpg" data-lightgallery="item">
                                                        <div className="thumbnail-creative-figure">
                                                            <img src="images/project-4-195x164.jpg" alt="" width="195" height="164" />
                                                        </div>
                                                        <div className="thumbnail-creative-caption"><span className="icon thumbnail-creative-icon linearicons-magnifier"></span></div>
                                                    </a>
                                                </article>
                                            </div>
                                            <div className="col-6">

                                                <article className="thumbnail thumbnail-creative">
                                                    <a href="images/project-5-1200x800-original.jpg" data-lightgallery="item">
                                                        <div className="thumbnail-creative-figure">
                                                            <img src="images/project-5-195x164.jpg" alt="" width="195" height="164" />
                                                        </div>
                                                        <div className="thumbnail-creative-caption"><span className="icon thumbnail-creative-icon linearicons-magnifier"></span></div>
                                                    </a>
                                                </article>
                                            </div>
                                            <div className="col-6">

                                                <article className="thumbnail thumbnail-creative">
                                                    <a href="images/project-6-1200x800-original.jpg" data-lightgallery="item">
                                                        <div className="thumbnail-creative-figure">
                                                            <img src="images/project-6-195x164.jpg" alt="" width="195" height="164" />
                                                        </div>
                                                        <div className="thumbnail-creative-caption"><span className="icon thumbnail-creative-icon linearicons-magnifier"></span></div>
                                                    </a>
                                                </article>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    </>
}

const Footer = (props: { className?: string }) => {
    return <>
        <footer className={["section footer-modern context-dark footer-modern-2", props.className].join(" ")}>
            <div className="footer-modern-line">
                <div className="container">
                    <div className="row row-50">
                        <div className="col-md-6 col-lg-4">
                            <h5 className="footer-modern-title oh-desktop"><span className="d-inline-block wow slideInLeft">What We Offer</span></h5>
                            <ul className="footer-modern-list d-inline-block d-sm-block wow fadeInUp">
                                <li><a href="#">Pizzas</a></li>
                                <li><a href="#">Burgers</a></li>
                                <li><a href="#">Salads</a></li>
                                <li><a href="#">Drinks</a></li>
                                <li><a href="#">Seafood</a></li>
                                <li><a href="#">Drinks</a></li>
                            </ul>
                        </div>
                        <div className="col-md-6 col-lg-4 col-xl-3">
                            <h5 className="footer-modern-title oh-desktop"><span className="d-inline-block wow slideInLeft">Information</span></h5>
                            <ul className="footer-modern-list d-inline-block d-sm-block wow fadeInUp">
                                <li><a href="about-us.html">About us</a></li>
                                <li><a href="#">Latest News</a></li>
                                <li><a href="#">Our Menu</a></li>
                                <li><a href="#">FAQ</a></li>
                                <li><a href="#">Shop</a></li>
                                <li><a href="contacts.html">Contact Us</a></li>
                            </ul>
                        </div>
                        {/* <div className="col-lg-4 col-xl-5">
                            <h5 className="footer-modern-title oh-desktop"><span className="d-inline-block wow slideInLeft">Newsletter</span></h5>
                            <p className="wow fadeInRight">Sign up today for the latest news and updates.</p>
                            
                            <form className="rd-form rd-mailform rd-form-inline rd-form-inline-sm oh-desktop" data-form-output="form-output-global" data-form-type="subscribe" method="post" action="bat/rd-mailform.php">
                                <div className="form-wrap wow slideInUp">
                                    <input className="form-input" id="subscribe-form-2-email" type="email" name="email" />
                                    <label className="form-label" for="subscribe-form-2-email">Enter your E-mail</label>
                                </div>
                                <div className="form-button form-button-2 wow slideInRight">
                                    <button className="button button-sm button-icon-3 button-primary button-winona" type="submit"><span className="d-none d-xl-inline-block">Subscribe</span><span className="icon mdi mdi-telegram d-xl-none"></span></button>
                                </div>
                            </form>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="footer-modern-line-2">
                <div className="container">
                    <div className="row row-30 align-items-center">
                        <div className="col-sm-6 col-md-7 col-lg-4 col-xl-4">
                            <div className="row row-30 align-items-center text-lg-center">
                                <div className="col-md-7 col-xl-6"><a className="brand" href="index.html"><img src="images/logo-inverse-198x66.png" alt="" width="198" height="66" /></a></div>
                                <div className="col-md-5 col-xl-6">
                                    <div className="iso-1"><span><img src="images/like-icon-58x25.png" alt="" width="58" height="25" /></span><span className="iso-1-big">9.4k</span></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-12 col-lg-8 col-xl-8 oh-desktop">
                            <div className="group-xmd group-sm-justify">
                                <div className="footer-modern-contacts wow slideInUp">
                                    <div className="unit unit-spacing-sm align-items-center">
                                        <div className="unit-left"><span className="icon icon-24 mdi mdi-phone"></span></div>
                                        <div className="unit-body"><a className="phone" href="tel:#">+1 718-999-3939</a></div>
                                    </div>
                                </div>
                                <div className="footer-modern-contacts wow slideInDown">
                                    <div className="unit unit-spacing-sm align-items-center">
                                        <div className="unit-left"><span className="icon mdi mdi-email"></span></div>
                                        <div className="unit-body"><a className="mail" href="mailto:#">info@demolink.org</a></div>
                                    </div>
                                </div>
                                <div className="wow slideInRight">
                                    <ul className="list-inline footer-social-list footer-social-list-2 footer-social-list-3">
                                        <li><a className="icon mdi mdi-facebook" href="#"></a></li>
                                        <li><a className="icon mdi mdi-twitter" href="#"></a></li>
                                        <li><a className="icon mdi mdi-instagram" href="#"></a></li>
                                        <li><a className="icon mdi mdi-google-plus" href="#"></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-modern-line-3">
                <div className="container">
                    <div className="row row-10 justify-content-between">
                        <div className="col-md-6"><span>514 S. Magnolia St. Orlando, FL 32806</span></div>
                        <div className="col-md-auto">

                            <p className="rights"><span>&copy;&nbsp;</span><span className="copyright-year"></span><span></span><span>.&nbsp;</span><span>All Rights Reserved.</span><span> Design&nbsp;by&nbsp;<a href="https://www.templatemonster.com">TemplateMonster</a></span></p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    </>
}