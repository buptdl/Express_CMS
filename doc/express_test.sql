-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- 主机: 127.0.0.1
-- 生成日期: 2013 年 04 月 23 日 14:22
-- 服务器版本: 5.5.27
-- PHP 版本: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `express_test`
--

-- --------------------------------------------------------

--
-- 表的结构 `department`
--

CREATE TABLE IF NOT EXISTS `department` (
  `depart_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `site` varchar(200) NOT NULL,
  `phone` int(15) NOT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `aut_exp` smallint(6) DEFAULT NULL,
  `aut_exp_desc` varchar(200) DEFAULT NULL,
  `aut_fin` smallint(6) DEFAULT NULL,
  `aut_fin_desc` varchar(200) DEFAULT NULL,
  `aut_cli` smallint(6) DEFAULT NULL,
  `aut_cli_desc` varchar(200) DEFAULT NULL,
  `reverse` char(100) DEFAULT NULL,
  PRIMARY KEY (`depart_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=gbk COMMENT='部门信息表 含页面权限' AUTO_INCREMENT=1 ;

--
-- 转存表中的数据 `department`
--

INSERT INTO `department` (`depart_id`, `name`, `site`, `phone`, `staff_id`, `aut_exp`, `aut_exp_desc`, `aut_fin`, `aut_fin_desc`, `aut_cli`, `aut_cli_desc`, `reverse`) VALUES
(2, '财务部', '未知', 62280001, 2, 0, NULL, 5, NULL, 0, NULL, NULL),
(3, '客服部', '未知', 62280002, 3, 5, NULL, 0, NULL, 1, NULL, NULL),
(4, '操作部', '未知', 62280003, 4, 5, NULL, 0, NULL, 0, NULL, NULL),
(1, '总经理', '未知', 62280001, 1, 5, NULL, 5, NULL, 5, NULL, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `staff`
--

CREATE TABLE IF NOT EXISTS `staff` (
  `staff_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `age` smallint(6) DEFAULT NULL,
  `hometown` varchar(50) DEFAULT NULL,
  `salary` int(8) DEFAULT NULL,
  `phone` int(15) DEFAULT NULL,
  `entry_time` date DEFAULT NULL,
  `leave_time` date DEFAULT NULL,
  `IDnumber` char(20) DEFAULT NULL,
  `sex` enum('m','f') DEFAULT NULL,
  `depart_di` int(11) DEFAULT NULL,
  `email` varchar(20) DEFAULT NULL,
  `system_name` varchar(20) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `aut_exp` smallint(4) DEFAULT NULL,
  `aut_fin` smallint(4) DEFAULT NULL,
  `aut_cli` smallint(4) DEFAULT NULL,
  `reverse` char(200) DEFAULT NULL,
  PRIMARY KEY (`staff_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=gbk COMMENT='员工信息' AUTO_INCREMENT=1 ;

--
-- 转存表中的数据 `staff`
--

INSERT INTO `staff` (`staff_id`, `name`, `age`, `hometown`, `salary`, `phone`, `entry_time`, `leave_time`, `IDnumber`, `sex`, `depart_di`, `email`, `system_name`, `password`, `aut_exp`, `aut_fin`, `aut_cli`, `reverse`) VALUES
(1, '王毅', 30, '四川', NULL, 1510001, '2013-04-01', NULL, NULL, 'm', 0, NULL, 'wy', 'wy', 5, 5, 5, NULL),
(3, '张三', 24, NULL, NULL, 62280003, '2013-04-05', NULL, NULL, 'f', 3, 'zs@163.com', 'zs', 'zs', 5, 1, 1, NULL),
(2, '詹二', 25, NULL, NULL, 62280002, '2013-04-03', NULL, NULL, 'm', 2, NULL, 'zer', 'zer', 0, 5, 0, NULL),
(4, '李四', 26, NULL, NULL, 62280004, '2013-04-08', NULL, NULL, 'm', 4, 'ls@q.com', 'ls', 'ls', 1, 0, 1, NULL),
(5, '王五', 21, NULL, NULL, NULL, NULL, NULL, '62280008', 'm', 4, NULL, 'ww', 'ww', 1, 0, 0, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `supplierdown`
--

CREATE TABLE IF NOT EXISTS `supplierdown` (
  `dsp_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET gbk NOT NULL,
  `site` varchar(200) CHARACTER SET gbk NOT NULL,
  `phone` int(15) NOT NULL,
  `fax` int(15) DEFAULT NULL,
  `email` varchar(20) DEFAULT NULL,
  `contact` varchar(20) CHARACTER SET gbk DEFAULT NULL,
  `cphone` int(15) unsigned DEFAULT NULL,
  `manager` varchar(20) CHARACTER SET gbk DEFAULT NULL,
  `mphone` int(15) unsigned DEFAULT NULL,
  PRIMARY KEY (`dsp_id`)
) ENGINE=MyISAM DEFAULT CHARSET=gbk AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `supplierup`
--

CREATE TABLE IF NOT EXISTS `supplierup` (
  `usp_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET gbk NOT NULL,
  `site` varchar(200) CHARACTER SET gbk NOT NULL,
  `phone` int(15) NOT NULL,
  `fax` int(15) DEFAULT NULL,
  `email` varchar(20) DEFAULT NULL,
  `contact` varchar(20) CHARACTER SET gbk DEFAULT NULL,
  `cphone` int(15) unsigned DEFAULT NULL,
  `manager` varchar(20) CHARACTER SET gbk DEFAULT NULL,
  `mphone` int(15) unsigned DEFAULT NULL,
  PRIMARY KEY (`usp_id`)
) ENGINE=MyISAM DEFAULT CHARSET=gbk AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `supplyup_succratio_m`
--

CREATE TABLE IF NOT EXISTS `supplyup_succratio_m` (
  `ugrm_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `succ_orders` mediumint(8) unsigned NOT NULL,
  `succ_ratio` float unsigned NOT NULL,
  `reverse` char(100) NOT NULL,
  `uspid` int(11) unsigned NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`ugrm_id`),
  KEY `uspid` (`uspid`,`date`)
) ENGINE=MyISAM DEFAULT CHARSET=gbk COMMENT='上游客户的运单成功率月表' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `supplyup_succratio_w`
--

CREATE TABLE IF NOT EXISTS `supplyup_succratio_w` (
  `ugrw_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `succ_orders` mediumint(8) unsigned NOT NULL,
  `succ_ratio` float unsigned NOT NULL,
  `reverse` char(100) NOT NULL,
  `uspid` int(11) unsigned NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`ugrw_id`),
  KEY `uspid` (`uspid`,`date`)
) ENGINE=MyISAM DEFAULT CHARSET=gbk COMMENT='上游客户的运单成功率周表' AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
