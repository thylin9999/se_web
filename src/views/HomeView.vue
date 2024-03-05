<script setup lang="ts">
import {reactive} from "vue";
// import ban1 from "../assets/imgs/b1.png"
import ban2 from "../assets/imgs/b2.png"
import ban3 from "../assets/imgs/b3.png"

const state = reactive({
    bannerList: [ban2, ban3]
})

const download = function () {
    let type: string = ''
    const userAgent:any = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
        type = "iOS";
    } else if (/android/.test(userAgent)) {
        type = "Android";
    } else {
        type = "其他";
    }
    if (type === 'iOS') {
        console.log('iOS')
    } else if (type === 'Android') {
        console.log('Android')
    } else {
        console.log('other')
    }
}
</script>

<template>
    <div class="box">
        <div class="top">
            <div class="left">
                <img :src="state.bannerList[0]" alt="">
            </div>
            <div class="right">
                站点收藏
            </div>
        </div>
        <div class="banner-list-box">
            <div class="list">
                <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                    <van-swipe-item v-for="item in state.bannerList">
                        <img style="width: 100%" :src="item" alt="">
                    </van-swipe-item>
                </van-swipe>
            </div>
        </div>
        <div class="down-list-box">
            <div class="d-list" v-for="index in 22">
                <img src="../assets/imgs/i1.png" alt="">
                <div class="txt txt-name">名称</div>
                <div class="txt txt-download" @click="download()">↓下载</div>
            </div>
            <div v-for="i in 5 - 22%5" class="d-list" :key="i">
            </div>
        </div>
        <div class="recommend">
            <div class="txt-title">推荐</div>
            <div class="list-box">
                <div class="list" v-for="i in 15">
                    <img src="../assets/imgs/i4.png" alt="">
                    <div class="left-content">
                        <div class="click">app名字</div>
                        <div class="num"> 点击量 <span>10000</span></div>
                    </div>
                    <div class="right" @click="download()">↓下载</div>
                </div>
            </div>
        </div>
        <div class="bot">商务合作联系： <span>xinyi6688</span></div>
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
        //background-color: pink;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid pink;

        .left {
            img {
                //width: 160px;
                height: 50px;
                margin: 5px;
            }
        }

        .right {
            width: 100px;
            height: 40px;
            border: 1px solid pink;
            margin: 10px 20px 0 0;
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
    }

    .down-list-box {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;

        .d-list {
            width: 18%;
            //margin: 2%;
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
