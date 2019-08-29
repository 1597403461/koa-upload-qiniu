const statusCode = {
  SUCCESS: (msg, data) => ({
    code: 0,
    msg,
    data,
  }),
  ERROR_SQL: (msg) => ({ // 访问数据库异常
    code: 1,
    msg,
  }),
  ERROR_SYSTEM: (msg) => ({ // 系统未知错误
    code: 2,
    msg,
  }),
  ERROR_PARAMETER: (msg) => ({ // 系统参数错误
    code: 3,
    msg,
  }),
  ERROR_EXISTED: (msg) => ({ // 用户已经存在
    code: 4,
    msg,
  }),
  ERROR_AUTH: (msg) => ({ // 系统权限错误
    code: 401,
    msg,
  }),
  ERROR_LOGIN: (msg) => ({ // 登录失败
    code: -1,
    msg,
  }),
  ERROR_ARG: (msg) => ({ // 传参错误
    code: -1,
    msg,
  }),
};
module.exports = statusCode

