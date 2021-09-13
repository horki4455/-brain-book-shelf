<template>
  <ul ref="breadcrumb" class="breadcrumb-wrapper">
    <li v-for="(breadCrumb, index) in breadCrumbs" :key="breadCrumb.text">
      <span v-if="index === breadCrumbs.length - 1" class="item-text">{{ breadCrumb.text }}</span>
      <a
        v-else
        class="item-link"
        :href="
          breadCrumb.path != '' ? `${breadCrumb.path}` : `/`
        "
      >{{ breadCrumb.text }}</a>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    breadCrumbs: { type: Array, default: () => [] },
  },
  mounted() {
    // コンポーネントが表示される時一番右側までスクロールさせる
    const breadCrumbList = this.$refs.breadcrumb;
    breadCrumbList.scrollLeft = breadCrumbList.scrollWidth;
  },
};