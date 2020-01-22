<i18n src="./locale.json"></i18n>
<template lang="html">
  <div class="navi-mobile" v-if="isMobile">
    <div class="logo-wrapper">
      <router-link to="/">
        <img src="../../assets/img/logo2.svg" alt="" />
        <span class="sub-title">Labs</span>
      </router-link>
    </div>
    <div class="menu">
      <div class="icon" @click="toggleMenu(false)" v-if="isMenuDropdown">
        <img src="./img/down.svg" alt="" />
      </div>
      <div class="icon" @click="toggleMenu(true)" v-else>
        <img src="./img/menu.svg" alt="" />
      </div>
      <div :class="['container', isMenuDropdown ? 'slide-down' : '']">
        <ul class="unit">
          <li class="item submenu">
            <div @click="toggleSubMenu(0)" class="submenu-title">
              <span>PolkaCube</span>
              <span>
                <span>Kusama CC3</span>
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="menu">
      <div class="icon" @click="toggleLangMenu">
        {{ language }}
      </div>
      <div :class="['container', isLangMenuDropdown ? 'slide-down' : '']">
        <ul class="lang" @click="menuItemClick">
          <li class="item" v-if="locale != 'zh-CN'" @click.stop="switchLanguage('zh-CN')">
            简中
          </li>
          <li class="item" v-if="locale != 'zh-TW'" @click.stop="switchLanguage('zh-TW')">
            繁中
          </li>
          <li class="item" v-if="locale != 'en-US'" @click.stop="switchLanguage('en-US')">
            EN
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="navi-pc" v-else-if="!isMobile">
    <div class="navi-pc-wrapper">
      <div class="left">
        <div class="logo">
          <router-link to="/">
            <div class="icon"></div>
          </router-link>
        </div>
        <div class="sub-title">Labs</div>

        <div class="item" v-if="$route.path !== '/'">
          <el-popover popper-class="popover-navi" :close-delay="0" trigger="hover">
            <ul class="list">
              <li v-for="chain in chainTypes" :key="chain[0]">
                <router-link :to="chain[0]">{{ chain[1] }}</router-link>
              </li>
            </ul>
            <div slot="reference">
              <a href="javascript:;">{{ chainType }}</a>
              <span class="triangle" style="margin-left: 20px;"></span>
            </div>
          </el-popover>
        </div>
        <div class="item" v-if="$route.path.includes('polka')">
          <el-popover popper-class="popover-navi" :close-delay="0" trigger="hover">
            <ul class="list">
              <li>
                <span>Kusama CC3</span>
              </li>
            </ul>
            <div slot="reference">
              <a href="javascript:;">Kusama CC3</a>
              <span class="triangle" style="margin-left: 20px;"></span>
            </div>
          </el-popover>
        </div>
      </div>
      <div class="right">
        <div class="split-line" v-if="$route.path === '/'"></div>
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
            </ul>
            <span slot="reference">
              <div class="icon-lang"></div>
              <a href="javascript:;">{{ $t('language') }}</a>
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
