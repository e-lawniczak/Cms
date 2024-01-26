import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';

import { PageWrapper } from './commonElements';
import axios from 'axios';
import { CategoryDto, Image, PageDto, ProductDto, baseApiUrl, getPictureUrlFromList } from './common';

export const CategoryPage = () => {
    const
        [data, setData] = useState([])


    return <PageWrapper>
        <BannerSection />
        <ProductsList />
    </PageWrapper>
}
const ProductsList = () => {
    const
        [products, setProducts] = useState<ProductDto[]>(),
        cat = location.pathname.split("/")[location.pathname.split("/").length - 1],
        getProducts = async () => {
            let resCat = await axios.get(baseApiUrl + `/GetCategory/${cat}`)
            let res = await axios.get(baseApiUrl + "/GetVisibleProductList")
            let p = res.data.filter((p: ProductDto) => resCat.data.id == p.categoryId)
            // if (p?.length == 0) location.href = "/Error"
            setProducts(p)
        }
    React.useEffect(() => {
        getProducts()
    }, [])
    return <>
        <div className="product-list">
            {products?.map((p: ProductDto) => {
                return <Product product={p} />
            })}
        </div>
    </>
}
const Product = (props: { product: ProductDto }) => {
    const { product } = props
    return <div className="product-item">
        {/* <Image src={getPictureUrlFromList(product.pictureIdList)[0]} /> */}
        <article className="product " data-wow-delay=".15s">
            <div className="base-info">
                <div>
                    <div className="product-figure">
                        <img src={getPictureUrlFromList(product.pictureIdList)[0]} alt="" width="161" height="162" />
                    </div>
                    <div className="product-rating">
                        {Array.from({ length: 5 }, (_, i) => i + 1).map((i: any, idx: any) => {
                            if (idx < product.score) return <span className="mdi mdi-star"></span>
                            return <span className="mdi mdi-star text-gray-13"></span>
                        })}
                    </div>
                </div>
                <div>
                    <h6 className="product-title">{product.name}</h6>
                    <div className="product-price-wrap">

                        {(product.discountPrice < product.price && product.discountPrice > 0) ?
                            <>
                                <div className="product-price product-price-old">{product.price} zł</div>
                                <div className="product-price">{product.discountPrice} zł</div></>
                            : <div className="product-price">{product.price} zł</div>
                        }
                    </div>
                    <div className="description" dangerouslySetInnerHTML={{ __html: product.description }}>
                    </div>
                </div>

            </div>


            {(product.discountPrice < product.price && product.discountPrice > 0) ? <span className="product-badge product-badge-sale">Sale</span> : ""}
        </article>
    </div>
}
const BannerSection = () => {
    const
        [page, setPage] = useState<PageDto>(),
        [category, setCategory] = useState<CategoryDto>(),
        cat = location.pathname.split("/")[location.pathname.split("/").length - 1],
        getCategory = async () => {
            let resCat = await axios.get(baseApiUrl + `/GetCategory/${cat}`)
            if (resCat.status == 200) {
                setCategory(resCat.data)
            } else {
                location.href = "/Error"
            }
        }


    React.useEffect(() => {
        getCategory()
    }, [])
    return <section className="bg-gray-7">
        <div className="breadcrumbs-custom box-transform-wrap context-dark">
            <div className="container">
                <h3 className="breadcrumbs-custom-title">{category?.name || ""}</h3>
                <div className="breadcrumbs-custom-decor"></div>
            </div>
            <div className="box-transform" style={{ backgroundImage: `url(${getPictureUrlFromList(category?.pictureIdList)[0]})` }}></div>
        </div>
        <div className="container">
            <ul className="breadcrumbs-custom-path">
                <li><a href="/">Home</a></li>
                <li className="active">{category?.name || ""}</li>
            </ul>
        </div>
    </section>
}

const root = document.getElementById("react_root");
ReactDOM.render(<CategoryPage />, root);
