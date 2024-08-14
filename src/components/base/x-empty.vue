<script setup></script>

<template>
  <div class="x-empty flex flex-col justify-center items-center py-6">
    <img src="@/assets/images/empty.png" class="h-24" alt="empty" />
    <div class="text-xs text-[#9ca0ac]">
      <template v-if="$slots.text">
        <slot name="text" />
      </template>
      <template v-else>
        {{ $t("texts.empty") }}
      </template>
    </div>
  </div>
</template>

<style lang="scss"></style>
