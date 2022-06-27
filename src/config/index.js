/**
 * 环境配置封装
 */
const env = import.meta.env.MODE || 'prod'

const EnvConfig = {
    dev: {
        baseApi: '/api',
        mockApi: 'https://www.fastmock.site/mock/3c4da7adae513cdfa25b921a09b2ec93/bmj',
        // mockApi: 'https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api',
    },
    prod: {
        baseApi: '/api'
    },
}
const wsConfig={
    dev: {
        wsUrl: '127.0.0.1',
        wsPort: '9999',
        protocol: 'ws',
        // mockApi: 'https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api',
    },
    prod: {
        wsUrl: 'api.ymfsder.com',
        wsPort: '',
        protocol: 'wss',
    },
}

export default {
    env: 'dev',
    mock: false,
    namespace: 'admin',
    ...EnvConfig[env],
    ...wsConfig[env]
}
