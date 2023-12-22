/*
 Navicat Premium Data Transfer

 Source Server         : 本地数据库
 Source Server Type    : MySQL
 Source Server Version : 80029
 Source Host           : localhost:3306
 Source Schema         : yzgl

 Target Server Type    : MySQL
 Target Server Version : 80029
 File Encoding         : 65001

 Date: 22/12/2023 16:40:05
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for mi_blog_config
-- ----------------------------
DROP TABLE IF EXISTS `mi_blog_config`;
CREATE TABLE `mi_blog_config`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `blog_name` varchar(55) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '米娜的小屋' COMMENT '博客名称',
  `blog_avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'http://localhost:8888/11d9bb8bf54125a26464b5c00.jpg' COMMENT '博客头像',
  `avatar_bg` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '博客头像背景图',
  `personality_signature` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '个性签名',
  `blog_notice` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '博客公告',
  `qq_link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT 'QQ链接',
  `we_chat_link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '微信链接',
  `github_link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT 'github链接',
  `git_ee_link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT 'git_ee链接',
  `view_time` int(0) NULL DEFAULT 0 COMMENT '博客访问次数',
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mi_blog_config
-- ----------------------------
INSERT INTO `mi_blog_config` VALUES (1, '米娜的小屋', 'http://localhost:8888/11d9bb8bf54125a26464b5c00.jpg', NULL, '这个人很懒，什么也没写~', NULL, NULL, NULL, NULL, NULL, 0, '2023-12-22 07:35:22', '2023-12-22 07:35:22');
INSERT INTO `mi_blog_config` VALUES (2, '米娜的小屋', 'http://localhost:8888/11d9bb8bf54125a26464b5c00.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2023-12-22 07:55:03', '2023-12-22 07:55:03');

-- ----------------------------
-- Table structure for yz_article
-- ----------------------------
DROP TABLE IF EXISTS `yz_article`;
CREATE TABLE `yz_article`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `article_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文章标题 不能为空',
  `author_id` int(0) NOT NULL DEFAULT 1 COMMENT '文章作者 不能为空',
  `category_id` int(0) NOT NULL COMMENT '分类ID 不能为空',
  `article_description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文章描述 不能为空',
  `article_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '文章内容',
  `article_cover` varchar(1234) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '' COMMENT '文章缩略图',
  `status` int(0) NULL DEFAULT 1 COMMENT '文章状态 1 公开 2 私密 3 草稿箱',
  `article_types` int(0) NULL DEFAULT 1 COMMENT '文章类型 1 原创 2 转载 3 翻译',
  `origin_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '原文链接 是转载或翻译的情况下提供',
  `view_times` int(0) NULL DEFAULT 0 COMMENT '文章访问次数',
  `thumbs_up_times` int(0) NULL DEFAULT 0 COMMENT '文章点赞次数',
  `reading_duration` double NULL DEFAULT 0 COMMENT '文章阅读时长',
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  `deletedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of yz_article
-- ----------------------------
INSERT INTO `yz_article` VALUES (1, '测试文章2', 1, 2, '测试测试测试', '测试测试测试', '', 3, 1, NULL, 0, 0, 0, '2023-12-09 13:36:49', '2023-12-10 06:05:04', NULL);
INSERT INTO `yz_article` VALUES (2, '测试文章2', 1, 2, '测试测试测试', '测试测试测试', '', 1, 1, NULL, 0, 0, 0, '2023-12-09 13:36:50', '2023-12-09 13:36:50', NULL);
INSERT INTO `yz_article` VALUES (3, '测试文章2', 1, 2, '测试测试测试', '测试测试测试', '', 3, 1, NULL, 0, 0, 0, '2023-12-09 13:36:51', '2023-12-10 06:12:24', '2023-12-10 07:08:08');
INSERT INTO `yz_article` VALUES (4, '米娜测试发表文章', 1, 2, '测试测试测试', '测试成功', '', 1, 1, NULL, 0, 0, 0, '2023-12-10 09:24:22', '2023-12-10 09:24:22', NULL);
INSERT INTO `yz_article` VALUES (5, '测试用户测试', 1, 6, '正在策划测试', '策划书', '', 1, 1, NULL, 0, 0, 0, '2023-12-11 07:03:54', '2023-12-11 07:03:54', NULL);
INSERT INTO `yz_article` VALUES (6, '测试用户测试', 1, 6, '正在策划测试', '策划书', '', 1, 1, NULL, 0, 0, 0, '2023-12-21 02:15:51', '2023-12-21 02:15:51', NULL);

-- ----------------------------
-- Table structure for yz_users
-- ----------------------------
DROP TABLE IF EXISTS `yz_users`;
CREATE TABLE `yz_users`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户名,唯一',
  `password` char(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '密码',
  `role` int(0) NOT NULL DEFAULT 2 COMMENT '用户角色 1 管理员 2 普通用户',
  `nick_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '' COMMENT '用户昵称',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'http://localhost:8888/11d9bb8bf54125a26464b5c00.jpg' COMMENT '用户头像',
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `user_name`(`user_name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of yz_users
-- ----------------------------
INSERT INTO `yz_users` VALUES (1, 'admin', '$2a$10$M3TJ5v5voL2jR.nX/gEFmOBK4S4gek7nwdNJP46OTo7GqJK5x5AQi', 1, 'admin', 'http://localhost:8888/11d9bb8bf54125a26464b5c00.jpg', '2023-12-13 09:57:10', '2023-12-13 09:57:10');
INSERT INTO `yz_users` VALUES (2, 'userTest', '$2a$10$w/.j4i92iNIFHyiRe6RBC.c/eJlOu3zJYalRY4LrXZrz88eSl4x2.', 2, '测试用户', 'http://localhost:8888/11d9bb8bf54125a26464b5c00.jpg', '2023-12-19 03:09:10', '2023-12-19 03:09:10');
INSERT INTO `yz_users` VALUES (3, 'testtest', '$2a$10$XXuUPBhJi84.schbK66BCunPKbD9HekxjnidgcBC.7YhZY3c4LaFS', 2, 'test1234', 'http://localhost:8888/11d9bb8bf54125a26464b5c00.jpg', '2023-12-20 01:53:45', '2023-12-20 01:53:45');
INSERT INTO `yz_users` VALUES (4, 'xiaomei', '$2a$10$3HAZpVc71aI6BX3GX5NeDu9RH5O8fAAnRdXAYp/k1rhIiISO7Bvaa', 2, '星星l223dxia', 'http://localhost:8888/11d9bb8bf54125a26464b5c00.jpg', '2023-12-21 02:15:08', '2023-12-21 02:15:08');
INSERT INTO `yz_users` VALUES (76743, 'administrator', 'admin', 1, '超级管理员', 'http://localhost:8888/11d9bb8bf54125a26464b5c00.jpg', '2023-12-22 08:20:50', '2023-12-22 08:20:50');

SET FOREIGN_KEY_CHECKS = 1;
