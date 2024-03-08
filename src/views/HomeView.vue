<script setup lang="ts">
import {onMounted, reactive} from "vue";

import axios from 'axios';
// import logo from "../assets/imgs/logo.png"
// import logo from "../assets/imgs/logo1.webp"
// import logo from "../assets/imgs/logo2.webp"
import logo from "../assets/imgs/logo3.webp"
// import logo from "../assets/imgs/logo4.webp"
// import logo from "../assets/imgs/logo5.webp"
// import logo from "../assets/imgs/logo6.webp"

const state = reactive({
    bannerList: [],
    picList: [],
    recommendL: [],
    config: {} as any,
    baseUrl: 'https://9z6wbhg0afsd.xyz/uploads/'
})

const download = function (item: any) {
    console.log(item)
    let type: string = ''
    const userAgent: any = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
        type = "iOS";
    } else if (/android/.test(userAgent)) {
        type = "Android";
    } else {
        type = "其他";
    }
    if (type === 'iOS' && item.ios_download) {
        window.open(item.ios_download)
    } else if (type === 'Android' && item.android_download) {
        window.open(item.android_download)
    } else {
        console.log('other')
    }

    // 统计点击量  非安卓或ios 不计数
    if (type !== 'iOS' && type !== 'Android') return
    let app_type = type === "iOS" ? 2 : 1
    axios({
        method: 'post',
        url: 'https://9z6wbhg0afsd.xyz/api/products',
        // url: '/api/addDownload',
        data: {
            app_id: item.id,
            type: app_type,   //(1安卓,2IOS)
        }
    }).then(res => {
        console.log('success')
    });
}

const getBannerList = function () {
    axios({
        method: 'post',
        url: 'https://9z6wbhg0afsd.xyz/api/products',
        // url: '/api/products',
        data: {
            type: '1',   //产品类型 1:轮播,2:列表,3:推荐
        }
    }).then(res => {
        res?.data?.data?.data.forEach((item: any) => {
            item.product_img = state.baseUrl + item.product_img
            state.bannerList.push(item as any)
        })
    });
    axios({
        method: 'post',
        url: 'https://9z6wbhg0afsd.xyz/api/products',
        // url: '/api/products',
        data: {
            type: '2',   //产品类型 1:轮播,2:列表,3:推荐
        }
    }).then(res => {
        res?.data?.data?.data.forEach((item: any) => {
            item.product_img = state.baseUrl + item.product_img
            state.picList.push(item as any)
        })
    });
    axios({
        method: 'post',
        url: 'https://9z6wbhg0afsd.xyz/api/products',
        // url: '/api/products',
        data: {
            type: '3',   //产品类型 1:轮播,2:列表,3:推荐
        }
    }).then(res => {
        res?.data?.data?.data.forEach((item: any) => {
            item.product_img = state.baseUrl + item.product_img
            state.recommendL.push(item as any)
        })
    });
    axios({
        method: 'post',
        url: 'https://9z6wbhg0afsd.xyz/api/configs',
        // url: '/api/configs',
    }).then(res => {
        state.config = res?.data?.data
        document.title = state.config?.[1]?.split('-')[1]
    });
}

const collectWeb = function (): void {
    let url = window.location.href;
    let title = document.title;
    if (window.sidebar && window.sidebar.addPanel) { // Firefox
        window.sidebar.addPanel(title, url, '');
    } else if (window.external && ('AddFavorite' in window.external)) { // IE
        window.external.AddFavorite(url, title);
    } else if (window.external && ('addBookmark' in window.external)) { // UC浏览器
        window.external.addBookmark(url, title);
    } else {
        alert("请使用浏览器的收藏功能来添加书签！");
    }
}

onMounted(() => {
    getBannerList()
})

</script>

