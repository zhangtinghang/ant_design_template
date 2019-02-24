<template>
    <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="collapsedChange"
        />
        <a-popover
        trigger="click"
        >
            <template slot="content">
            <p class="logout" @click="returnToLogin">退出登陆</p>
            </template>
            <div class="right-item">
                <img :src="avatar"/><span>欢迎您：{{username}}</span>
            </div>
        </a-popover>
    </a-layout-header>
</template>
<script>
import avatar from '@/assets/avatar.gif'
import { removeToken, removeUser } from '@/utils/auth'
export default {
    data () {
        return {
            avatar
        }
    },
    computed: {
        collapsed(){
            return this.$store.getters.sidebar
        },
        username(){
            return this.$store.state.user.user.username
        }
    },
    methods: {
        collapsedChange(){
            this.$store.dispatch('toggleSideBar').then(() => {})
        },
        returnToLogin() {
            removeToken()
            removeUser()
            this.$router.push('/login')
        }
    }
}
</script>
<style lang="scss" scoped>
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color .3s;
}

.trigger:hover {
  color: #1890ff;
}
.right-item{
    position: absolute;
    top: 0;
    right: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    & > img {
        width: 40px;
        border-radius: 90px;
    }
    & > span{
        margin-left: 20px;
    }
}
.logout{
    cursor: pointer;
}
</style>
