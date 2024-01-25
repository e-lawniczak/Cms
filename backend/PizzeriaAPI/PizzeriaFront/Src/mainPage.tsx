import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';

import { PageWrapper } from './commonElements';
import axios from 'axios';
import { BannerDto, CategoryDto, GalleryDto, KeyValueDto, ProductDto, RoleDto, SliderDto, TestimonialDto, axiosBaseConfig, baseApiUrl, getPictureUrlFromList, prepareCategoryIcon } from './common';
import Slider from "../node_modules/react-slick"
// import "../node_modules/slick-carousel/slick/slick.css";
// import "../node_modules/slick-carousel/slick/slick-theme.css";

export const MainPage = () => {
    const
        [data, setData] = useState([]),

        x = ""


    return <PageWrapper>
        <SwiperSection />
        <CategoriesSection />
        <MidSectionBanner keyValue={"banner_1"} />
        <ProductsSection />
        <MidSectionBanner keyValue={"banner_2"} />
        <TestimonialSection />
        <GalleriesSection />


        {/* <section className="section section-sm section-first bg-default">
    <div className="container">
        <h3 className="heading-3">Book your Table</h3>
        <form className="rd-form rd-mailform form-style-1" data-form-output="form-output-global" data-form-type="contact" method="post" action="bat/rd-mailform.php">
            <div className="row row-20 gutters-20">
                <div className="col-md-6 col-lg-4 oh-desktop">
                    <div className="form-wrap wow slideInDown">
                        <input className="form-input" id="contact-your-name-6" type="text" name="name" data-constraints="">
                        <label className="form-label" for="contact-your-name-6">Your Name*</label>
                    </div>
                </div>
                <div className="col-md-6 col-lg-4 oh-desktop">
                    <div className="form-wrap wow slideInUp">
                        <input className="form-input" id="contact-email-6" type="email" name="email" data-constraints=" ">
                        <label className="form-label" for="contact-email-6">Your E-mail*</label>
                    </div>
                </div>
                <div className="col-lg-4 oh-desktop">
                    <div className="form-wrap wow slideInDown">
                        <!--Select 2-->
                        <select className="form-input" data-minimum-results-for-search="Infinity" data-constraints="">
                            <option value="1">Select a Service</option>
                            <option value="2">Dine-In</option>
                            <option value="3">Carry-Out</option>
                            <option value="4">Event Catering</option>
                        </select>
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-wrap wow fadeIn">
                        <label className="form-label" for="contact-message-6">Message</label>
                        <textarea className="form-input textarea-lg" id="contact-message-6" name="message" data-constraints=""></textarea>
                    </div>
                </div>
            </div>
            <div className="group-custom-1 group-middle oh-desktop">
                <button className="button button-lg button-primary button-winona wow fadeInRight" type="submit">Send message</button>
                
                <article className="quote-classic quote-classic-3 wow slideInDown">
                    <div className="quote-classic-text">
                        <p className="q">Please reserve your table at least 1 day in advance.</p>
                    </div>
                </article>
            </div>
        </form>
    </div>
</section> */}


        <AdditionalInfoSection />
    </PageWrapper>
}

