<template lang="html">
  <div class="notfound">
    <div class="wrapper">
      <img src="@img/404.png" alt="" />
    </div>
    <div class="words">
      <div>{{ $t('notFound.tips') }}</div>
      <router-link to="/" class="btn">{{ $t('notFound.toHome') }}</router-link>
    </div>
  </div>
</template>
<style lang="scss">
.notfound {
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    vertical-align: top;
  }

  .words {
    .btn {
      display: inline-block;
      margin-top: 20px;
      padding: 0 20px;
      min-width: 120px;
      width: 100%;
      height: 40px;
      line-height: 40px;
      color: #fff;
      background-color: rgba(59, 114, 225, 0.8);
      text-align: center;
      border-radius: 6px;
    }
  }
}

html.desktop {
  .notfound {
    height: 100vh;

    img {
      height: 180px;
    }

    .words {
      margin-left: 50px;
    }
  }
}

html.mobile {
  .notfound {
    flex-direction: column;
    height: 80vh;

    img {
      width: 70vw;
    }

    .words {
      margin-top: 4vh;
      text-align: center;
    }
  }
}
</style>
