define({ "api": [
  {
    "type": "get",
    "url": "/admin/space/image/page",
    "title": "获取图片信息列表",
    "group": "图片空间",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "typeId",
            "description": "<p>类别编号</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ImageSpaceInfo[]",
            "optional": false,
            "field": "data.list",
            "description": "<p>图片信息列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.pagination",
            "description": "<p>分页信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.pagination.page",
            "description": "<p>当前页数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.pagination.size",
            "description": "<p>限制个数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.pagination.total",
            "description": "<p>总数量</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/space/image.ts",
    "groupTitle": "图片空间",
    "name": "GetAdminSpaceImagePage",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/admin/space/image/type/list",
    "title": "获取图片空间类别列表",
    "group": "图片空间",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "data",
            "description": "<p>图片空间类别列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/space/image.ts",
    "groupTitle": "图片空间",
    "name": "GetAdminSpaceImageTypeList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/admin/space/image/delete",
    "title": "删除空间类别下的图片列表",
    "group": "图片空间",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number[]",
            "optional": false,
            "field": "imageIds",
            "description": "<p>图片ID列表</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/space/image.ts",
    "groupTitle": "图片空间",
    "name": "PostAdminSpaceImageDelete",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/admin/space/image/type/add",
    "title": "新增图片空间类别",
    "group": "图片空间",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>类别名称</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/space/image.ts",
    "groupTitle": "图片空间",
    "name": "PostAdminSpaceImageTypeAdd",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/admin/space/image/type/delete",
    "title": "删除图片空间类别",
    "group": "图片空间",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "typeId",
            "description": "<p>类别编号</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/space/image.ts",
    "groupTitle": "图片空间",
    "name": "PostAdminSpaceImageTypeDelete",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/admin/space/image/upload",
    "title": "图片上传(表单)",
    "group": "图片空间",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "typeId",
            "description": "<p>图片ID列表</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/space/image.ts",
    "groupTitle": "图片空间",
    "name": "PostAdminSpaceImageUpload",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/admin/captcha/img",
    "title": "获取图片验证码",
    "group": "登陆验证类",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "width",
            "defaultValue": "100",
            "description": "<p>图片宽度</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "height",
            "defaultValue": "50",
            "description": "<p>图片高度</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.img",
            "description": "<p>base64格式的验证码图片字符串</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.id",
            "description": "<p>验证码对应ID</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/comm/login.ts",
    "groupTitle": "登陆验证类",
    "name": "GetAdminCaptchaImg",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/admin/permmenu",
    "title": "获取权限及菜单",
    "group": "登陆验证类",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "data.menus",
            "description": "<p>菜单</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "data.perms",
            "description": "<p>权限描述</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/comm/login.ts",
    "groupTitle": "登陆验证类",
    "name": "GetAdminPermmenu",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/admin/person",
    "title": "获取当前登录用户信息",
    "group": "登陆验证类",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>管理员信息实体类</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/comm/login.ts",
    "groupTitle": "登陆验证类",
    "name": "GetAdminPerson",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/admin/login",
    "title": "管理员登陆",
    "group": "登陆验证类",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>用户名，AES加密</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码，AES加密</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "captchaId",
            "description": "<p>验证码ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "verifyCode",
            "description": "<p>填写的验证码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.token",
            "description": "<p>用户Token</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/comm/login.ts",
    "groupTitle": "登陆验证类",
    "name": "PostAdminLogin"
  },
  {
    "type": "post",
    "url": "/admin/logout",
    "title": "管理员登出",
    "group": "登陆验证类",
    "version": "0.0.0",
    "filename": "app/controller/admin/comm/login.ts",
    "groupTitle": "登陆验证类",
    "name": "PostAdminLogout",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/admin/person",
    "title": "更新管理员信息",
    "group": "登陆验证类",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nickName",
            "description": "<p>别名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>邮箱</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>手机</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "originPassword",
            "description": "<p>更改前密码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newPassword",
            "description": "<p>新密码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "remark",
            "description": "<p>备注</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "headImg",
            "description": "<p>头像</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/comm/login.ts",
    "groupTitle": "登陆验证类",
    "name": "PostAdminPerson",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      }
    }
  }
] });