const SwiperSection = () => {
    const
        [mainSlider, setMainSlider] = useState<KeyValueDto>(),
        [slider, setSlider] = useState<SliderDto>(),
        [currentSlide, setCurrentSlide] = useState(0),
        [sliderBanners, setSliderBanners] = useState<BannerDto[]>(),
        getMainSLider = async () => {
            let res = await axios.get(baseApiUrl + `/GetKeyValueByKey/home_page_slider`)
            setMainSlider(res.data)
        },
        getSlider = async () => {
            if (!mainSlider) return
            let res = await axios.get(baseApiUrl + `/GetSlider/${mainSlider?.value}`)
            setSlider(res.data)

        },
        getBannerSliders = async () => {
            if (!slider) return
            let queryString = slider?.bannerIdList.map((i: number) => `${i}`)
            let res = await axios.get(baseApiUrl + `/GetBannersByIdList?bannerIdList=${queryString}`)
            setSliderBanners(res.data)
        },
        mappedSliderBanners = sliderBanners?.map((b: BannerDto, idx: number) => {
            return <div key={idx} className="swiper-slide context-dark" style={{ backgroundImage: `url(${getPictureUrlFromList(b.pictureIdList)[0]})` }} data-slide-bg={getPictureUrlFromList(b.pictureIdList)[0]}>
                <div className="swiper-slide-caption section-md">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-9 col-md-8 col-lg-7 col-xl-7 offset-lg-1 offset-xxl-0">
                                <div dangerouslySetInnerHTML={{ __html: b.text }}></div>
                                <a className="button button-lg button-primary button-winona button-shadow-2" href={b.link} data-caption-animate="fadeInUp" data-caption-delay="300">{b.subText}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        })
    React.useEffect(() => {
        getMainSLider()
    }, [])
    React.useEffect(() => {
        getSlider()
    }, [mainSlider])
    React.useEffect(() => {
        getBannerSliders()
    }, [slider])

    return <section className="section swiper-container swiper-slider swiper-slider-2 swiper-slider-3" data-loop="true" data-autoplay="5000" data-simulate-touch="false" data-slide-effect="fade">
        <div className="swiper-wrapper text-sm-left">
            {mappedSliderBanners?.length > 0 && mappedSliderBanners[currentSlide]}
        </div>

        <div className="swiper-pagination" data-bullet-custom="true"></div>

        <div className="swiper-button-prev" onClick={() => setCurrentSlide((currentSlide - 1) % mappedSliderBanners.length)}>
            <div className="preview">
                <div className="preview__img"></div>
            </div>
            <div className="swiper-button-arrow"></div>
        </div>
        <div className="swiper-button-next" onClick={() => setCurrentSlide((currentSlide + 1) % mappedSliderBanners.length)}>
            <div className="swiper-button-arrow"></div>
            <div className="preview">
                <div className="preview__img"></div>
            </div>
        </div>
    </section>
}

