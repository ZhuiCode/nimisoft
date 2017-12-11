const CONF = {
    port: '5757',
    rootPathname: '',

    // 微信小程序 App ID
    appId: 'wx576119495658127c',

    // 微信小程序 App Secret
    appSecret: '584165b27243121807214d89ffadbb73', 

    // 是否使用腾讯云代理登录小程序
    useQcloudLogin: true,
    key:"ltpth0906yxwth199096thlychint123",
    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    mysql: {
        host: '172.17.0.15',
        port: 3306,
        user: 'root',
        db: 'cAuth',
        pass: 'pi_mysql_123',
        char: 'utf8mb4'
    },
    cos: {
        /**
         * 区域
         * 华北：cn-north
         * 华东：cn-east
         * 华南：cn-south
         * 西南：cn-southwest
         * 新加坡：sg
         * @see https://www.qcloud.com/document/product/436/6224
         */
        region: 'ap-guangzhou',
        // Bucket 名称
        fileBucket: 'wximg',
        // 文件夹
        uploadFolder: ''
    },

    // 微信登录态有效期
    wxLoginExpires: 7200
}

module.exports = process.env.NODE_ENV === 'local' ? Object.assign({}, CONF, require('./config.local')) : CONF;
