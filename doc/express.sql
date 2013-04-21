-- phpMyAdmin SQL Dump
-- version 3.2.4
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2013 年 04 月 19 日 15:28
-- 服务器版本: 5.1.41
-- PHP 版本: 5.3.1

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `express`
--

-- --------------------------------------------------------

--
-- 表的结构 `express_info`
--

CREATE TABLE IF NOT EXISTS `express_info` (
  `express_id` int(11) NOT NULL AUTO_INCREMENT,
  `status_id` int(11) NOT NULL,
  `order_number` int(20) NOT NULL,
  `customer_name` int(20) DEFAULT NULL,
  `service_phone` int(20) NOT NULL,
  `address` varchar(200) NOT NULL,
  `contact_phone` int(20) NOT NULL,
  `price` double NOT NULL,
  `good_name` double NOT NULL,
  `is_check` tinyint(1) NOT NULL,
  `shipper_id` int(11) NOT NULL,
  `seller_id` int(11) NOT NULL,
  `create_date` datetime NOT NULL,
  `last_update` datetime NOT NULL,
  `employee_id` int(11) NOT NULL,
  PRIMARY KEY (`express_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- 转存表中的数据 `express_info`
--


-- --------------------------------------------------------

--
-- 表的结构 `express_status`
--

CREATE TABLE IF NOT EXISTS `express_status` (
  `status_id` int(11) NOT NULL,
  `status_name` varchar(20) NOT NULL,
  PRIMARY KEY (`status_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `express_status`
--

INSERT INTO `express_status` (`status_id`, `status_name`) VALUES
(0, '收单'),
(1, '入库'),
(2, '出库'),
(3, '在途'),
(4, '签收'),
(5, '拒收'),
(6, '退单入库'),
(7, '退单出库'),
(8, '已收代收款'),
(9, '完成'),
(10, '退货'),
(11, '异常');

-- --------------------------------------------------------

--
-- 表的结构 `finance_record`
--

CREATE TABLE IF NOT EXISTS `finance_record` (
  `finance_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `amount` double NOT NULL,
  `date` datetime NOT NULL,
  `type` tinyint(1) NOT NULL,
  PRIMARY KEY (`finance_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `finance_record`
--


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
