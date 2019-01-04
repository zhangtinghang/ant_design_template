<template>
    <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff' }">
        <transition>
            <router-view></router-view>
        </transition>
    </a-layout-content>
</template>
