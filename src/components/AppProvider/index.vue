<template>
      <a-config-provider prefix-cls="custom">
    <my-app />
  </a-config-provider>
</template>

<script setup>
import 'ant-design-vue/dist/antd.min.css';
import 'ant-design-vue/dist/antd.variable.min.css';
import { ConfigProvider } from 'ant-design-vue';
ConfigProvider.config({
  prefixCls: 'custom',
  theme: {
    primaryColor: '#25b864',
  },
});
</script>

<style lang="scss" scoped>

</style>