/*
 Navicat Premium Data Transfer

 Source Server         : 本地数据库
 Source Server Type    : MySQL
 Source Server Version : 80029
 Source Host           : localhost:3306
 Source Schema         : mina

 Target Server Type    : MySQL
 Target Server Version : 80029
 File Encoding         : 65001

 Date: 10/04/2024 14:19:43
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for mi_album
-- ----------------------------
DROP TABLE IF EXISTS `mi_album`;
CREATE TABLE `mi_album`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `album_name` varchar(26) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '相册名称',
  `album_cover` varchar(555) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '相册封面',
  `description` varchar(55) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '相册描述信息',
  `createAt` datetime(0) NULL DEFAULT NULL,
  `updateAt` datetime(0) NULL DEFAULT NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  `deletedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mi_album
-- ----------------------------
INSERT INTO `mi_album` VALUES (1, '测试相册', 'http://127.0.0.1:8888/ac1a6e61b9373c26e5f1cf700', '测试相册上传以及图片上传和回收站的情况', NULL, NULL, '2024-03-19 07:23:49', '2024-03-19 07:23:49', NULL);
INSERT INTO `mi_album` VALUES (2, '测试相册2', 'http://127.0.0.1:8888/2a009a474d38ba09d252e1d00', '测试多个相册的排列', NULL, NULL, '2024-03-20 02:28:03', '2024-03-20 02:28:03', NULL);

-- ----------------------------
-- Table structure for mi_article
-- ----------------------------
DROP TABLE IF EXISTS `mi_article`;
CREATE TABLE `mi_article`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `article_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文章标题 不能为空',
  `author_id` int(0) NOT NULL DEFAULT 1 COMMENT '文章作者 不能为空',
  `category_id` int(0) NOT NULL COMMENT '分类ID 不能为空',
  `article_description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文章描述 不能为空',
  `article_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '文章内容',
  `article_cover` varchar(1234) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'http://localhost:8888/b4e81e8116e5aaf762af3e101.jpg' COMMENT '文章缩略图',
  `status` int(0) NULL DEFAULT 1 COMMENT '文章状态 1 公开 2 私密 3 草稿箱',
  `article_types` int(0) NULL DEFAULT 1 COMMENT '文章类型 1 原创 2 转载 ',
  `origin_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '原文链接 是转载或翻译的情况下提供',
  `view_times` int(0) NULL DEFAULT 0 COMMENT '文章访问次数',
  `thumbs_up_times` int(0) NULL DEFAULT 0 COMMENT '文章点赞次数',
  `reading_duration` double NULL DEFAULT 0 COMMENT '文章阅读时长',
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  `deletedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for mi_article_tag
-- ----------------------------
DROP TABLE IF EXISTS `mi_article_tag`;
CREATE TABLE `mi_article_tag`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `article_id` int(0) NULL DEFAULT NULL COMMENT '文章id',
  `tag_id` int(0) NULL DEFAULT NULL COMMENT '标签id',
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  `deletedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for mi_blog_config
-- ----------------------------
DROP TABLE IF EXISTS `mi_blog_config`;
CREATE TABLE `mi_blog_config`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `blog_name` varchar(55) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '米娜的小屋' COMMENT '博客名称',
  `blog_avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'http://localhost:8888/9bafc3b3e3c6cd84226181100.jpg' COMMENT '博客头像',
  `avatar_bg` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'http://localhost:8888/06e6fc4151a89ec4b9b6d9f00.jpg' COMMENT '博客头像背景图',
  `personality_signature` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '个性签名',
  `blog_notice` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '博客公告',
  `qq_link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT 'QQ链接',
  `we_chat_link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '微信链接',
  `github_link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT 'github链接',
  `git_ee_link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT 'git_ee链接',
  `view_time` int(0) NULL DEFAULT 0 COMMENT '博客访问次数',
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mi_blog_config
-- ----------------------------
INSERT INTO `mi_blog_config` VALUES (1, '米娜的小屋', 'http://127.0.0.1:8888/d534c7552f7a63793b1e00001', 'http://127.0.0.1:8888/0b2aafec8a22a1dd44f781600', '这个人很懒，什么也没写~', '', '', '', '', '', 0, '2024-03-29 08:46:06', '2024-04-07 07:44:04');

-- ----------------------------
-- Table structure for mi_comment
-- ----------------------------
DROP TABLE IF EXISTS `mi_comment`;
CREATE TABLE `mi_comment`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `parent_id` int(0) NULL DEFAULT NULL COMMENT '评论的父级id',
  `type` int(0) NULL DEFAULT NULL COMMENT '评论类型 1 文章 2 说说 3 留言 ...',
  `for_id` int(0) NULL DEFAULT NULL COMMENT '评论的对象id 例如文章id 说说id 留言id',
  `from_id` int(0) NULL DEFAULT NULL COMMENT '评论人的id',
  `from_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '评论人的名字',
  `from_avatar` varchar(555) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '评论人的头像',
  `to_id` int(0) NULL DEFAULT NULL COMMENT '被回复的人的id',
  `to_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '被回复的人的名字',
  `to_avatar` varchar(555) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '被回复的人的头像',
  `thumbs_up` int(0) NULL DEFAULT 0 COMMENT '评论点赞数',
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  `content` varchar(555) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '评论内容',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mi_comment
-- ----------------------------
INSERT INTO `mi_comment` VALUES (1, NULL, 2, 19, 2, '米娜', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', NULL, NULL, NULL, 0, '2024-04-01 03:33:30', '2024-04-01 03:33:30', '再想想怎么弄');
INSERT INTO `mi_comment` VALUES (2, NULL, 2, 19, 2, '米娜', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', NULL, NULL, NULL, 0, '2024-04-01 03:36:16', '2024-04-01 03:36:16', '测试评论');
INSERT INTO `mi_comment` VALUES (3, NULL, 2, 20, 7, '星星v44d2xvf', 'http://localhost:8848/src/assets/avatar.jpg', NULL, NULL, NULL, 0, '2024-04-03 01:55:50', '2024-04-03 01:55:50', '测试评论成功');

-- ----------------------------
-- Table structure for mi_like
-- ----------------------------
DROP TABLE IF EXISTS `mi_like`;
CREATE TABLE `mi_like`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `type` int(0) NULL DEFAULT NULL COMMENT '点赞类型 1 文章 2 说说 3 留言 4 评论',
  `for_id` int(0) NULL DEFAULT NULL COMMENT '点赞的id 文章id 说说id 留言id',
  `user_id` int(0) NULL DEFAULT NULL COMMENT '点赞用户id',
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mi_like
-- ----------------------------
INSERT INTO `mi_like` VALUES (1, 2, 19, 2, '2024-04-03 02:06:07', '2024-04-03 02:06:07');
INSERT INTO `mi_like` VALUES (2, 2, 19, 2, '2024-04-03 02:47:24', '2024-04-03 02:47:24');
INSERT INTO `mi_like` VALUES (3, 2, 22, 2, '2024-04-07 08:27:50', '2024-04-07 08:27:50');
INSERT INTO `mi_like` VALUES (4, 2, 28, 2, '2024-04-07 08:27:53', '2024-04-07 08:27:53');
INSERT INTO `mi_like` VALUES (11, 3, 1, 2, '2024-04-10 02:00:15', '2024-04-10 02:00:15');

-- ----------------------------
-- Table structure for mi_message
-- ----------------------------
DROP TABLE IF EXISTS `mi_message`;
CREATE TABLE `mi_message`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `message` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '留言内容',
  `color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '#676767' COMMENT '字体颜色',
  `font_size` int(0) NULL DEFAULT 12 COMMENT '字体大小',
  `font_weight` int(0) NULL DEFAULT 500 COMMENT '字体宽度',
  `bg_color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '背景颜色',
  `bg_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '背景图片',
  `user_id` int(0) NULL DEFAULT NULL COMMENT '留言用户的id',
  `nick_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '游客用户的昵称',
  `tag` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '标签',
  `like_times` int(0) NULL DEFAULT 0 COMMENT '点赞次数',
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mi_message
-- ----------------------------
INSERT INTO `mi_message` VALUES (1, '你好，第一条留言测试', '#676767', 12, 500, NULL, NULL, 2, '米娜', '测试', 0, '2024-03-26 00:00:00', '2024-04-10 02:05:32');

-- ----------------------------
-- Table structure for mi_notify
-- ----------------------------
DROP TABLE IF EXISTS `mi_notify`;
CREATE TABLE `mi_notify`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `message` varchar(555) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '通知内容',
  `user_id` int(0) NULL DEFAULT NULL COMMENT '通知给谁',
  `type` int(0) NULL DEFAULT NULL COMMENT '通知类型 1 文章 2 说说 3 留言 4 友链',
  `isView` int(0) NULL DEFAULT 1 COMMENT '是否被查看 1 没有 2 已经查看',
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mi_notify
-- ----------------------------
INSERT INTO `mi_notify` VALUES (1, '您的说说收到了来自于 星星v44d2xvf 的评论: 测试评论成功!', 2, 2, 1, '2024-04-03 01:55:50', '2024-04-03 01:55:50');

-- ----------------------------
-- Table structure for mi_photo
-- ----------------------------
DROP TABLE IF EXISTS `mi_photo`;
CREATE TABLE `mi_photo`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `album_id` int(0) NULL DEFAULT NULL COMMENT '相册id 属于哪个相册',
  `url` varchar(555) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '图片地址',
  `status` int(0) NULL DEFAULT 1 COMMENT '状态 1 正常 2 回收站 3 彻底删除',
  `createAt` datetime(0) NULL DEFAULT NULL,
  `updateAt` datetime(0) NULL DEFAULT NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mi_photo
-- ----------------------------
INSERT INTO `mi_photo` VALUES (3, 1, 'http://127.0.0.1:8888/ac1a6e61b9373c26e5f1cf703', 1, NULL, NULL, '2024-03-19 07:24:07', '2024-03-19 07:24:07');
INSERT INTO `mi_photo` VALUES (4, 1, 'http://127.0.0.1:8888/87af9b5290dc7a0f08c4fba01', 1, NULL, NULL, '2024-03-20 02:14:10', '2024-03-20 02:14:10');
INSERT INTO `mi_photo` VALUES (5, 1, 'http://127.0.0.1:8888/87af9b5290dc7a0f08c4fba00', 2, NULL, NULL, '2024-03-20 02:14:10', '2024-03-21 01:42:08');
INSERT INTO `mi_photo` VALUES (6, 2, 'http://127.0.0.1:8888/2a009a474d38ba09d252e1d03', 1, NULL, NULL, '2024-03-20 02:28:28', '2024-03-20 02:28:28');
INSERT INTO `mi_photo` VALUES (7, 2, 'http://127.0.0.1:8888/2a009a474d38ba09d252e1d01', 1, NULL, NULL, '2024-03-20 02:28:28', '2024-03-20 02:28:28');
INSERT INTO `mi_photo` VALUES (8, 2, 'http://127.0.0.1:8888/2a009a474d38ba09d252e1d05', 1, NULL, NULL, '2024-03-20 02:28:28', '2024-03-20 02:28:28');
INSERT INTO `mi_photo` VALUES (9, 2, 'http://127.0.0.1:8888/2a009a474d38ba09d252e1d04', 1, NULL, NULL, '2024-03-20 02:28:28', '2024-03-20 02:28:28');
INSERT INTO `mi_photo` VALUES (10, 2, 'http://127.0.0.1:8888/2a009a474d38ba09d252e1d02', 1, NULL, NULL, '2024-03-20 02:28:28', '2024-03-20 02:28:28');

-- ----------------------------
-- Table structure for mi_talk
-- ----------------------------
DROP TABLE IF EXISTS `mi_talk`;
CREATE TABLE `mi_talk`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '说说内容',
  `user_id` int(0) NULL DEFAULT NULL COMMENT '发布说说的用户id',
  `status` int(0) NULL DEFAULT 1 COMMENT '说说状态 1 公开 2 私密 3 回收站',
  `is_top` int(0) NULL DEFAULT 2 COMMENT '是否置顶 1 置顶 2 不置顶',
  `like_times` int(0) NULL DEFAULT 0 COMMENT '点赞次数',
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  `deletedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 31 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mi_talk
-- ----------------------------
INSERT INTO `mi_talk` VALUES (1, '测试发表', 1, 3, 2, 0, '2024-03-12 02:27:44', '2024-03-12 06:27:13', '2024-03-13 02:55:51');
INSERT INTO `mi_talk` VALUES (2, '测试发表2', 2, 3, 2, 0, '2024-03-12 02:51:32', '2024-03-12 06:27:11', '2024-03-13 02:55:54');
INSERT INTO `mi_talk` VALUES (3, '1111', 2, 3, 2, 0, '2024-03-12 02:51:55', '2024-03-12 06:27:07', '2024-03-13 02:55:57');
INSERT INTO `mi_talk` VALUES (4, '111', 2, 3, 2, 0, '2024-03-12 02:53:04', '2024-03-12 06:27:03', '2024-03-13 02:55:59');
INSERT INTO `mi_talk` VALUES (5, '111', 2, 3, 2, 0, '2024-03-12 03:00:18', '2024-03-12 06:26:51', '2024-03-13 02:56:02');
INSERT INTO `mi_talk` VALUES (6, '1111', 2, 3, 2, 0, '2024-03-12 03:00:58', '2024-03-12 06:26:56', '2024-03-13 02:56:05');
INSERT INTO `mi_talk` VALUES (7, 'ghfgdr', 2, 3, 2, 0, '2024-03-12 06:13:35', '2024-03-12 06:27:00', '2024-03-13 02:56:07');
INSERT INTO `mi_talk` VALUES (8, '', 2, 3, 2, 0, '2024-03-12 06:26:32', '2024-03-12 06:26:48', '2024-03-13 02:56:10');
INSERT INTO `mi_talk` VALUES (9, 'ytgggg', 2, 3, 2, 0, '2024-03-12 06:27:24', '2024-03-13 02:55:44', '2024-03-13 02:56:12');
INSERT INTO `mi_talk` VALUES (10, '古典风格', 0, 3, 2, 0, '2024-03-12 07:58:29', '2024-03-13 02:56:16', '2024-03-13 02:56:38');
INSERT INTO `mi_talk` VALUES (11, '和分发给', 0, 3, 2, 0, '2024-03-12 08:00:12', '2024-03-13 02:56:19', '2024-03-13 02:56:40');
INSERT INTO `mi_talk` VALUES (12, 'gchng', 0, 3, 2, 0, '2024-03-12 08:31:57', '2024-03-13 02:56:21', '2024-03-13 02:56:42');
INSERT INTO `mi_talk` VALUES (13, 'hgnmghjm', 0, 3, 2, 0, '2024-03-12 08:35:27', '2024-03-13 02:56:23', '2024-03-13 02:56:44');
INSERT INTO `mi_talk` VALUES (14, 'kulkj', 0, 3, 2, 0, '2024-03-12 08:39:44', '2024-03-13 02:56:25', '2024-03-13 02:56:47');
INSERT INTO `mi_talk` VALUES (15, 'fghdgh', 0, 3, 2, 0, '2024-03-12 08:42:37', '2024-03-13 02:56:28', '2024-03-13 02:56:49');
INSERT INTO `mi_talk` VALUES (16, 'fdsfgsd', 0, 3, 2, 0, '2024-03-12 08:44:19', '2024-03-13 02:56:59', '2024-03-13 02:57:02');
INSERT INTO `mi_talk` VALUES (17, 'hdfhh', 0, 3, 2, 0, '2024-03-12 08:49:46', '2024-03-13 02:56:32', '2024-03-13 02:56:53');
INSERT INTO `mi_talk` VALUES (18, 'gfgfd', 0, 3, 2, 0, '2024-03-12 08:52:17', '2024-03-13 02:56:34', '2024-03-13 02:56:55');
INSERT INTO `mi_talk` VALUES (19, '图片回显不了', 2, 1, 2, 2, '2024-03-13 02:49:11', '2024-04-08 01:44:21', NULL);
INSERT INTO `mi_talk` VALUES (20, '可以上传', 2, 1, 2, 0, '2024-03-13 02:50:43', '2024-04-08 01:44:24', NULL);
INSERT INTO `mi_talk` VALUES (21, '只能显示用户名，不能显示昵称？', 2, 3, 1, 0, '2024-03-13 03:58:28', '2024-03-13 03:59:13', NULL);
INSERT INTO `mi_talk` VALUES (22, '只能显示用户名，不能显示昵称', 2, 1, 2, 1, '2024-03-13 03:59:58', '2024-04-08 01:44:26', NULL);
INSERT INTO `mi_talk` VALUES (23, '能显示昵称和头像，但是只能是当前登录人的', 2, 1, 2, 0, '2024-03-14 06:35:31', '2024-03-14 06:35:31', NULL);
INSERT INTO `mi_talk` VALUES (24, '很奇怪，好像说说昵称的显示不是当前登录人了', 2, 1, 2, 0, '2024-03-14 06:50:19', '2024-03-14 06:50:19', NULL);
INSERT INTO `mi_talk` VALUES (25, '现在是 时间显示有点问题', 2, 1, 2, 0, '2024-03-14 06:51:10', '2024-03-14 06:51:10', NULL);
INSERT INTO `mi_talk` VALUES (26, '发布有点问题，不是success， 而是 info', 2, 1, 2, 0, '2024-03-14 06:53:12', '2024-03-14 06:53:12', NULL);
INSERT INTO `mi_talk` VALUES (27, '再测试一次发布说说', 2, 1, 2, 0, '2024-03-14 06:54:40', '2024-03-14 06:54:40', NULL);
INSERT INTO `mi_talk` VALUES (28, '发布说说正常', 2, 1, 2, 1, '2024-03-14 08:16:40', '2024-04-07 08:27:53', NULL);
INSERT INTO `mi_talk` VALUES (29, '发现了一些小bug，基本上都是自己粗心写错了，导致各种问题的出现，好在细心检查之后，成功解决了！', 2, 1, 2, 0, '2024-04-07 08:29:31', '2024-04-08 01:44:41', NULL);
INSERT INTO `mi_talk` VALUES (30, '出现一个新问题，置顶的说说没有置顶，只是修改了数据', 2, 1, 2, 0, '2024-04-07 08:31:36', '2024-04-07 08:31:36', NULL);

-- ----------------------------
-- Table structure for mi_talk_photo
-- ----------------------------
DROP TABLE IF EXISTS `mi_talk_photo`;
CREATE TABLE `mi_talk_photo`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `talk_id` int(0) NULL DEFAULT NULL COMMENT '说说的id',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '图片地址',
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mi_talk_photo
-- ----------------------------
INSERT INTO `mi_talk_photo` VALUES (14, 20, 'http://127.0.0.1:8888/70ac61235268a6a05b30e6701', '2024-03-13 02:50:43', '2024-03-13 02:50:43');
INSERT INTO `mi_talk_photo` VALUES (15, 21, 'http://127.0.0.1:8888/70ac61235268a6a05b30e6702', '2024-03-13 03:58:28', '2024-03-13 03:58:28');
INSERT INTO `mi_talk_photo` VALUES (16, 22, 'http://127.0.0.1:8888/70ac61235268a6a05b30e6703', '2024-03-13 03:59:58', '2024-03-13 03:59:58');
INSERT INTO `mi_talk_photo` VALUES (17, 23, 'http://127.0.0.1:8888/97ab8f4949c2d54076e5e2400', '2024-03-14 06:35:31', '2024-03-14 06:35:31');
INSERT INTO `mi_talk_photo` VALUES (18, 24, 'http://127.0.0.1:8888/0fb9b1d04e76997bbcacb2f00', '2024-03-14 06:50:19', '2024-03-14 06:50:19');
INSERT INTO `mi_talk_photo` VALUES (19, 25, 'http://127.0.0.1:8888/0fb9b1d04e76997bbcacb2f01', '2024-03-14 06:51:10', '2024-03-14 06:51:10');
INSERT INTO `mi_talk_photo` VALUES (20, 26, 'http://127.0.0.1:8888/0fb9b1d04e76997bbcacb2f02', '2024-03-14 06:53:12', '2024-03-14 06:53:12');
INSERT INTO `mi_talk_photo` VALUES (21, 27, 'http://127.0.0.1:8888/0fb9b1d04e76997bbcacb2f03', '2024-03-14 06:54:40', '2024-03-14 06:54:40');
INSERT INTO `mi_talk_photo` VALUES (22, 27, 'http://127.0.0.1:8888/0fb9b1d04e76997bbcacb2f04', '2024-03-14 06:54:40', '2024-03-14 06:54:40');
INSERT INTO `mi_talk_photo` VALUES (24, 19, 'http://127.0.0.1:8888/9f792e15b0a5e6377968e5104', '2024-03-14 07:16:08', '2024-03-14 07:16:08');
INSERT INTO `mi_talk_photo` VALUES (25, 28, 'http://127.0.0.1:8888/9f792e15b0a5e6377968e5105', '2024-03-14 08:16:40', '2024-03-14 08:16:40');
INSERT INTO `mi_talk_photo` VALUES (26, 29, 'http://127.0.0.1:8888/4f545ae5fb670ce350d7b6d00', '2024-04-07 08:29:31', '2024-04-07 08:29:31');
INSERT INTO `mi_talk_photo` VALUES (27, 30, 'http://127.0.0.1:8888/4f545ae5fb670ce350d7b6d01', '2024-04-07 08:31:36', '2024-04-07 08:31:36');

-- ----------------------------
-- Table structure for mi_users
-- ----------------------------
DROP TABLE IF EXISTS `mi_users`;
CREATE TABLE `mi_users`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '用户ID 唯一',
  `user_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户名,唯一',
  `password` char(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '密码',
  `role` int(0) NOT NULL DEFAULT 2 COMMENT '用户角色 1 管理员 2 普通用户',
  `nick_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '' COMMENT '用户昵称',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'http://localhost:8888/11d9bb8bf54125a26464b5c00.jpg' COMMENT '用户头像',
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `user_name`(`user_name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mi_users
-- ----------------------------
INSERT INTO `mi_users` VALUES (1, 'admin', '$2a$10$Dba033ranLrFueWOVLOY3.2Uc0yrvxA7EJkF6D3nZfd37rVpfMYla', 1, '超级管理员', 'http://127.0.0.1:8888/d534c7552f7a63793b1e00001', '2024-02-26 06:53:17', '2024-03-22 06:18:51');
INSERT INTO `mi_users` VALUES (2, 'mina', '$2a$10$QYdxSYuYeBvehVSx1Gb/COxP6.pYpMQuF4D9nA3zG3YgS74kKaI/e', 1, '米娜', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', '2024-02-26 06:55:51', '2024-03-22 02:51:40');
INSERT INTO `mi_users` VALUES (3, 'popular', '$2a$10$IHiQpeGh9TSgQFrYwiFJcOaejRd6TVtD1HvQzC52VGTf8P82Zwxu6', 2, '普通用户', 'http://localhost:8848/src/assets/avatar.jpg', '2024-03-13 06:04:01', '2024-03-21 06:20:08');
INSERT INTO `mi_users` VALUES (4, 'test', '$2a$10$pSvEKKNXjE3ekbzJXQOAA.IUZV3tdxIsfon6dR8.erg8eRE5Swdy2', 2, '测试用户', 'http://localhost:8848/src/assets/avatar.jpg', '2024-03-14 02:01:48', '2024-03-14 02:01:48');
INSERT INTO `mi_users` VALUES (5, 'test2', '$2a$10$Lu1zH9xQqDoX73f/Vzkrue0JZGAPldaqUU3xOewCQef0WfQf1/A.q', 2, '测试用户2', 'http://localhost:8848/src/assets/avatar.jpg', '2024-03-14 02:04:09', '2024-03-14 02:04:09');
INSERT INTO `mi_users` VALUES (6, 'hhhhhh', '$2a$10$biQXEKLW6az7Xz0uhcCV3uA2iNfd745WRfAO8VW.1xCrtk8uiUbsG', 2, '星星w5wiiaqh', 'http://localhost:8848/src/assets/avatar.jpg', '2024-03-21 03:38:18', '2024-03-21 03:38:21');
INSERT INTO `mi_users` VALUES (7, 'cheshiming', '$2a$10$2Uz61LslyvlKD0AGkBWEDuvwhhVj//7V/ZJR0vTskyVvt11jrlB96', 2, '星星v44d2xvf', 'http://localhost:8848/src/assets/avatar.jpg', '2024-03-27 06:18:17', '2024-03-27 06:18:17');

SET FOREIGN_KEY_CHECKS = 1;