const CategoriesSection = () => {
    const
        [categories, setCategories] = useState<CategoryDto[]>(),
        [categoriesTitle, setCategoriesTitle] = useState<KeyValueDto>(),
        getCategories = async () => {
            let res = await axios.get(baseApiUrl + `/GetVisibleCategoryList`)
            let resTitle = await axios.get(baseApiUrl + `/GetKeyValueByKey/categoriesTitle`)
            setCategoriesTitle(resTitle.data)
            setCategories(res.data)
        },
        mappedCategories = categories?.map((cat: CategoryDto, idx: number) => {
            return <div className="col-sm-6 col-lg-4">
                <div className="oh-desktop">

                    <article className="services-terri wow slideInUp">
                        <div className="services-terri-figure">
                            <img src={getPictureUrlFromList(cat.pictureIdList)[0]} alt="" width="370" height="278" />
                        </div>
                        <div className="services-terri-caption">
                            <span className={["services-terri-icon", prepareCategoryIcon(cat.name.split("_"))].join(" ")}></span>
                            <h5 className="services-terri-title"><a href={cat.link}>{cat.name}</a></h5>
                        </div>
                    </article>
                </div>
            </div>
        })

    React.useEffect(() => {
        getCategories()

    }, [])
    return <section className="section section-md bg-default">
        <div className="container">
            <h3 className="oh-desktop"><span className="d-inline-block wow slideInDown">{categoriesTitle?.value || "OUR MENU"}</span></h3>
            <div className="row row-md row-30">
                {mappedCategories}

            </div>
        </div>
    </section>
}
const MidSectionBanner = (props: { keyValue: string }) => {
    const
        [bannerValue, setBannerValue] = useState<KeyValueDto>(),
        [banner, setBanner] = useState<BannerDto>(),
        getBannerValue = async () => {
            let res = await axios.get(baseApiUrl + `/GetKeyValueByKey/${props.keyValue}`)
            setBannerValue(res.data)
        },
        getBanner = async () => {
            if (!bannerValue) return
            let res = await axios.get(baseApiUrl + `/GetBanner/${bannerValue?.value}`)
            setBanner(res.data)

        }

    React.useEffect(() => {
        getBannerValue()

    }, [])
    React.useEffect(() => {
        getBanner()

    }, [bannerValue])
    return <section className="primary-overlay section parallax-container" style={{ backgroundImage: `url(${getPictureUrlFromList(banner?.pictureIdList)[0]})` }} data-parallax-img={getPictureUrlFromList(banner?.pictureIdList)[0]}>
        <div className="parallax-content section-xl context-dark text-md-left">
            <div className="container">
                <div className="row justify-content-end">
                    <div className="col-sm-8 col-md-7 col-lg-5">
                        <div className="cta-modern">
                            <div dangerouslySetInnerHTML={{ __html: banner?.text }}></div>
                            <a className="button button-md button-secondary-2 button-winona wow fadeInUp" href={banner?.link} data-wow-delay=".2s">{banner?.subText}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    //       <section className="primary-overlay section parallax-container" data-parallax-img="images/bg-4.jpg">
    //       <div className="parallax-content section-xxl context-dark text-md-left">
    //           <div className="container">
    //               <div className="row justify-content-end">
    //                   <div className="col-sm-9 col-md-7 col-lg-5">
    //                       <div className="cta-modern">
    //                           <h3 className="cta-modern-title cta-modern-title-2 oh-desktop"><span className="d-inline-block wow fadeInLeft">-30% on all salads & drinks</span></h3>
    //                           <p className="cta-modern-text cta-modern-text-2 oh-desktop" data-wow-delay=".1s"><span className="cta-modern-decor cta-modern-decor-2 wow slideInLeft"></span><span className="d-inline-block wow slideInUp">Taste some of the best PizzaHouse salads!</span></p><a className="button button-lg button-secondary button-winona wow fadeInRight" href="contacts.html" data-wow-delay=".2s">contact us</a>
    //                       </div>
    //                   </div>
    //               </div>
    //           </div>
    //       </div>
    //   </section>
}
const ProductsSection = () => {
    const
        [products, setProducts] = useState<ProductDto[]>(),
        [categories, setCategories] = useState<CategoryDto[]>(),
        [productsTitle, setProductsTitle] = useState<KeyValueDto>(),
        getProducts = async () => {
            let res = await axios.get(baseApiUrl + "/GetVisibleProductList", axiosBaseConfig)
            let resTitle = await axios.get(baseApiUrl + `/GetKeyValueByKey/productsTitle`)
            setProducts(res.data)
            setProductsTitle(resTitle.data)
        },
        getCategories = async () => {
            let res = await axios.get(baseApiUrl + `/GetVisibleCategoryList`)
            setCategories(res.data)
        },
        mappedProducts = products?.map((p: ProductDto, idx: number) => {
            if (p.isRecommended)
                return <div key={idx} className="col-sm-6 col-lg-4 col-xl-3">

                    <article className="product wow fadeInLeft" data-wow-delay=".15s">
                        <div className="product-figure">
                            <img src={getPictureUrlFromList(p.pictureIdList)[0]} alt="" width="161" height="162" />
                        </div>
                        <div className="product-rating">
                            {Array.from({ length: 5 }, (_, i) => i + 1).map((i: any, idx: any) => {
                                if (idx < p.score) return <span className="mdi mdi-star"></span>
                                return <span className="mdi mdi-star text-gray-13"></span>
                            })}
                        </div>
                        <h6 className="product-title">{p.name}</h6>
                        <div className="product-price-wrap">

                            {(p.discountPrice < p.price && p.discountPrice > 0) ?
                                <>
                                    <div className="product-price product-price-old">{p.price} zł</div>
                                    <div className="product-price">{p.discountPrice} zł</div></>
                                : <div className="product-price">{p.price} zł</div>
                            }
                        </div>
                        <div className="product-button">
                            <div className="button-wrap"><a className="button button-xs button-secondary button-winona" href={categories.find((c: CategoryDto) => c.id == p.categoryId).link + `#${p.name + p.id}`}>View Product</a></div>
                        </div>
                        {(p.discountPrice < p.price && p.discountPrice > 0) ? <span className="product-badge product-badge-sale">Sale</span> : ""}
                    </article>
                </div>
        }).filter((p: any) => p)

    React.useEffect(() => {
        getProducts()
    }, [])
    React.useEffect(() => {
        getCategories()
    }, [products])
    return <section className="section section-lg bg-default">
        <div className="container">
            <h3 className="oh-desktop"><span className="d-inline-block wow slideInUp">{productsTitle?.value || "Selected Pizzas"}</span></h3>
            <div className="row row-lg row-30">
                {mappedProducts}
            </div>
        </div>
    </section>
}
const TestimonialSection = () => {
    const
        [testimonials, setTestimonials] = useState<TestimonialDto[]>(),
        [roles, setRoles] = useState<RoleDto[]>(),
        [isHover, setIsHover] = useState(false),
        [testimonialsTitle, setTestimonialsTitle] = useState<KeyValueDto>(),
        getTestimonials = async () => {
            let res = await axios.get(baseApiUrl + "/GetVisibleTestimonialList", axiosBaseConfig)
            let resTitle = await axios.get(baseApiUrl + `/GetKeyValueByKey/testimonialTitle`)
            setTestimonials(res.data)
            setTestimonialsTitle(resTitle.data)
        },
        getRoles = async () => {
            let res = await axios.get(baseApiUrl + `/GetvisibleRoleList`)
            setRoles(res.data.sort((a: RoleDto, b: RoleDto) => a.roleId - b.roleId))
        },
        mappedTestimonials = testimonials?.map((t: TestimonialDto, idx: number) => {
            return <article className="quote-tara" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                <div className="quote-tara-caption">
                    <div className="quote-tara-text">
                        <p className="q" dangerouslySetInnerHTML={{ __html: t.text }}></p>
                    </div>
                    <div className="quote-tara-figure">
                        <img src={getPictureUrlFromList(t.pictureIdList)[0]} alt="" width="115" height="115" />
                    </div>
                </div>
                <h6 className="quote-tara-author">{t.firstName} {t.lastName}</h6>
                <div className="quote-tara-status">{roles?.find((r: RoleDto, idx: number) => r.roleId == t.roleId).name}</div>
            </article>
        }).filter((p: any) => p),
        slickSettings = {
            infinite: true,
            speed: 500,
            className: "center",
            slidesToShow: 3,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding: '60px',
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
        }

    React.useEffect(() => {
        getTestimonials()
    }, [])
    React.useEffect(() => {
        getRoles()
    }, [testimonials])

    return <section className="section section-xl bg-default">
        <div className="container">
            <h3 className="wow fadeInLeft">{testimonialsTitle?.value || "What People Say"}</h3>
        </div>
        <div className="container container-style-1">
            {/* <div className="owl-carousel owl-style-12" data-items="1" data-sm-items="2" data-lg-items="3" data-margin="30" data-xl-margin="45" data-autoplay="true" data-nav="true" data-center="true" data-smart-speed="400">
            </div> */}
            <Slider {...slickSettings}>
                {mappedTestimonials}
            </Slider>
        </div>
    </section>
}
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style }}
            onClick={onClick}
        />
    );
}

