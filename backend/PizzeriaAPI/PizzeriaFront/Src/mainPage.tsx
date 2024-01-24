import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';

import { PageWrapper } from './commonElements';
import axios from 'axios';
import { BannerDto, KeyValueDto, SliderDto, baseApiUrl } from './common';

export const MainPage = () => {

    return <PageWrapper>
        <MainContent />
    </PageWrapper>
}

const MainContent = () => {
    const
        [data, setData] = useState([]),
        [mainSlider, setMainSlider] = useState<KeyValueDto>(),
        [slider, setSlider] = useState<SliderDto>(),
        [sliderBanners, setSliderBanners] = useState<BannerDto[]>(),
        getMainSLider = async () => {
            let res = await axios.get(baseApiUrl + `/GetKeyValueByKey/home_page_slider`)
            setMainSlider(res.data)
            getSlider()
        },
        getSlider = async () => {
            let res = await axios.get(baseApiUrl + `/GetSlider/${mainSlider?.value}`)
            setSlider(res.data)
            getBannerSliders()
        },
        getBannerSliders = async () => {
            let queryString = slider?.bannerIdList.map((i: number) => `${i},`).slice(0, -1)
            let res = await axios.get(baseApiUrl + `/GetBannersByIdList?bannerIdList=${queryString}`)
            setSliderBanners(res.data)
        },
        mappedSliderBanners = sliderBanners?.map((b: BannerDto, idx: number) => {
            return <div key={idx} className="swiper-slide context-dark" data-slide-bg="images/slide-1-1920x753.jpg">
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
        }),
        x = ""

    React.useEffect(() => {
        getMainSLider()
    }, [])

    return <>
        <section className="section swiper-container swiper-slider swiper-slider-2 swiper-slider-3" data-loop="true" data-autoplay="5000" data-simulate-touch="false" data-slide-effect="fade">
            <div className="swiper-wrapper text-sm-left">
                {mappedSliderBanners}
            </div>

            <div className="swiper-pagination" data-bullet-custom="true"></div>

            <div className="swiper-button-prev">
                <div className="preview">
                    <div className="preview__img"></div>
                </div>
                <div className="swiper-button-arrow"></div>
            </div>
            <div className="swiper-button-next">
                <div className="swiper-button-arrow"></div>
                <div className="preview">
                    <div className="preview__img"></div>
                </div>
            </div>
        </section>

        <section className="section section-md bg-default">
            <div className="container">
                <h3 className="oh-desktop"><span className="d-inline-block wow slideInDown">Our Menu</span></h3>
                <div className="row row-md row-30">
                    <div className="col-sm-6 col-lg-4">
                        <div className="oh-desktop">

                            <article className="services-terri wow slideInUp">
                                <div className="services-terri-figure">
                                    <img src="images/menu-1-370x278.jpg" alt="" width="370" height="278" />
                                </div>
                                <div className="services-terri-caption">
                                    <span className="services-terri-icon linearicons-leaf"></span>
                                    <h5 className="services-terri-title"><a href="#">Salads</a></h5>
                                </div>
                            </article>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-4">
                        <div className="oh-desktop">

                            <article className="services-terri wow slideInDown">
                                <div className="services-terri-figure">
                                    <img src="images/menu-2-370x278.jpg" alt="" width="370" height="278" />
                                </div>
                                <div className="services-terri-caption">
                                    <span className="services-terri-icon linearicons-pizza"></span>
                                    <h5 className="services-terri-title"><a href="#">Pizzas</a></h5>
                                </div>
                            </article>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-4">
                        <div className="oh-desktop">

                            <article className="services-terri wow slideInUp">
                                <div className="services-terri-figure">
                                    <img src="images/menu-3-370x278.jpg" alt="" width="370" height="278" />
                                </div>
                                <div className="services-terri-caption">
                                    <span className="services-terri-icon linearicons-hamburger"></span>
                                    <h5 className="services-terri-title"><a href="#">Burgers</a></h5>
                                </div>
                            </article>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-4">
                        <div className="oh-desktop">

                            <article className="services-terri wow slideInDown">
                                <div className="services-terri-figure">
                                    <img src="images/menu-4-370x278.jpg" alt="" width="370" height="278" />
                                </div>
                                <div className="services-terri-caption">
                                    <span className="services-terri-icon linearicons-ice-cream"></span>
                                    <h5 className="services-terri-title"><a href="#">Desserts</a></h5>
                                </div>
                            </article>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-4">
                        <div className="oh-desktop">

                            <article className="services-terri wow slideInUp">
                                <div className="services-terri-figure">
                                    <img src="images/menu-5-370x278.jpg" alt="" width="370" height="278" />
                                </div>
                                <div className="services-terri-caption">
                                    <span className="services-terri-icon linearicons-coffee-cup"></span>
                                    <h5 className="services-terri-title"><a href="#">Drinks</a></h5>
                                </div>
                            </article>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-4">
                        <div className="oh-desktop">

                            <article className="services-terri wow slideInDown">
                                <div className="services-terri-figure">
                                    <img src="images/menu-6-370x278.jpg" alt="" width="370" height="278" />
                                </div>
                                <div className="services-terri-caption">
                                    <span className="services-terri-icon linearicons-steak"></span>
                                    <h5 className="services-terri-title"><a href="#">Seafood</a></h5>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <section className="primary-overlay section parallax-container" data-parallax-img="images/bg-3.jpg">
            <div className="parallax-content section-xl context-dark text-md-left">
                <div className="container">
                    <div className="row justify-content-end">
                        <div className="col-sm-8 col-md-7 col-lg-5">
                            <div className="cta-modern">
                                <h3 className="cta-modern-title wow fadeInRight">Best atmosphere</h3>
                                <p className="lead">PizzaHouse is the place of the best pizza and high-quality service.</p>
                                <p className="cta-modern-text oh-desktop" data-wow-delay=".1s"><span className="cta-modern-decor wow slideInLeft"></span><span className="d-inline-block wow slideInDown">Ben Smith, Founder</span></p><a className="button button-md button-secondary-2 button-winona wow fadeInUp" href="#" data-wow-delay=".2s">View Our Services</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <section className="section section-lg bg-default">
            <div className="container">
                <h3 className="oh-desktop"><span className="d-inline-block wow slideInUp">Selected Pizzas</span></h3>
                <div className="row row-lg row-30">
                    <div className="col-sm-6 col-lg-4 col-xl-3">

                        <article className="product wow fadeInLeft" data-wow-delay=".15s">
                            <div className="product-figure">
                                <img src="images/product-1-161x162.png" alt="" width="161" height="162" />
                            </div>
                            <div className="product-rating">
                                <span className="mdi mdi-star"></span><span className="mdi mdi-star"></span><span className="mdi mdi-star"></span><span className="mdi mdi-star"></span><span className="mdi mdi-star text-gray-13"></span>
                            </div>
                            <h6 className="product-title">Margherita Pizza</h6>
                            <div className="product-price-wrap">
                                <div className="product-price">$24.00</div>
                            </div>
                            <div className="product-button">
                                <div className="button-wrap"><a className="button button-xs button-primary button-winona" href="#">Add to cart</a></div>
                                <div className="button-wrap"><a className="button button-xs button-secondary button-winona" href="#">View Product</a></div>
                            </div>
                        </article>
                    </div>
                    <div className="col-sm-6 col-lg-4 col-xl-3">

                        <article className="product wow fadeInLeft" data-wow-delay=".1s">
                            <div className="product-figure">
                                <img src="images/product-2-161x162.png" alt="" width="161" height="162" />
                            </div>
                            <div className="product-rating">
                                <span className="mdi mdi-star"></span><span className="mdi mdi-star"></span><span className="mdi mdi-star"></span><span className="mdi mdi-star"></span><span className="mdi mdi-star"></span>
                            </div>
                            <h6 className="product-title">Mushroom Pizza</h6>
                            <div className="product-price-wrap">
                                <div className="product-price">$24.00</div>
                            </div>
                            <div className="product-button">
                                <div className="button-wrap"><a className="button button-xs button-primary button-winona" href="#">Add to cart</a></div>
                                <div className="button-wrap"><a className="button button-xs button-secondary button-winona" href="#">View Product</a></div>
                            </div><span className="product-badge product-badge-new">New</span>
                        </article>
                    </div>
                    <div className="col-sm-6 col-lg-4 col-xl-3">

                        <article className="product wow fadeInLeft" data-wow-delay=".05s">
                            <div className="product-figure">
                                <img src="images/product-3-161x162.png" alt="" width="161" height="162" />
                            </div>
                            <div className="product-rating">
                                <span className="mdi mdi-star"></span><span className="mdi mdi-star"></span><span className="mdi mdi-star"></span><span className="mdi mdi-star"></span><span className="mdi mdi-star text-gray-13"></span>
                            </div>
                            <h6 className="product-title">Hawaiian Pizza</h6>
                            <div className="product-price-wrap">
                                <div className="product-price">$24.00</div>
                            </div>
                            <div className="product-button">
                                <div className="button-wrap"><a className="button button-xs button-primary button-winona" href="#">Add to cart</a></div>
                                <div className="button-wrap"><a className="button button-xs button-secondary button-winona" href="#">View Product</a></div>
                            </div>
                        </article>
                    </div>
                    <div className="col-sm-6 col-lg-4 col-xl-3">

                        <article className="product wow fadeInLeft">
                            <div className="product-figure">
                                <img src="images/product-4-161x162.png" alt="" width="161" height="162" />
                            </div>
                            <div className="product-rating">
                                <span className="mdi mdi-star"></span><span className="mdi mdi-star"></span><span className="mdi mdi-star"></span><span className="mdi mdi-star"></span><span className="mdi mdi-star"></span>
                            </div>
                            <h6 className="product-title">Pesto Pizza</h6>
                            <div className="product-price-wrap">
                                <div className="product-price product-price-old">$40.00</div>
                                <div className="product-price">$24.00</div>
                            </div>
                            <div className="product-button">
                                <div className="button-wrap"><a className="button button-xs button-primary button-winona" href="#">Add to cart</a></div>
                                <div className="button-wrap"><a className="button button-xs button-secondary button-winona" href="#">View Product</a></div>
                            </div><span className="product-badge product-badge-sale">Sale</span>
                        </article>
                    </div>
                </div>
            </div>
        </section>


        <section className="primary-overlay section parallax-container" data-parallax-img="images/bg-4.jpg">
            <div className="parallax-content section-xxl context-dark text-md-left">
                <div className="container">
                    <div className="row justify-content-end">
                        <div className="col-sm-9 col-md-7 col-lg-5">
                            <div className="cta-modern">
                                <h3 className="cta-modern-title cta-modern-title-2 oh-desktop"><span className="d-inline-block wow fadeInLeft">-30% on all salads & drinks</span></h3>
                                <p className="cta-modern-text cta-modern-text-2 oh-desktop" data-wow-delay=".1s"><span className="cta-modern-decor cta-modern-decor-2 wow slideInLeft"></span><span className="d-inline-block wow slideInUp">Taste some of the best PizzaHouse salads!</span></p><a className="button button-lg button-secondary button-winona wow fadeInRight" href="contacts.html" data-wow-delay=".2s">contact us</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <section className="section section-xl bg-default">
            <div className="container">
                <h3 className="wow fadeInLeft">What People Say</h3>
            </div>
            <div className="container container-style-1">
                <div className="owl-carousel owl-style-12" data-items="1" data-sm-items="2" data-lg-items="3" data-margin="30" data-xl-margin="45" data-autoplay="true" data-nav="true" data-center="true" data-smart-speed="400">

                    <article className="quote-tara">
                        <div className="quote-tara-caption">
                            <div className="quote-tara-text">
                                <p className="q">PizzaHouse is the longest lasting pizza place in the city and is well run and staffed. Prices are great and allow me to keep coming back.</p>
                            </div>
                            <div className="quote-tara-figure">
                                <img src="images/user-6-115x115.jpg" alt="" width="115" height="115" />
                            </div>
                        </div>
                        <h6 className="quote-tara-author">Ashley Fitzgerald</h6>
                        <div className="quote-tara-status">Client</div>
                    </article>

                    <article className="quote-tara">
                        <div className="quote-tara-caption">
                            <div className="quote-tara-text">
                                <p className="q">I am a real pizza addict, and even when I’m home I prefer your pizzas to all others. They taste awesome and are very affordable.</p>
                            </div>
                            <div className="quote-tara-figure">
                                <img src="images/user-8-115x115.jpg" alt="" width="115" height="115" />
                            </div>
                        </div>
                        <h6 className="quote-tara-author">Stephanie Williams</h6>
                        <div className="quote-tara-status">Client</div>
                    </article>

                    <article className="quote-tara">
                        <div className="quote-tara-caption">
                            <div className="quote-tara-text">
                                <p className="q">PizzaHouse has amazing pizza. Not only do you get served with a great attitude, you also get delicious pizza at a great price!</p>
                            </div>
                            <div className="quote-tara-figure">
                                <img src="images/user-7-115x115.jpg" alt="" width="115" height="115" />
                            </div>
                        </div>
                        <h6 className="quote-tara-author">Bill Johnson</h6>
                        <div className="quote-tara-status">Client</div>
                    </article>

                    <article className="quote-tara">
                        <div className="quote-tara-caption">
                            <div className="quote-tara-text">
                                <p className="q">PizzaHouse has great pizza. Not only do you get served with a great attitude and delivered delicious pizza, you get a great price.</p>
                            </div>
                            <div className="quote-tara-figure">
                                <img src="images/user-9-115x115.jpg" alt="" width="115" height="115" />
                            </div>
                        </div>
                        <h6 className="quote-tara-author">Aaron Wilson</h6>
                        <div className="quote-tara-status">Client</div>
                    </article>
                </div>
            </div>
        </section>

        <section className="section section-last bg-default">
            <div className="container-fluid container-inset-0 isotope-wrap">
                <div className="row row-10 gutters-10 isotope" data-isotope-layout="masonry" data-isotope-group="gallery" data-lightgallery="group">
                    <div className="col-xs-6 col-sm-4 col-xl-2 isotope-item oh-desktop">

                        <article className="thumbnail thumbnail-mary thumbnail-mary-2 wow slideInLeft">
                            <a className="thumbnail-mary-figure" href="images/gallery-1-1200x800-original.jpg" data-lightgallery="item"><img src="images/gallery-1-310x585.jpg" alt="" width="310" height="585" /></a>
                            <div className="thumbnail-mary-caption">
                                <div>
                                    <h6 className="thumbnail-mary-title"><a href="#">Best Ingredients</a></h6>
                                    <div className="thumbnail-mary-location">Tasty Pizza</div>
                                </div>
                            </div>
                        </article>
                    </div>
                    <div className="col-xs-6 col-sm-8 col-xl-4 isotope-item oh-desktop">

                        <article className="thumbnail thumbnail-mary thumbnail-mary-big wow slideInRight">
                            <a className="thumbnail-mary-figure" href="images/gallery-2-1200x800-original.jpg" data-lightgallery="item"><img src="images/gallery-2-631x587.jpg" alt="" width="631" height="587" /></a>
                            <div className="thumbnail-mary-caption">
                                <div>
                                    <h6 className="thumbnail-mary-title"><a href="#">Comfortable interior</a></h6>
                                    <div className="thumbnail-mary-location">Modern Design</div>
                                </div>
                            </div>
                        </article>
                    </div>
                    <div className="col-xs-6 col-sm-4 col-xl-2 isotope-item oh-desktop">

                        <article className="thumbnail thumbnail-mary thumbnail-mary-2 wow slideInDown">
                            <a className="thumbnail-mary-figure" href="images/gallery-3-1200x800-original.jpg" data-lightgallery="item"><img src="images/gallery-3-311x289.jpg" alt="" width="311" height="289" /></a>
                            <div className="thumbnail-mary-caption">
                                <div>
                                    <h6 className="thumbnail-mary-title"><a href="#">quality Dishware</a></h6>
                                    <div className="thumbnail-mary-location">Top-notch utensils</div>
                                </div>
                            </div>
                        </article>
                    </div>
                    <div className="col-xs-6 col-sm-8 col-xl-4 isotope-item oh-desktop">

                        <article className="thumbnail thumbnail-mary wow slideInUp">
                            <a className="thumbnail-mary-figure" href="images/gallery-4-1200x800-original.jpg" data-lightgallery="item"><img src="images/gallery-4-631x289.jpg" alt="" width="631" height="289" /></a>
                            <div className="thumbnail-mary-caption">
                                <div>
                                    <h6 className="thumbnail-mary-title"><a href="#">Refreshing cocktails</a></h6>
                                    <div className="thumbnail-mary-location">Exclusive selection</div>
                                </div>
                            </div>
                        </article>
                    </div>
                    <div className="col-xs-6 col-sm-4 col-xl-2 isotope-item oh-desktop">

                        <article className="thumbnail thumbnail-mary thumbnail-mary-2 wow slideInUp">
                            <a className="thumbnail-mary-figure" href="images/gallery-5-1200x800-original.jpg" data-lightgallery="item"><img src="images/gallery-5-311x289.jpg" alt="" width="311" height="289" /></a>
                            <div className="thumbnail-mary-caption">
                                <div>
                                    <h6 className="thumbnail-mary-title"><a href="#">Exotic Salads</a></h6>
                                    <div className="thumbnail-mary-location">Summer Taste</div>
                                </div>
                            </div>
                        </article>
                    </div>
                    <div className="col-xs-6 col-sm-4 col-xl-2 isotope-item oh-desktop">

                        <article className="thumbnail thumbnail-mary thumbnail-mary-2 wow slideInRight">
                            <a className="thumbnail-mary-figure" href="images/gallery-6-1200x800-original.jpg" data-lightgallery="item"><img src="images/gallery-6-311x289.jpg" alt="" width="311" height="289" /></a>
                            <div className="thumbnail-mary-caption">
                                <div>
                                    <h6 className="thumbnail-mary-title"><a href="#">All Types of pizza</a></h6>
                                    <div className="thumbnail-mary-location">Special Recipes</div>
                                </div>
                            </div>
                        </article>
                    </div>
                    <div className="col-xs-6 col-sm-4 col-xl-2 isotope-item oh-desktop">

                        <article className="thumbnail thumbnail-mary thumbnail-mary-2 wow slideInLeft">
                            <a className="thumbnail-mary-figure" href="images/gallery-7-1200x800-original.jpg" data-lightgallery="item"><img src="images/gallery-7-311x289.jpg" alt="" width="311" height="289" /></a>
                            <div className="thumbnail-mary-caption">
                                <div>
                                    <h6 className="thumbnail-mary-title"><a href="#">Diverse menu</a></h6>
                                    <div className="thumbnail-mary-location">Pick Your Favorite dish</div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </section>


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


        <section className="section section-sm bg-default">
            <div className="container">
                <div className="owl-carousel owl-style-11 dots-style-2" data-items="1" data-sm-items="1" data-lg-items="2" data-xl-items="4" data-margin="30" data-dots="true" data-mouse-drag="true" data-rtl="true">
                    <article className="box-icon-megan wow fadeInUp">
                        <div className="box-icon-megan-header">
                            <div className="box-icon-megan-icon linearicons-bag"></div>
                        </div>
                        <h5 className="box-icon-megan-title"><a href="#">Free Delivery</a></h5>
                        <p className="box-icon-megan-text">If you order more than 3 pizzas, we will gladly deliver them to you for free.</p>
                    </article>
                    <article className="box-icon-megan wow fadeInUp" data-wow-delay=".05s">
                        <div className="box-icon-megan-header">
                            <div className="box-icon-megan-icon linearicons-map2"></div>
                        </div>
                        <h5 className="box-icon-megan-title"><a href="#">Convenient Location</a></h5>
                        <p className="box-icon-megan-text">Our pizzeria is situated in the downtown and is very easy to reach even on weekends.</p>
                    </article>
                    <article className="box-icon-megan wow fadeInUp" data-wow-delay=".1s">
                        <div className="box-icon-megan-header">
                            <div className="box-icon-megan-icon linearicons-radar"></div>
                        </div>
                        <h5 className="box-icon-megan-title"><a href="#">Free Wi-Fi</a></h5>
                        <p className="box-icon-megan-text">We have free Wi-Fi available to all clients and visitors of our pizzeria.</p>
                    </article>
                    <article className="box-icon-megan wow fadeInUp" data-wow-delay=".15s">
                        <div className="box-icon-megan-header">
                            <div className="box-icon-megan-icon linearicons-thumbs-up"></div>
                        </div>
                        <h5 className="box-icon-megan-title"><a href="#">Best Service</a></h5>
                        <p className="box-icon-megan-text">The client is our #1 priority as we deliver top-notch customer service.</p>
                    </article>
                </div>
            </div>
        </section>
    </>
}

const root = document.getElementById("react_root");
ReactDOM.render(<MainPage />, root);
