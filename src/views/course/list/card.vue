<template>
    <div class="list-container">
            <div class="list-wapper" v-for="item in card" :key="item">
                <div class="list-title">
                    <div class="list-order">订单编号：1881694986489</div>
                    <div class="list-orderTime">订单时间：2018-10-20 20:30</div>
                </div>
                <div class="list-content">
                    <div class="content-left">
                        <a-row>
                            <a-col :span="8"><span>姓名：王小明</span></a-col>
                            <a-col :span="8"><span>性别：男</span></a-col>
                            <a-col :span="8"><span>电话：188888888</span></a-col>
                        </a-row>
                        <a-row>
                            <a-col :span="8"><span>项目：篮球</span></a-col>
                            <a-col :span="8"><span>节数：10节</span></a-col>
                            <a-col :span="8"><span>上课时间：2018-10-23 20:30</span></a-col>
                        </a-row>
                        <a-row>
                            <a-col :span="8"><span>场地：西南场地</span></a-col>
                        </a-row>
                        <a-row>
                            <a-col :span="24"><span>备注：</span><span>这是一些备注这是一些备注这是一些备注这是一些备注这是一些备注</span></a-col>
                        </a-row>
                    </div>
                    <div class="content-right">
                        <div class="right-item"><a-button class="right-item-btn" type="primary">订单确认</a-button></div>
                        <div class="right-item item-text">新用户</div>
                    </div>
                </div>
                <a-divider />
            </div> 
            <div class="pagination-wapper">
                <a-pagination v-model="current" :total="50" />
            </div>
        </div>
</template>

<script>
 export default {
    data() {
      return {
        current: 2,
        card:[{},{},{},{}]
      }
    }
  }
</script>

<style lang="scss" scoped>
.list-wapper{

    .list-title{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 25px;
    }
    .list-content{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .content-left{
            flex: 8;
            & /deep/ .ant-row{
               margin-bottom: 10px;
            }
        }
        .content-right{
            flex: 2;
            text-align: right;
            .right-item-btn{
                width: 150px;
                margin-bottom: 20px;
            }
            .right-item{
                color: #1890FF;
                font-size: 20px;
            }
            .item-text{
                margin-right: 40px;
            }
        }
    }
}
.pagination-wapper{
    float: right;
}
</style>
