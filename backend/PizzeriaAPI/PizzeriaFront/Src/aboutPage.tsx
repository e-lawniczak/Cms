import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';

import { PageWrapper } from './commonElements';
import { InformationTabDto, KeyValueDto, TabSliderDto, baseApiUrl, getPictureUrlFromList } from './common';
import axios from 'axios';

export const AboutPage = () => {
    const
        [data, setData] = useState([])




    React.useEffect(() => {

    }, [])
    return <PageWrapper>
        <BannerSection />
        <InformationSliderSection />
    </PageWrapper>
}

const AboutPageContent = () => {
    return <>
        <section className="section section-lg bg-gray-100">
            <div className="container">
                <div className="row row-md row-50">
                    <div className="col-sm-6 col-xl-4 wow fadeInUp" data-wow-delay="0s">
                        <article className="box-icon-classic">
                            <div className="unit unit-spacing-lg flex-column text-center flex-md-row text-md-left">
                                <div className="unit-left">
                                    <div className="box-icon-classic-icon linearicons-helicopter"></div>
                                </div>
                                <div className="unit-body">
                                    <h5 className="box-icon-classic-title"><a href="#">Free Delivery</a></h5>
                                    <p className="box-icon-classic-text">Lotus advenas ducunt ad gemna. Ubi est domesticus domina heu.</p>
                                </div>
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
                                    <h5 className="box-icon-classic-title"><a href="#">20+ Pizza Options</a></h5>
                                    <p className="box-icon-classic-text">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh</p>
                                </div>
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
                                    <h5 className="box-icon-classic-title"><a href="#">Fresh Ingredients</a></h5>
                                    <p className="box-icon-classic-text">Albus, dexter particulas grauiter consumere de ferox, bi-color abactus.</p>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </section>


        <section className="section section-lg section-bottom-md-70 bg-default">
            <div className="container">
                <h3 className="oh"><span className="d-inline-block wow slideInUp" data-wow-delay="0s">our team</span></h3>
                <div className="row row-lg row-40 justify-content-center">
                    <div className="col-sm-6 col-lg-3 wow fadeInLeft" data-wow-delay=".2s" data-wow-duration="1s">

                        <article className="team-modern">
                            <a className="team-modern-figure" href="#"><img src="images/team-01-270x236.jpg" alt="" width="270" height="236" /></a>
                            <div className="team-modern-caption">
                                <h6 className="team-modern-name"><a href="#">Richard Peterson</a></h6>
                                <div className="team-modern-status">Head Chef</div>
                                <ul className="list-inline team-modern-social-list">
                                    <li><a className="icon mdi mdi-facebook" href="#"></a></li>
                                    <li><a className="icon mdi mdi-twitter" href="#"></a></li>
                                    <li><a className="icon mdi mdi-instagram" href="#"></a></li>
                                    <li><a className="icon mdi mdi-google-plus" href="#"></a></li>
                                </ul>
                            </div>
                        </article>
                    </div>
                    <div className="col-sm-6 col-lg-3 wow fadeInLeft" data-wow-delay="0s" data-wow-duration="1s">

                        <article className="team-modern">
                            <a className="team-modern-figure" href="#"><img src="images/team-02-270x236.jpg" alt="" width="270" height="236" /></a>
                            <div className="team-modern-caption">
                                <h6 className="team-modern-name"><a href="#">Amelia Lee</a></h6>
                                <div className="team-modern-status">Manager</div>
                                <ul className="list-inline team-modern-social-list">
                                    <li><a className="icon mdi mdi-facebook" href="#"></a></li>
                                    <li><a className="icon mdi mdi-twitter" href="#"></a></li>
                                    <li><a className="icon mdi mdi-instagram" href="#"></a></li>
                                    <li><a className="icon mdi mdi-google-plus" href="#"></a></li>
                                </ul>
                            </div>
                        </article>
                    </div>
                    <div className="col-sm-6 col-lg-3 wow fadeInRight" data-wow-delay=".1s" data-wow-duration="1s">

                        <article className="team-modern">
                            <a className="team-modern-figure" href="#"><img src="images/team-03-270x236.jpg" alt="" width="270" height="236" /></a>
                            <div className="team-modern-caption">
                                <h6 className="team-modern-name"><a href="#">Sam Peterson</a></h6>
                                <div className="team-modern-status">Head Baker</div>
                                <ul className="list-inline team-modern-social-list">
                                    <li><a className="icon mdi mdi-facebook" href="#"></a></li>
                                    <li><a className="icon mdi mdi-twitter" href="#"></a></li>
                                    <li><a className="icon mdi mdi-instagram" href="#"></a></li>
                                    <li><a className="icon mdi mdi-google-plus" href="#"></a></li>
                                </ul>
                            </div>
                        </article>
                    </div>
                    <div className="col-sm-6 col-lg-3 wow fadeInRight" data-wow-delay=".3s" data-wow-duration="1s">

                        <article className="team-modern">
                            <a className="team-modern-figure" href="#"><img src="images/team-04-270x236.jpg" alt="" width="270" height="236" /></a>
                            <div className="team-modern-caption">
                                <h6 className="team-modern-name"><a href="#">Jane Smith</a></h6>
                                <div className="team-modern-status">Pizza Chef</div>
                                <ul className="list-inline team-modern-social-list">
                                    <li><a className="icon mdi mdi-facebook" href="#"></a></li>
                                    <li><a className="icon mdi mdi-twitter" href="#"></a></li>
                                    <li><a className="icon mdi mdi-instagram" href="#"></a></li>
                                    <li><a className="icon mdi mdi-google-plus" href="#"></a></li>
                                </ul>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </section>
        <section className="section section-lg bg-gray-100 text-left section-relative">
            <div className="container">
                <div className="row row-60 justify-content-center justify-content-xxl-between">
                    <div className="col-lg-6 col-xxl-5 position-static">
                        <h3>Our history</h3>
                        <div className="tabs-custom" id="tabs-5">
                            <div className="tab-content tab-content-1">
                                <div className="tab-pane fade" id="tabs-5-1">
                                    <h5 className="font-weight-normal text-transform-none text-spacing-75">PizzaHouse Establishment and First Happy Clients</h5>
                                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh</p>
                                </div>
                                <div className="tab-pane fade" id="tabs-5-2">
                                    <h5 className="font-weight-normal text-transform-none text-spacing-75">Organizing a Free Pizza Delivery Service in Los Angeles</h5>
                                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.</p>
                                </div>
                                <div className="tab-pane fade" id="tabs-5-3">
                                    <h5 className="font-weight-normal text-transform-none text-spacing-75">Offering an Extended Range of Pizzas, Burgers, and Salads</h5>
                                    <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
                                </div>
                                <div className="tab-pane fade show active" id="tabs-5-4">
                                    <h5 className="font-weight-normal text-transform-none text-spacing-75">Partnering with Organic Farms Located in California</h5>
                                    <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur.</p>
                                </div>
                            </div>
                            <div className="list-history-wrap">
                                <ul className="nav list-history">
                                    <li className="list-history-item" role="presentation">
                                        <a href="#tabs-5-1" data-toggle="tab">
                                            <div className="list-history-circle"></div>2005
                                        </a>
                                    </li>
                                    <li className="list-history-item" role="presentation">
                                        <a href="#tabs-5-2" data-toggle="tab">
                                            <div className="list-history-circle"></div>2012
                                        </a>
                                    </li>
                                    <li className="list-history-item" role="presentation">
                                        <a href="#tabs-5-3" data-toggle="tab">
                                            <div className="list-history-circle"></div>2015
                                        </a>
                                    </li>
                                    <li className="list-history-item" role="presentation">
                                        <a className="active" href="#tabs-5-4" data-toggle="tab">
                                            <div className="list-history-circle"></div>2019
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9 col-lg-6 position-static index-1">
                        <div className="bg-image-right-1 bg-image-right-lg">
                            <img src="images/our_history-1110x710.jpg" alt="" width="1110" height="710" />
                            <div className="link-play-modern">
                                <a className="icon mdi mdi-play" data-lightgallery="item" href="https://www.youtube.com/watch?v=1UWpbtUupQQ"></a>
                                <div className="link-play-modern-title">How we<span>Work</span></div>
                                <div className="link-play-modern-decor"></div>
                            </div>
                            <div className="box-transform" style={{ backgroundImage: "url(images/our_history-1110x710.jpg);" }} ></div>
                        </div>
                    </div>
                </div>
            </div>
        </section >


        <section className="section section-lg bg-default text-md-left">
            <div className="container">
                <div className="row row-60 justify-content-center flex-lg-row-reverse">
                    <div className="col-md-8 col-lg-6 col-xl-5">
                        <div className="offset-left-xl-70">
                            <h3 className="heading-3">What People Say</h3>
                            <div className="slick-quote">

                                <div className="slick-slider carousel-parent" data-autoplay="true" data-swipe="true" data-items="1" data-child="#child-carousel-5" data-for="#child-carousel-5" data-slide-effect="true">
                                    <div className="item">

                                        <article className="quote-modern">
                                            <h5 className="quote-modern-text"><span className="q">Torus accelerares, tanquam ferox cacula. Fluctuss experimentum in burdigala! Ubi est peritus classis? Peregrinatione superbe ducunt ad magnum verpa.</span></h5>
                                            <h5 className="quote-modern-author">Stephen Adams,</h5>
                                            <p className="quote-modern-status">Regular Client</p>
                                        </article>
                                    </div>
                                    <div className="item">

                                        <article className="quote-modern">
                                            <h5 className="quote-modern-text"><span className="q">Gluten, fluctus, et galatae. Germanus classiss ducunt ad brodium. Pol, a bene cedrium. Tabess unda in neuter avenio! Orexiss sunt adelphiss de rusticus parma.</span></h5>
                                            <h5 className="quote-modern-author">Sam Peterson,</h5>
                                            <p className="quote-modern-status">Regular Client</p>
                                        </article>
                                    </div>
                                    <div className="item">

                                        <article className="quote-modern">
                                            <h5 className="quote-modern-text"><span className="q">Pol, silva! Grandis contencios ducunt ad torus. Monss congregabo in nobilis tectum! Velox, fatalis victrixs sapienter talem de emeritis, festus torus.</span></h5>
                                            <h5 className="quote-modern-author">Jane McMillan,</h5>
                                            <p className="quote-modern-status">Regular Client</p>
                                        </article>
                                    </div>
                                    <div className="item">

                                        <article className="quote-modern">
                                            <h5 className="quote-modern-text"><span className="q">Fluctuss sunt eras de neuter plasmator. Heuretes noster brabeuta est. Nixus, visus, et mensa. Primus, magnum tatas rare locus de altus, camerarius clabulare.</span></h5>
                                            <h5 className="quote-modern-author">Will Jones,</h5>
                                            <p className="quote-modern-status">Regular Client</p>
                                        </article>
                                    </div>
                                </div>
                                <div className="slick-slider child-carousel" id="child-carousel-5" data-arrows="true" data-for=".carousel-parent" data-items="4" data-sm-items="4" data-md-items="4" data-lg-items="4" data-xl-items="4" data-slide-to-scroll="1">
                                    <div className="item">
                                        <img className="img-circle" src="images/team-5-83x83.jpg" alt="" width="83" height="83" />
                                    </div>
                                    <div className="item">
                                        <img className="img-circle" src="images/team-6-83x83.jpg" alt="" width="83" height="83" />
                                    </div>
                                    <div className="item">
                                        <img className="img-circle" src="images/team-7-83x83.jpg" alt="" width="83" height="83" />
                                    </div>
                                    <div className="item">
                                        <img className="img-circle" src="images/team-8-83x83.jpg" alt="" width="83" height="83" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-xl-7">
                        <img src="images/wp-say-669x447.jpg" alt="" width="669" height="447" />
                    </div>
                </div>
            </div>
        </section>

    </>
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
                if (res.status == 200) {



                }
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
    }, [])
    React.useEffect(() => {
        getTabs()
    }, [slider])

    return <section className="section section-lg bg-default">
        <div className="container">
            <div className="tabs-custom row row-50 justify-content-center flex-lg-row-reverse text-center text-md-left" id="tabs-4">
                <div className="col-lg-4 col-xl-3">
                    <h5 className="text-spacing-200 text-capitalize">10+ years of experience</h5>
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
const root = document.getElementById("react_root");
ReactDOM.render(<AboutPage />, root);