const GalleriesSection = () => {
    const
        [galleries, setGalleries] = useState<GalleryDto[]>(),
        getGalleries = async () => {
            let galleries = []
            for (let i = 0; i < 7; i++) {
                let res = await axios.get(baseApiUrl + `/GetKeyValueByKey/gallery_${i + 1}`)
                if (res.status == 200) {
                    let title = res.data.value
                    res = await axios.get(baseApiUrl + `/GetGallery/${title}`)
                    galleries.push(res.data)
                }

            }
            setGalleries(galleries)
        }

    React.useEffect(() => {
        getGalleries()
    }, [])
    return <section className="section section-last bg-default gallery-section">
        <div className="container-fluid container-inset-0 isotope-wrap">
            <div className="gallery-row" >

                <div className={`grid-child grid-child-${1}   oh-desktop`}>

                    {galleries?.length > 0 &&
                        <article className="thumbnail thumbnail-mary thumbnail-mary-big wow slideInRight">
                            <a className="thumbnail-mary-figure" href={`/Gallery/${galleries[0].name}`} data-lightgallery="item"><img src={getPictureUrlFromList(galleries[0].pictureIdList)[0]} alt="" width="310" height="585" /></a>
                            <div className="thumbnail-mary-caption">
                                <div>
                                    <h6 className="thumbnail-mary-title"><a href={`/Gallery/${galleries[0].name}`}>{galleries[0].mainText}</a></h6>
                                    <div className="thumbnail-mary-location">{galleries[0].subText}</div>
                                </div>
                            </div>
                        </article>}
                </div>
                <div className={`grid-child grid-child-${2}   oh-desktop`}>
                    {galleries?.length > 1 &&

                        <article className="thumbnail thumbnail-mary thumbnail-mary-2 wow slideInDown">
                            <a className="thumbnail-mary-figure" href={`/Gallery/${galleries[1].name}`} data-lightgallery="item"><img src={getPictureUrlFromList(galleries[1].pictureIdList)[0]} alt="" width="310" height="585" /></a>
                            <div className="thumbnail-mary-caption">
                                <div>
                                    <h6 className="thumbnail-mary-title"><a href={`/Gallery/${galleries[6].name}`}>{galleries[1].mainText}</a></h6>
                                    <div className="thumbnail-mary-location">{galleries[1].subText}</div>
                                </div>
                            </div>
                        </article>}
                </div>
                <div className={`grid-child grid-child-${3}   oh-desktop`}>
                    {galleries?.length > 2 &&

                        <article className="thumbnail thumbnail-mary wow slideInUp">
                            <a className="thumbnail-mary-figure" href={`/Gallery/${galleries[2].name}`} data-lightgallery="item"><img src={getPictureUrlFromList(galleries[2].pictureIdList)[0]} alt="" width="631" height="587" /></a>
                            <div className="thumbnail-mary-caption">
                                <div>
                                    <h6 className="thumbnail-mary-title"><a href={`/Gallery/${galleries[6].name}`}>{galleries[2].mainText}</a></h6>
                                    <div className="thumbnail-mary-location">{galleries[2].subText}</div>
                                </div>
                            </div>
                        </article>}
                </div>
                <div className={`grid-child grid-child-${4}   oh-desktop`}>
                    {galleries?.length > 3 &&

                        <article className="thumbnail thumbnail-mary thumbnail-mary-2 wow slideInUp">
                            <a className="thumbnail-mary-figure" href={`/Gallery/${galleries[3].name}`} data-lightgallery="item"><img src={getPictureUrlFromList(galleries[3].pictureIdList)[0]} alt="" width="311" height="289" /></a>
                            <div className="thumbnail-mary-caption">
                                <div>
                                    <h6 className="thumbnail-mary-title"><a href={`/Gallery/${galleries[6].name}`}>{galleries[3].mainText}</a></h6>
                                    <div className="thumbnail-mary-location">{galleries[3].subText}</div>
                                </div>
                            </div>
                        </article>}
                </div>
                <div className={`grid-child grid-child-${5}   oh-desktop`}>
                    {galleries?.length > 4 &&

                        <article className="thumbnail thumbnail-mary thumbnail-mary-2 wow slideInRight">
                            <a className="thumbnail-mary-figure" href={`/Gallery/${galleries[4].name}`} data-lightgallery="item"><img src={getPictureUrlFromList(galleries[4].pictureIdList)[0]} alt="" width="311" height="289" /></a>
                            <div className="thumbnail-mary-caption">
                                <div>
                                    <h6 className="thumbnail-mary-title"><a href={`/Gallery/${galleries[6].name}`}>{galleries[4].mainText}</a></h6>
                                    <div className="thumbnail-mary-location">{galleries[4].subText}</div>
                                </div>
                            </div>
                        </article>}
                </div>
                <div className={`grid-child grid-child-${6}   oh-desktop`}>
                    {galleries?.length > 5 &&

                        <article className="thumbnail thumbnail-mary thumbnail-mary-2 wow slideInLeft">
                            <a className="thumbnail-mary-figure" href={`/Gallery/${galleries[5].name}`} data-lightgallery="item"><img src={getPictureUrlFromList(galleries[5].pictureIdList)[0]} alt="" width="311" height="289" /></a>
                            <div className="thumbnail-mary-caption">
                                <div>
                                    <h6 className="thumbnail-mary-title"><a href={`/Gallery/${galleries[6].name}`}>{galleries[5].mainText}</a></h6>
                                    <div className="thumbnail-mary-location">{galleries[5].subText}</div>
                                </div>
                            </div>
                        </article>}
                </div>
                <div className={`grid-child grid-child-${7}   oh-desktop`}>
                    {galleries?.length > 6 &&

                        <article className="thumbnail thumbnail-mary thumbnail-mary-2 wow slideInLeft">
                            <a className="thumbnail-mary-figure" href={`/Gallery/${galleries[6].name}`} data-lightgallery="item"><img src={getPictureUrlFromList(galleries[6].pictureIdList)[0]} alt="" width="311" height="289" /></a>
                            <div className="thumbnail-mary-caption">
                                <div>
                                    <h6 className="thumbnail-mary-title"><a href={`/Gallery/${galleries[6].name}`}>{galleries[6].mainText}</a></h6>
                                    <div className="thumbnail-mary-location">{galleries[6].subText}</div>
                                </div>
                            </div>
                        </article>}
                </div>
            </div>
        </div>
    </section>
}
const AdditionalInfoSection = () => {
    const
        [boxesData, setBoxesData] = useState<{ title: string, text: string }[]>(),
        getBoxes = async () => {
            let boxes = []
            for (let i = 0; i < 4; i++) {
                let res = await axios.get(baseApiUrl + `/GetKeyValueByKey/box${i + 1}`)
                let resText = await axios.get(baseApiUrl + `/GetKeyValueByKey/box${i + 1}_text`)
                if (res.status == 200 && resText.status == 200) {
                    boxes.push({ title: res.data.value, text: resText.data.value })
                }
            }
            setBoxesData(boxes)
        }

    React.useEffect(() => {
        getBoxes()
    }, [])
    return <section className="section section-sm bg-default">
        <div className="container">
            <div className="owl-carousel owl-style-11 dots-style-2" data-items="1" data-sm-items="1" data-lg-items="2" data-xl-items="4" data-margin="30" data-dots="true" data-mouse-drag="true" data-rtl="true">
                <article className="box-icon-megan wow fadeInUp">
                    <div className="box-icon-megan-header">
                        <div className="box-icon-megan-icon linearicons-bag"></div>
                    </div>
                    {boxesData?.length > 0 && <>
                        <h5 className="box-icon-megan-title">{boxesData[0]?.title}</h5>
                        <p className="box-icon-megan-text">{boxesData[0].text}</p>
                    </>}
                </article>
                <article className="box-icon-megan wow fadeInUp" data-wow-delay=".05s">
                    <div className="box-icon-megan-header">
                        <div className="box-icon-megan-icon linearicons-map2"></div>
                    </div>
                    {boxesData?.length > 1 && <>
                        <h5 className="box-icon-megan-title">{boxesData[1]?.title}</h5>
                        <p className="box-icon-megan-text">{boxesData[1].text}</p>
                    </>}
                </article>
                <article className="box-icon-megan wow fadeInUp" data-wow-delay=".1s">
                    <div className="box-icon-megan-header">
                        <div className="box-icon-megan-icon linearicons-radar"></div>
                    </div>
                    {boxesData?.length > 2 && <>
                        <h5 className="box-icon-megan-title">{boxesData[2]?.title}</h5>
                        <p className="box-icon-megan-text">{boxesData[2].text}</p>
                    </>}
                </article>
                <article className="box-icon-megan wow fadeInUp" data-wow-delay=".15s">
                    <div className="box-icon-megan-header">
                        <div className="box-icon-megan-icon linearicons-thumbs-up"></div>
                    </div>
                    {boxesData?.length > 3 &&
                        <>
                            <h5 className="box-icon-megan-title">{boxesData[3]?.title}</h5>
                            <p className="box-icon-megan-text">{boxesData[3].text}</p>
                        </>
                    }
                </article>
            </div>
        </div>
    </section>
}
const root = document.getElementById("react_root");
ReactDOM.render(<MainPage />, root);
