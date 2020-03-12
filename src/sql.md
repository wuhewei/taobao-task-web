# 数据库
##### taobao_task

# 数据表

##### task 任务表
    create table task(
        id bigint primary key comment '任务id',
        shop_id bigint not null comment '店铺id',
        keywords varchar(200) not null comment '关键字',
        count int not null comment '任务单数',
        photoUrl varchar(500) not null comment '商品图片链接',
        linkUrl varchar(500) not null comment '商品链接',
        status tinyint not null commment '任务状态 1：启用 2：禁用',
        created_time datetime default now() comment '创建时间'
        updated_time datetime default now() comment '更新时间'
    )
    
##### users 用户表
    id: 用户id
    name: 用户姓名
    username: 登录账号
    password: 登录密码
    wangwang: 旺旺号
    type: 用户类型 1: 管理员 2：业务员
    status: 用户状态 1：启用 2：禁用
    created_time: 创建时间
    updated_time: 更新时间
    
##### shop 店铺表
    id: 店铺id
    name: 店铺名称
    status: 店铺状态
    created_time: 创建时间
    updated_time: 更新时间
    
##### task_process 任务处理表
    id: 任务处理id
    task_id: 任务id
    user_id: 处理人id,
    status: 处理状态 1：处理成功 0：已接单
    created_time: 创建时间
    updated_time: 更新时间

