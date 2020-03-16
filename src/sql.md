# 数据库
##### taobao_task
    create database taobao_task default character set utf8;

# 数据表

##### task 任务表
    create table task(
        id bigint auto_increment primary key comment '任务id',
        shop_id bigint not null comment '店铺id',
        name varchar(128) default null comment '商品名称',
        linkUrl varchar(500) not null comment '商品链接',
        photoUrl varchar(500) not null comment '商品主图链接',
        price decimal(5, 2) default null comment '展示价',
        coupon_amount decimal(5, 2) default 0 comment '优惠券金额',
        status tinyint not null default 1 comment '任务状态 0：未完成 1：已完成 -1：已取消',
        deadline date not null comment '任务截止日期',
        created_time timestamp not null default current_timestamp comment '创建时间',
        updated_time timestamp not null default current_timestamp on update current_timestamp comment '更新时间',
        
        foreign key (shop_id) references shop(id)
    ) engine=InnoDB default charset=utf8 comment='任务表'
    
##### task 任务明细表   
    create table task_detail(
        id bigint auto_increment primary key comment '任务明细id',
        task_id bigint not null comment '任务id',
        keyword varchar(200) not null comment '关键词',
        count int not null comment '关键字使用次数',
        sku varchar(10) default null comment '商品规格 例如：XL',
        price decimal(5, 2) default null comment '下单价',
        created_time timestamp not null default current_timestamp comment '创建时间',
        updated_time timestamp not null default current_timestamp on update current_timestamp comment '更新时间',
        
        foreign key (task_id) references task(id)
    ) engine=InnoDB default charset=utf8 comment='任务明细表'
    
    
##### users 用户表
    create table users(
        id bigint auto_increment primary key comment '用户id',
        name varchar(20) not null comment '用户姓名',
        username varchar(30) not null comment '登录账户',
        password varchar(128) not null comment '登录密码',
        type tinyint not null comment '用户类型 1: 管理员 2：业务员',
        status tinyint not null default 1 comment '状态 1：启用 0：禁用',
        created_time timestamp not null default current_timestamp comment '创建时间',
        updated_time timestamp not null default current_timestamp on update current_timestamp comment '更新时间'
    ) engine=InnoDB default charset=utf8 comment='用户表'
    
##### shop 店铺表
    create table shop(
         id bigint auto_increment primary key comment '店铺id',
         name varchar(64) not null comment '店铺名称',
         status tinyint not null default 1 comment '状态 1：启用 0：禁用',
         created_time timestamp not null default current_timestamp comment '创建时间',
         updated_time timestamp not null default current_timestamp on update current_timestamp comment '更新时间'
    ) engine=InnoDB default charset=utf8 comment='店铺表'
    
##### guest 刷手表
    create table guest(
        id bigint auto_increment primary key comment '刷手id',
        user_id bigint not null comment '业务员id',
        wangwang varchar(50) not null comment '刷手旺旺号',
        weixin varchar(50) default null comment '刷手微信号',
        created_time timestamp not null default current_timestamp comment '创建时间',
        updated_time timestamp not null default current_timestamp on update current_timestamp comment '更新时间',
        
        foreign key (user_id) references users(id)
    ) engine=InnoDB default charset=utf8 comment='刷手表'
    
    
##### task_process 任务处理表
    create table task_process(
        id bigint auto_increment primary key comment '任务处理id',
        task_detail_id bigint not null comment '任务明细id',
        user_id bigint not null comment '用户（业务员）id',
        guest_id bigint not null comment '刷手id',
        price decimal(5, 2) comment '实付价',
        order_no bigint not null comment '订单编号',
        status tinyint not null default 0 comment '处理状态 0：已接单 1：处理成功 -1：取消'
        created_time timestamp not null default current_timestamp comment '创建时间',
        updated_time timestamp not null default current_timestamp on update current_timestamp comment '更新时间',
        
        foreign key (task_detail_id) references task_detail(id),
        foreign key (user_id) references users(id),
        foreign key (guest_id) references guest(id)
    ) engine=InnoDB default charset=utf8 comment='任务处理表'