<template>
    <div class="box">
        <div class="top">
            <div class="left">
                <img :src="logo" alt="">
            </div>
            <div class="right" @click="collectWeb">
                站点收藏
            </div>
        </div>
        <div class="banner-list-box">
            <div class="list">
                <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                    <van-swipe-item v-for="(item,i) in state.bannerList">
                        <img class="banner" :src="item.product_img" @click="download(item)" alt="">
                    </van-swipe-item>
                </van-swipe>
            </div>
        </div>
        <div class="down-list-box">
            <div class="d-list" v-for="(item,i) in state.picList" :key="i">
                <img :src="item.product_img" alt="">
                <div class="txt txt-name">{{ item.product_name }}</div>
                <div class="txt txt-download" @click="download(item)">↓下载</div>
            </div>
            <div v-for="i in 5 - 22%5" class="d-list" :key="i">
            </div>
        </div>
        <div class="recommend">
            <div class="txt-title">推荐</div>
            <div class="list-box">
                <div class="list" v-for="(item,i) in state.recommendL">
                    <img :src="item.product_img" alt="">
                    <div class="left-content">
                        <div class="click">{{ item.product_name }}</div>
                        <div class="num"> 点击量 <span>{{ item.download_count }}</span></div>
                    </div>
                    <div class="right" @click="download(item)">↓下载</div>
                </div>
            </div>
        </div>
        <div class="bot">商务合作联系： <span>{{ state.config?.[3]?.split('-')[1] }}</span></div>
    </div>
</template>
<style>

</style>

<style scoped lang="scss">
.box {
    margin: auto;
    max-width: 750px;
    display: flex;
    flex-direction: column;

    .top {
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: space-between;

        .left {
            //margin-left: 10px;
            border-radius: 5px;
            height: 60px;
            overflow: hidden;
            display: flex;

            img {
                border-radius: 4px;
                height: 40px;
                //height: 30px;
                //width: 20px;
                margin: 10px 5px;
                border: 1px solid #F01D27;
            }
        }

        .right {
            cursor: pointer;
            width: 100px;
            height: 40px;
            border: 1px solid pink;
            margin: 10px 10px 0 0;
            border-radius: 8px;
            line-height: 40px;
            text-align: center;
            background-color: #29191A;
            color: #C22354;
        }
    }

    .banner-list-box {
        width: 100%;
        height: auto;

        .my-swipe {
            border-radius: 6px;
        }

        .banner {
            display: block;
            width: 98%;
            margin: auto;
            border-radius: 6px;
        }
    }

    .down-list-box {
        width: 100%;
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;

        .d-list {
            width: 18%;
            margin: 10px 0;
            display: flex;
            flex-direction: column;
            text-align: center;
            font-size: 13px;


            & > img {
                display: block;
                width: 55px;
                height: 55px;
                margin: auto;
            }

            .txt {
                height: 26px;
                line-height: 26px;
            }

            .txt-name {
                color: #666;
            }

            .txt-download {
                cursor: pointer;
                color: #ff495c;
                border-radius: 27px;
                width: 70px;
                height: 27px;
                border: 2px solid #ff495c;
                margin: auto;
                font-size: 14px;
                line-height: 26px;
            }
        }

    }

    .recommend {
        margin-top: 10px;

        .txt-title {
            width: 88px;
            height: 46px;
            color: #f55b04;
            line-height: 46px;
            font-size: 24px;
            font-family: "Helvetica Neue", sans-serif;
            position: relative;
            text-align: center;
        }

        .txt-title:after {
            position: absolute;
            background-color: #f55b04;
            content: '';
            height: 3px;
            width: 60%;
            left: 20%;
            right: 0;
            bottom: 0px;
        }

        .list-box {
            margin-top: 6px;
            display: flex;
            flex-direction: column;

            .list {
                padding: 12px 0;
                width: 94%;
                margin: auto;
                height: 76px;
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #e8e8e8;

                img {
                    width: 60px;
                    height: 60px;
                    border-radius: 5px;
                }

                .left-content {
                    margin-left: 10px;
                    width: 76%;
                    display: flex;
                    flex-direction: column;

                    .click {
                        color: #000;
                        font-size: 16px;
                        height: 38px;
                        line-height: 38px;
                    }

                    .num {
                        color: #8a8a8a;
                        font-size: 12px;

                        span {
                            color: #ff0000;
                        }
                    }
                }

                .right {
                    cursor: pointer;
                    color: #ff495c;
                    border-radius: 27px;
                    width: 70px;
                    height: 27px;
                    border: 2px solid #ff495c;
                    margin: auto;
                    font-size: 14px;
                    line-height: 26px;
                    text-align: center;

                }
            }
        }
    }

    .bot {
        height: 100px;
        text-align: center;
        font-size: 20px;
        line-height: 100px;

        span {
            color: #f55b04;
            font-weight: bold;
        }
    }
}

</style>
