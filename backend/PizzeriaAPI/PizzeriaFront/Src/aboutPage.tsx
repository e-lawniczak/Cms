import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';

import { PageWrapper } from './commonElements';
import { InformationTabDto, KeyValueDto, RoleDto, SocialMediaDto, TabSliderDto, TeamMemberDto, baseApiUrl, getPictureUrlFromList, prepareSocialIcon } from './common';
import axios from 'axios';

export const AboutPage = () => {
    const
        [data, setData] = useState([])




    React.useEffect(() => {

    }, [])
    return <PageWrapper>
        <BannerSection />
        <InformationSliderSection />
        <BoxesSection />
        <OurTeamSection />
        <OurHistorySection />
        <WhatPeopleSay />
    </PageWrapper>
}

const BannerSection = () => {
    const
        [title, setTitle] = useState<KeyValueDto>(),
        [logoPic, setLogoPic] = useState<KeyValueDto>(),
        getTitle = async () => {
            let res = await axios.get(baseApiUrl + `/GetKeyValueByKey/au_title`)
            setTitle(res.data)
        },
        getBannerPic = async () => {
            let res = await axios.get(baseApiUrl + `/GetKeyValueByKey/about_us_banner`)
            let t = res.data as KeyValueDto;
            let s = t.value.split("/")
            s[2] = "Full"
            t.value = s.join("/")
            setLogoPic(t)
        }

    React.useEffect(() => {
        getTitle()
        getBannerPic()
    }, [])
    return <section className="bg-gray-7">
        <div className="breadcrumbs-custom box-transform-wrap context-dark">
            <div className="container">
                <h3 className="breadcrumbs-custom-title">{title?.value || "About Us"}</h3>
                <div className="breadcrumbs-custom-decor"></div>
            </div>
            <div className="box-transform" style={{ backgroundImage: `url(${baseApiUrl + logoPic?.value})` }}></div>
        </div>
        <div className="container">
            <ul className="breadcrumbs-custom-path">
                <li><a href="/">Home</a></li>
                <li className="active">{title?.value || "About Us"}</li>
            </ul>
        </div>
    </section>
}
const InformationSliderSection = () => {
    const
        [slider, setSlider] = useState<TabSliderDto>(),
        [mail, setMail] = useState<KeyValueDto>(),
        [tabs, setTabs] = useState<InformationTabDto[]>(),
        [currentTab, setCurrentTab] = useState(0),
        getMail = async () => {
            let res = await axios.get(baseApiUrl + `/GetKeyValueByKey/footer_email`)
            setMail(res.data)
        },
        getSlider = async () => {
            let res = await axios.get(baseApiUrl + `/GetKeyValueByKey/tabSlider_1`)
            if (res.status == 200) {
                res = await axios.get(baseApiUrl + `/GetTabSlider/${res.data.value}`)
                setSlider(res.data)

            }
        },
        getTabs = async () => {
            let res = await axios.get(baseApiUrl + `/GetVisibleInformationTabList`)
            if (slider.informationTabIdList.length > 0) {
                let t = res.data.filter((s: InformationTabDto) => slider.informationTabIdList.indexOf(s.informationTabId) > -1)
                setTabs(t)
            }
        }

    React.useEffect(() => {
        getSlider()
        getMail()
    }, [])
    React.useEffect(() => {
        getTabs()
    }, [slider])

    return <section className="section section-lg bg-default">
        <div className="container">
            <div className="tabs-custom row row-50 justify-content-center flex-lg-row-reverse text-center text-md-left" id="tabs-4">
                <div className="col-lg-4 col-xl-3">
                    <h5 className="text-spacing-200 text-capitalize">{slider?.title}</h5>
                    <ul className="nav list-category list-category-down-md-inline-block">
                        {tabs?.length > 0 &&
                            tabs.map((t: InformationTabDto, idx: number) => {
                                return <li onClick={() => setCurrentTab(idx)} className="list-category-item wow fadeInRight" role="presentation" data-wow-delay="0s"><span className={["tasb-opt", idx == currentTab ? "active" : ""].join(" ")} >{t.buttonText}</span></li>
                            })
                        }


                    </ul><a className="button button-xl button-primary button-winona" href={`mailto:${mail?.value}`}>Contact us</a>
                </div>
                <div className="col-lg-8 col-xl-9">

                    <div className="tab-content tab-content-1">
                        {tabs?.length > 0 &&
                            tabs.map((t: InformationTabDto, idx: number) => {
                                return <div className={`tab-pane fade show ${idx == currentTab ? "active" : ""}`} id={`tabs-4-${idx + 1}`}>
                                    <h4>{t.title}</h4>
                                    <div dangerouslySetInnerHTML={{ __html: t.text }}></div>
                                    <img src={`${getPictureUrlFromList(slider?.pictureIdList)[0]}`} alt="" width="835" height="418" />
                                </div>
                            })}
                    </div>
                </div>
            </div>
        </div>
    </section>
}

