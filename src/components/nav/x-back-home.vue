<script setup></script>

<template>
  <div class="flex items-center justify-center">
    <router-link to="/home" custom v-slot="{ navigate }">
      <el-button type="primary" icon="Back" class="font-bold my-10 flex items-center" link @click="navigate">
        {{ $t("texts.backHome") }}
      </el-button>
    </router-link>
  </div>
</template>

<style lang="scss"></style>
