/*
 Navicat Premium Data Transfer

 Source Server         : 本地数据库
 Source Server Type    : MySQL
 Source Server Version : 80030
 Source Host           : localhost:3306
 Source Schema         : yzgl

 Target Server Type    : MySQL
 Target Server Version : 80030
 File Encoding         : 65001

 Date: 10/12/2023 23:00:11
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for yz_article
-- ----------------------------
DROP TABLE IF EXISTS `yz_article`;
CREATE TABLE `yz_article`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `article_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文章标题 不能为空',
  `author_id` int NOT NULL DEFAULT 1 COMMENT '文章作者 不能为空',
  `category_id` int NOT NULL COMMENT '分类ID 不能为空',
  `article_description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文章描述 不能为空',
  `article_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '文章内容',
  `article_cover` varchar(1234) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '' COMMENT '文章缩略图',
  `status` int NULL DEFAULT 1 COMMENT '文章状态 1 公开 2 私密 3 草稿箱',
  `article_types` int NULL DEFAULT 1 COMMENT '文章类型 1 原创 2 转载 3 翻译',
  `origin_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '原文链接 是转载或翻译的情况下提供',
  `view_times` int NULL DEFAULT 0 COMMENT '文章访问次数',
  `thumbs_up_times` int NULL DEFAULT 0 COMMENT '文章点赞次数',
  `reading_duration` double NULL DEFAULT 0 COMMENT '文章阅读时长',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of yz_article
-- ----------------------------
INSERT INTO `yz_article` VALUES (1, '测试文章2', 1, 2, '测试测试测试', '测试测试测试', '', 3, 1, NULL, 0, 0, 0, '2023-12-09 13:36:49', '2023-12-10 06:05:04', NULL);
INSERT INTO `yz_article` VALUES (2, '测试文章2', 1, 2, '测试测试测试', '测试测试测试', '', 1, 1, NULL, 0, 0, 0, '2023-12-09 13:36:50', '2023-12-09 13:36:50', NULL);
INSERT INTO `yz_article` VALUES (3, '测试文章2', 1, 2, '测试测试测试', '测试测试测试', '', 3, 1, NULL, 0, 0, 0, '2023-12-09 13:36:51', '2023-12-10 06:12:24', '2023-12-10 07:08:08');
INSERT INTO `yz_article` VALUES (4, '米娜测试发表文章', 1, 2, '测试测试测试', '测试成功', '', 1, 1, NULL, 0, 0, 0, '2023-12-10 09:24:22', '2023-12-10 09:24:22', NULL);

-- ----------------------------
-- Table structure for yz_users
-- ----------------------------
DROP TABLE IF EXISTS `yz_users`;
CREATE TABLE `yz_users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户名,唯一',
  `password` char(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '密码',
  `role` int NOT NULL DEFAULT 2 COMMENT '用户角色 1 管理员 2 普通用户',
  `nick_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '' COMMENT '用户昵称',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'http://localhost:8888/11d9bb8bf54125a26464b5c00.jpg' COMMENT '用户头像',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `user_name`(`user_name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of yz_users
-- ----------------------------
INSERT INTO `yz_users` VALUES (1, '枫叶管理员', '$2a$10$HaJMy0yE.AOX4Lq1wEQcJOJodQlyQ55ra61kVUttdzkgtK3QQuyPS', 1, '米娜', 'http://localhost:8888/11d9bb8bf54125a26464b5c00.jpg', '2023-12-10 11:58:43', '2023-12-10 11:58:43');
INSERT INTO `yz_users` VALUES (2, 'test', '$2a$10$bsEeLskmAMypOPHV4GXtxOxokVqIqaEIjAbFVbUH0yt7I1gBIX5nS', 2, '测试用户', 'http://localhost:8888/11d9bb8bf54125a26464b5c00.jpg', '2023-12-10 11:59:30', '2023-12-10 11:59:30');

SET FOREIGN_KEY_CHECKS = 1;