const BoxesSection = () => {
    const
        [boxesData, setBoxesData] = useState<{ title: string, text: string }[]>(),
        getBoxes = async () => {
            let boxes = []
            for (let i = 0; i < 3; i++) {
                let res = await axios.get(baseApiUrl + `/GetKeyValueByKey/au_box${i + 1}`)
                let resText = await axios.get(baseApiUrl + `/GetKeyValueByKey/au_box${i + 1}_text`)
                if (res.status == 200 && resText.status == 200) {
                    boxes.push({ title: res.data.value, text: resText.data.value })
                }
            }
            setBoxesData(boxes)
        }

    React.useEffect(() => {
        getBoxes()
    }, [])

    return <section className="section section-lg bg-gray-100">
        <div className="container">
            <div className="row row-md row-50">
                <div className="col-sm-6 col-xl-4 wow fadeInUp" data-wow-delay="0s">
                    <article className="box-icon-classic">
                        <div className="unit unit-spacing-lg flex-column text-center flex-md-row text-md-left">
                            <div className="unit-left">
                                <div className="box-icon-classic-icon linearicons-helicopter"></div>
                            </div>
                            <div className="unit-body">
                                {boxesData?.length > 0 && <>
                                    <h5 className="box-icon-classic-title">{boxesData[0]?.title}</h5>
                                    <p className="box-icon-classic-text">{boxesData[0]?.text}</p>
                                </>}</div>
                        </div>
                    </article>
                </div>
                <div className="col-sm-6 col-xl-4 wow fadeInUp" data-wow-delay=".1s">
                    <article className="box-icon-classic">
                        <div className="unit unit-spacing-lg flex-column text-center flex-md-row text-md-left">
                            <div className="unit-left">
                                <div className="box-icon-classic-icon linearicons-pizza"></div>
                            </div>
                            <div className="unit-body">
                                {boxesData?.length > 1 && <>
                                    <h5 className="box-icon-classic-title">{boxesData[1]?.title}</h5>
                                    <p className="box-icon-classic-text">{boxesData[1]?.text}</p>
                                </>}</div>
                        </div>
                    </article>
                </div>
                <div className="col-sm-6 col-xl-4 wow fadeInUp" data-wow-delay=".2s">
                    <article className="box-icon-classic">
                        <div className="unit unit-spacing-lg flex-column text-center flex-md-row text-md-left">
                            <div className="unit-left">
                                <div className="box-icon-classic-icon linearicons-leaf"></div>
                            </div>
                            <div className="unit-body">
                                {boxesData?.length > 2 && <>
                                    <h5 className="box-icon-classic-title">{boxesData[2]?.title}</h5>
                                    <p className="box-icon-classic-text">{boxesData[2]?.text}</p>
                                </>}</div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    </section>
}
const OurTeamSection = () => {
    const
        [teamMembers, setMembers] = useState<TeamMemberDto[]>(),
        [socials, setSocials] = useState<SocialMediaDto[]>(),
        [roles, setRole] = useState<RoleDto[]>(),
        getTeamMembers = async () => {
            let res = await axios.get(baseApiUrl + `/GetVisibleTeamMemberList`)
            setMembers(res.data)
        },
        getRole = async () => {
            let res = await axios.get(baseApiUrl + `/GetVisibleRoleList`)
            setRole(res.data)
        },
        getSocials = async () => {
            let res = await axios.get(baseApiUrl + `/GetVisibleSocialMediaList`)
            setSocials(res.data)
        },
        mappedTeam = teamMembers?.map((t: TeamMemberDto, idx: number) => {
            return <div className="col-sm-6 col-lg-3 wow fadeInLeft" data-wow-delay=".2s" data-wow-duration="1s">

                <article className="team-modern">
                    <a className="team-modern-figure" href="#"><img src={getPictureUrlFromList(t.pictureIdList)[0]} alt="" width="270" height="236" /></a>
                    <div className="team-modern-caption">
                        <h6 className="team-modern-name">{t.firstName} {t.lastName}</h6>
                        <div className="team-modern-status">{roles?.filter((r: RoleDto) => r.roleId == t.roleId)[0].name}</div>
                        <ul className="list-inline team-modern-social-list">
                            {socials?.filter((s: SocialMediaDto) => t.socialMediaIdList.indexOf(s.id) > -1)?.map((s: SocialMediaDto) => {
                                return <li><a className={["icon mdi", prepareSocialIcon(s.name.split("_"))].join(" ")} href={s.link}></a></li>
                            })}
                        </ul>
                    </div>
                </article>
            </div>
        })

    React.useEffect(() => {
        getRole()
        getTeamMembers()
        getSocials()
    }, [])

    return <section className="section section-lg section-bottom-md-70 bg-default">
        <div className="container">
            <h3 className="oh"><span className="d-inline-block wow slideInUp" data-wow-delay="0s">our team</span></h3>
            <div className="row row-lg row-40 justify-content-center">
                {mappedTeam}
            </div>
        </div>
    </section>
}
const OurHistorySection = () => {
    const
        [slider, setSlider] = useState<TabSliderDto>(),
        [mail, setMail] = useState<KeyValueDto>(),
        [tabs, setTabs] = useState<InformationTabDto[]>(),
        [currentTab, setCurrentTab] = useState(0),
        getMail = async () => {
            let res = await axios.get(baseApiUrl + `/GetKeyValueByKey/footer_email`)
            setMail(res.data)
        },
        getSlider = async () => {
            let res = await axios.get(baseApiUrl + `/GetKeyValueByKey/tabSlider_2`)
            if (res.status == 200) {
                res = await axios.get(baseApiUrl + `/GetTabSlider/${res.data.value}`)
                setSlider(res.data)

            }
        },
        getTabs = async () => {
            let res = await axios.get(baseApiUrl + `/GetVisibleInformationTabList`)
            if (slider?.informationTabIdList.length > 0) {
                let t = res.data.filter((s: InformationTabDto) => slider?.informationTabIdList.indexOf(s.informationTabId) > -1)
                setTabs(t)
            }
        }

    React.useEffect(() => {
        getSlider()
        getMail()
    }, [])
    React.useEffect(() => {
        getTabs()
    }, [slider])
    return <section className="section section-lg bg-gray-100 text-left section-relative">
        <div className="container">
            <div className="row row-60 justify-content-center justify-content-xxl-between">
                <div className="col-lg-6 col-xxl-5 position-static">
                    <h3>{slider?.title}</h3>
                    <div className="tabs-custom" id="tabs-5">
                        <div className="tab-content tab-content-1">
                            {tabs?.map((t: InformationTabDto, idx: number) => {
                                return <div className={"tab-pane fade" + (idx == currentTab ? "show active" : "")} id={`tabs-5-${idx + 1}`}>
                                    <h5 className="font-weight-normal text-transform-none text-spacing-75">{t.title}</h5>
                                    <div dangerouslySetInnerHTML={{ __html: t.text }}></div>
                                </div>
                            })}


                        </div>
                        <div className="list-history-wrap">
                            <ul className="nav list-history">
                                {tabs?.map((t: InformationTabDto, idx: number) => {
                                    return <li onClick={() => setCurrentTab(idx)} className="list-history-item" role="presentation">
                                        <span className={(idx == currentTab ? "active" : "")} data-toggle="tab">
                                            <div className="list-history-circle"></div>{t.buttonText}
                                        </span>
                                    </li>
                                })}

                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-9 col-lg-6 position-static index-1">

                    <div className="bg-image-right-1 bg-image-right-lg" style={{ overflow: "hidden" }}>
                        <img src={`${getPictureUrlFromList(slider?.pictureIdList)[0]}`} alt="" style={{ display: 'flex', height: "100%", minWidth: "100%" }} width="1110" height="710" />

                        <div className="box-transform" style={{ backgroundImage: `url(${baseApiUrl + "/GetPicture/Full/" + slider?.pictureIdList[0]});` }} ></div>
                    </div>
                </div>
            </div>
        </div>
    </section >
}
const WhatPeopleSay = () => {
    const
        [slider, setSlider] = useState<TabSliderDto>(),
        [mail, setMail] = useState<KeyValueDto>(),
        [tabs, setTabs] = useState<InformationTabDto[]>(),
        [currentTab, setCurrentTab] = useState(0),
        getMail = async () => {
            let res = await axios.get(baseApiUrl + `/GetKeyValueByKey/footer_email`)
            setMail(res.data)
        },
        getSlider = async () => {
            let res = await axios.get(baseApiUrl + `/GetKeyValueByKey/tabSlider_3`)
            if (res.status == 200) {
                res = await axios.get(baseApiUrl + `/GetTabSlider/${res.data.value}`)
                setSlider(res.data)
            }
        },
        getTabs = async () => {
            let res = await axios.get(baseApiUrl + `/GetVisibleInformationTabList`)
            if (slider?.informationTabIdList.length > 0) {
                let t = res.data.filter((s: InformationTabDto) => slider?.informationTabIdList.indexOf(s.informationTabId) > -1)
                setTabs(t)
            }
        }

    React.useEffect(() => {
        getSlider()
        getMail()
    }, [])
    React.useEffect(() => {
        getTabs()
    }, [slider])
    return <section className="section section-lg bg-default text-md-left">
        <div className="container">
            <div className="row row-60 justify-content-center flex-lg-row-reverse">
                <div className="col-md-8 col-lg-6 col-xl-5">
                    <div className="offset-left-xl-70 wps-quote">
                        <h3 className="heading-3">{slider?.title}</h3>
                        <div className="slick-quote">
                            {
                                tabs?.length > 0 &&
                                <div className="item">
                                    <article className="quote-modern">
                                        <h5 className="quote-modern-text"><span className="q">{tabs[currentTab].title}</span></h5>
                                        <div dangerouslySetInnerHTML={{
                                            __html: tabs[currentTab].text
                                        }}></div>
                                    </article>
                                </div>
                            }

                        </div>
                        <div className="slick-slider child-carousel wps-list" id="child-carousel-5" data-arrows="true" data-for=".carousel-parent" data-items="4" data-sm-items="4" data-md-items="4" data-lg-items="4" data-xl-items="4" data-slide-to-scroll="1">
                            {tabs?.map((t: InformationTabDto, idx: number) => {
                                return <div onClick={() => setCurrentTab(idx)} className={["item wps-item", currentTab == idx ? "slick-current" : ""].join(" ")}>
                                    <img className="img-circle" src={baseApiUrl + t.buttonText} alt="" width="83" height="83" />
                                </div>
                            })}
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-xl-7">
                    <img src="images/wp-say-669x447.jpg" alt="" width="669" height="447" />
                </div>
            </div>
        </div>
    </section>
}

const root = document.getElementById("react_root");
ReactDOM.render(<AboutPage />, root);
