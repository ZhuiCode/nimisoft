-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 2017-12-10 14:45:32
-- 服务器版本： 5.7.18
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `stores_db`
--

-- --------------------------------------------------------

--
-- 表的结构 `store_info_tbl`
--

CREATE TABLE `store_info_tbl` (
  `store_code` varchar(128) COLLATE utf8mb4_bin NOT NULL,
  `store_name` varchar(256) COLLATE utf8mb4_bin NOT NULL,
  `inner_temp` int(11) NOT NULL,
  `inner_humi` int(11) NOT NULL,
  `inner_pm` int(11) NOT NULL,
  `outer_temp` int(11) NOT NULL,
  `outer_humi` int(11) NOT NULL,
  `outer_pm` int(11) NOT NULL,
  `today_total_users` int(11) NOT NULL,
  `unused_dev` int(11) NOT NULL,
  `cur_users` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- 转存表中的数据 `store_info_tbl`
--

INSERT INTO `store_info_tbl` (`store_code`, `store_name`, `inner_temp`, `inner_humi`, `inner_pm`, `outer_temp`, `outer_humi`, `outer_pm`, `today_total_users`, `unused_dev`, `cur_users`) VALUES
('11', '洛阳店', 25, 22, 34, 30, 22, 35, 100, 10, 20);

-- --------------------------------------------------------

--
-- 表的结构 `store_price_tbl`
--

CREATE TABLE `store_price_tbl` (
  `store_code` varchar(128) COLLATE utf8mb4_bin NOT NULL,
  `price_level` int(32) NOT NULL,
  `value1` int(11) NOT NULL,
  `power1` int(11) NOT NULL,
  `value2` int(11) NOT NULL,
  `power2` int(11) NOT NULL,
  `value3` int(11) NOT NULL,
  `power3` int(11) NOT NULL,
  `value4` int(11) NOT NULL,
  `power4` int(11) NOT NULL,
  `value5` int(11) NOT NULL,
  `power5` int(11) NOT NULL,
  `value6` int(11) NOT NULL,
  `power6` int(11) NOT NULL,
  `value7` int(11) NOT NULL,
  `power7` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- 转存表中的数据 `store_price_tbl`
--

INSERT INTO `store_price_tbl` (`store_code`, `price_level`, `value1`, `power1`, `value2`, `power2`, `value3`, `power3`, `value4`, `power4`, `value5`, `power5`, `value6`, `power6`, `value7`, `power7`) VALUES
('11', 7, 1, 20, 25, 50, 50, 100, 100, 200, 150, 300, 200, 400, 250, 500);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `store_info_tbl`
--
ALTER TABLE `store_info_tbl`
  ADD PRIMARY KEY (`store_code`);

--
-- Indexes for table `store_price_tbl`
--
ALTER TABLE `store_price_tbl`
  ADD PRIMARY KEY (`store_code`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
