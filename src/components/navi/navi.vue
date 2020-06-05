<template lang="html">
  <div class="navi-mobile" v-if="isMobile">
    <div class="logo-wrapper">
      <router-link :to="'/' + network">
        <img src="@img/logo-h5.png" alt="" />
        <span class="sub-title">PolkaCube</span>
      </router-link>
    </div>
    <div class="menu" style="margin-right: 8px;">
      <div class="icon" @click="toggleNetworkMenu">
        {{ curNetwork }}
      </div>
      <div :class="['container', isNetworkMenuDropdown ? 'slide-down' : '']">
        <ul class="lang" @click.capture="menuItemClick">
          <li class="item" @click="toggleNet('Polkadot CC1')">
            Polkadot CC1
          </li>
          <li class="item" @click="toggleNet('Kusama')">
            Kusama
          </li>
        </ul>
      </div>
    </div>
    <div class="menu">
      <div class="icon" @click="toggleMenu" v-if="isMenuDropdown">
        <img src="./img/down.svg" alt="" />
      </div>
      <div class="icon" @click="toggleMenu" v-else>
        <img src="./img/menu.svg" alt="" />
      </div>
      <div :class="['container', isMenuDropdown ? 'slide-down' : '']">
        <ul class="unit">
          <!-- <li class="item submenu"> -->
          <!-- <div @click="toggleSubMenu(0)" class="submenu-title">
              <span>PolkaCube</span>
              <span>
                <span>Kusama</span>
                <span style="margin-left: 10px;">
                  <i class="el-icon-arrow-up" v-if="isSubMenuDropdown[0]"></i>
                  <i class="el-icon-arrow-down" v-else></i>
                </span>
              </span>
            </div>
            <div class="submenu-item" v-if="isSubMenuDropdown[0]" @click="menuItemClick">
              <router-link :to="path('/')">{{ $t('navComp.monitor') }}</router-link>
            </div>
            <div class="submenu-item" v-if="isSubMenuDropdown[0]" @click="menuItemClick">
              <router-link :to="path('/proposal')">{{ $t('navComp.Proposals & Referenda') }}</router-link>
            </div>
            <div class="submenu-item" v-if="isSubMenuDropdown[0]" @click="menuItemClick">
              <router-link :to="path('/strategy')">{{ $t('navComp.strategy') }}</router-link>
            </div>
          </li> -->
          <!-- </li> -->

          <li class="item" @click="menuItemClick">
            <router-link :to="path('/')">{{ $t('navComp.monitor') }}</router-link>
          </li>
          <li class="item" @click="menuItemClick">
            <router-link :to="path('/proposal')">{{ $t('navComp.Proposals & Referenda') }}</router-link>
          </li>
          <li class="item" @click="menuItemClick">
            <router-link :to="path('/strategy')">{{ $t('navComp.strategy') }}</router-link>
          </li>

          <li class="item">
            <a :href="`https://www.hashquark${envSuffix}.io/#/`" rel="noopener noreferrer">HashQuark</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="menu">
      <div class="icon" @click="toggleLangMenu">
        {{ language }}
      </div>
      <div :class="['container', isLangMenuDropdown ? 'slide-down' : '']">
        <ul class="lang" @click.capture="menuItemClick">
          <li class="item" v-if="locale != 'zh-CN'" @click.stop="switchLanguage('zh-CN')">
            简中
          </li>
          <li class="item" v-if="locale != 'zh-TW'" @click.stop="switchLanguage('zh-TW')">
            繁中
          </li>
          <li class="item" v-if="locale != 'en-US'" @click.stop="switchLanguage('en-US')">
            EN
          </li>
          <!-- <li class="item" v-if="locale != 'ja-JP'" @click.stop="switchLanguage('ja-JP')">
            JP
          </li> -->
        </ul>
      </div>
    </div>
  </div>

  <div class="navi-pc" v-else-if="!isMobile">
    <div class="navi-pc-wrapper">
      <div class="left">
        <div class="logo">
          <a :href="`https://www.hashquark${envSuffix}.io/#/`"><img src="@/assets/img/logo.png" alt=""/></a>
          <div class="split-line"></div>
          <router-link :to="'/' + network" class="home">PolkaCube</router-link>
        </div>
      </div>
      <div class="right">
        <div class="item">
          <el-popover popper-class="popover-navi" :close-delay="0" trigger="hover">
            <ul class="list">
              <li>
                <span @click="toggleNet('Polkadot CC1')">Polkadot CC1</span>
                <span @click="toggleNet('Kusama')">Kusama</span>
              </li>
            </ul>
            <div slot="reference">
              <a href="javascript:;">{{ curNetwork }}</a>
              <span class="triangle" style="margin-left: 20px;"></span>
            </div>
          </el-popover>
        </div>
        <div :class="['item', active(['polka']) && 'active']">
          <router-link :to="path('/')">{{ $t('navComp.monitor') }}</router-link>
        </div>
        <div :class="['item', active(['polkaProposal']) && 'active']">
          <router-link :to="path('/proposal')">{{ $t('navComp.Proposals & Referenda') }}</router-link>
        </div>
        <div :class="['item', active(['polkaStrategy']) && 'active']">
          <router-link :to="path('/strategy')">{{ $t('navComp.strategy') }}</router-link>
        </div>
        <div :class="['item last-item', active(['polkaWalletAccount', 'polkaWalletStaking']) && 'active']">
          <router-link :to="path('/account')">{{ $t('navComp.wallet') }}</router-link>
        </div>

        <div class="split-line"></div>
        <!-- <div class="item backhome">
          <a :href="`https://www.hashquark${envSuffix}.io/#/`" target="_blank" rel="noopener noreferrer">
            <img src="@/assets/img/icon-home.png" alt="" />
            {{ $t('navComp.backHome') }}
          </a>
        </div> -->
        <div class="item lang">
          <el-popover popper-class="popover-navi" trigger="hover">
            <ul class="list">
              <li v-if="locale != 'zh-CN'">
                <a href="javascript:;" @click="switchLanguage('zh-CN')">简体中文</a>
              </li>
              <li v-if="locale != 'zh-TW'">
                <a href="javascript:;" @click="switchLanguage('zh-TW')">繁體中文</a>
              </li>
              <li v-if="locale != 'en-US'">
                <a href="javascript:;" @click="switchLanguage('en-US')">English</a>
              </li>
              <!-- <li v-if="locale != 'ja-JP'">
                <a href="javascript:;" @click="switchLanguage('ja-JP')">日本語</a>
              </li> -->
            </ul>
            <span slot="reference">
              <div class="icon-lang"></div>
              <a href="javascript:;">{{ $t('navComp.language') }}</a>
            </span>
          </el-popover>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" src="./navi.scss"></style>
<style lang="scss" src="./navi.h5.scss"></style>
<script src="./navi.js"></script>
