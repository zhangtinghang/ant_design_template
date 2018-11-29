/**
 * 该插件可根据菜单配置自动生成 ANTD menu组件
 * menuData示例：
 * [
 *  {
 *    title: '菜单标题',
 *    icon: '菜单图标',
 *    path: '菜单路由',
 *    invisible: 'boolean, 是否不可见',
 *    children: [子菜单配置]
 *  },
 *  {
 *    title: '菜单标题',
 *    icon: '菜单图标',
 *    path: '菜单路由',
 *    invisible: 'boolean, 是否不可见',
 *    children: [子菜单配置]
 *  }
 * ]
 **/
import Menu from 'ant-design-vue/es/menu'
import Icon from 'ant-design-vue/es/icon/icon'

const {Item, SubMenu} = Menu

export default {
  name: 'IMenu',
  props: {
    menuData: {
      type: Array,
      required: false,
      default: [
        {
          title: '菜单标题',
          icon: 'dashboard',
          path: '/',
          invisible: true,
          children: []}
      ]
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      openKeys: [],
      selectedKeys: [],
      cachedOpenKeys: []
    }
  },
  computed: {
    rootSubmenuKeys: (vm) => {
      let keys = []
      vm.menuData.forEach(item => {
        keys.push(item.path)
      })
      return keys
    }
  },
  created () {
    this.updateMenu()
  },
  watch: {
    collapsed (val) {
      if (val) {
        this.cachedOpenKeys = this.openKeys
        this.openKeys = []
      } else {
        this.openKeys = this.cachedOpenKeys
      }
    },
    '$route': function () {
      this.updateMenu()
    }
  },
  methods: {
    //4. 渲染图标
    renderIcon: function (h, icon) {
      return icon === 'none' ? null
        : h(
          Icon,
          {
            props: {type: icon !== undefined ? icon : ''}
          })
    },
    // 5. 如果没有子集
    renderMenuItem: function (h, menu, pIndex, index) {
      return h(
        Item,
        {
          key: menu.path ? menu.path : 'item_' + pIndex + '_' + index
        },
        [
          h(
            'a',
            {attrs: {href: '#' + menu.path}},
            [
              this.renderIcon(h, menu.icon),
              h('span', [menu.name])
            ]
          )
        ]
      )
    },
    //3. 如果有子集
    /**
     * pIndex = 0
     * index 当前下标
     * title 可选 
     * <span>
     *  <i>图标</i>
     * <span></span>
     * </span>
     */
    renderSubMenu: function (h, menu, pIndex, index) {
      var this2_ = this
      var subItem = [h('span',
        {slot: 'title'},
        [
          this.renderIcon(h, menu.icon),
          h('span', [menu.name])
        ]
      )]
      var itemArr = []
      var pIndex_ = pIndex + '_' + index
      //开始遍历子集
      menu.children.forEach(function (item, i) {
        itemArr.push(this2_.renderItem(h, item, pIndex_, i))
      })
      return h(
        SubMenu,
        {key: menu.path ? menu.path : 'submenu_' + pIndex + '_' + index},
        subItem.concat(itemArr)
      )
    },
    //2. 过滤需隐藏路由
    renderItem: function (h, menu, pIndex, index) {
      if (!menu.invisible) {
        if(menu.children && menu.children.length === 1){
          return this.renderMenuItem(h, menu, pIndex, index)
        }
        return menu.children ? this.renderSubMenu(h, menu, pIndex, index) : this.renderMenuItem(h, menu, pIndex, index)
      }
    },
    renderMenu: function (h, menuTree) {
      var this2_ = this
      var menuArr = []
      //1. 遍历第一层
      menuTree.forEach(function (menu, i) {
        menuArr.push(this2_.renderItem(h, menu, '0', i))
      })
      return menuArr
    },
    onOpenChange (openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    },
    //更新路由？
    updateMenu () {
      let routes = this.$route.matched.concat()
      this.selectedKeys = [routes.pop().path]
      let openKeys = []
      routes.forEach((item) => {
        openKeys.push(item.path)
      })
      this.collapsed || this.mode === 'horizontal' ? this.cachedOpenKeys = openKeys : this.openKeys = openKeys
    }
  },
  render (h) {
    return h(
      Menu,
      {
        props: {
          theme: this.$props.theme,
          mode: this.$props.mode,
          openKeys: this.openKeys,
          selectedKeys: this.selectedKeys
        },
        on: {
          openChange: this.onOpenChange,
          select: (obj) => {
            this.selectedKeys = obj.selectedKeys
            this.$emit('select', obj)
          }
        }
      }, this.renderMenu(h, this.menuData)
    )
  }
}
