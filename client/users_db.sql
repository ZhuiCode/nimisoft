-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 2017-12-10 14:45:43
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
-- Database: `users_db`
--

-- --------------------------------------------------------

--
-- 表的结构 `users_devused_tbl`
--

CREATE TABLE `users_devused_tbl` (
  `openid` varchar(128) COLLATE utf8mb4_bin NOT NULL,
  `btime` int(11) NOT NULL,
  `dev_id` int(11) NOT NULL,
  `dev_data` varchar(256) COLLATE utf8mb4_bin NOT NULL,
  `dev_name` text COLLATE utf8mb4_bin NOT NULL,
  `updatetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- 转存表中的数据 `users_devused_tbl`
--

INSERT INTO `users_devused_tbl` (`openid`, `btime`, `dev_id`, `dev_data`, `dev_name`, `updatetime`) VALUES
('testuser', 1512501889, 1203812878, '100', '测试跑步机', '2017-12-05 19:24:49');

-- --------------------------------------------------------

--
-- 表的结构 `users_info_tbl`
--

CREATE TABLE `users_info_tbl` (
  `openid` varchar(128) COLLATE utf8mb4_bin NOT NULL,
  `truename` text COLLATE utf8mb4_bin NOT NULL,
  `nickname` text COLLATE utf8mb4_bin NOT NULL,
  `height` int(11) NOT NULL,
  `weight` int(11) NOT NULL,
  `id_type` varchar(64) COLLATE utf8mb4_bin NOT NULL,
  `id_no` varchar(128) COLLATE utf8mb4_bin NOT NULL,
  `total_power` int(64) NOT NULL,
  `updatetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- 转存表中的数据 `users_info_tbl`
--

INSERT INTO `users_info_tbl` (`openid`, `truename`, `nickname`, `height`, `weight`, `id_type`, `id_no`, `total_power`, `updatetime`) VALUES
('dsfd', '', 'dfgsdf', 4324, 45, '0', '32542345', 0, '2017-12-09 13:40:59'),
('ojWUC0emdOEFq_-OtHABHIkEY5AY', '张辉', 'qwerwe', 134, 2342, '0', '131315234', 20, '2017-12-09 19:20:45'),
('testuser', '', 'aa', 134, 2342, '0', '131235234', 0, '2017-12-09 13:40:37');

-- --------------------------------------------------------

--
-- 表的结构 `users_pay_tbl`
--

CREATE TABLE `users_pay_tbl` (
  `bookno` varchar(32) COLLATE utf8mb4_bin NOT NULL,
  `openid` varchar(128) COLLATE utf8mb4_bin NOT NULL,
  `date` varchar(128) COLLATE utf8mb4_bin NOT NULL,
  `pay_sum` int(11) NOT NULL,
  `pay_power` int(11) NOT NULL,
  `store_code` varchar(256) COLLATE utf8mb4_bin NOT NULL,
  `updatetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- 转存表中的数据 `users_pay_tbl`
--

INSERT INTO `users_pay_tbl` (`bookno`, `openid`, `date`, `pay_sum`, `pay_power`, `store_code`, `updatetime`) VALUES
('20171210025916100dzbfvwtj7jw8ygm', 'ojWUC0emdOEFq_-OtHABHIkEY5AY', '2017/12/10 上午2:59:35', 1, 20, '11', '2017-12-09 18:59:35'),
('20171210031340537lhr0dbcr0c6h2l4', 'ojWUC0emdOEFq_-OtHABHIkEY5AY', '2017/12/10 上午3:14:31', 1, 20, '11', '2017-12-09 19:14:31'),
('20171210031633187wm2nlg4kdrk7qqz', 'ojWUC0emdOEFq_-OtHABHIkEY5AY', '2017/12/10 上午3:16:52', 1, 20, '11', '2017-12-09 19:16:52'),
('20171210031853547j4rw0ybbvaph7or', 'ojWUC0emdOEFq_-OtHABHIkEY5AY', '2017/12/10 上午3:19:19', 1, 20, '11', '2017-12-09 19:19:19'),
('201712100320077057b48mok8x38k6lo', 'ojWUC0emdOEFq_-OtHABHIkEY5AY', '2017/12/10 上午3:20:30', 1, 20, '11', '2017-12-09 19:20:30');

-- --------------------------------------------------------

--
-- 表的结构 `users_sport_tbl`
--

CREATE TABLE `users_sport_tbl` (
  `openid` varchar(128) COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- 表的结构 `users_trans_tbl`
--

CREATE TABLE `users_trans_tbl` (
  `openid` varchar(128) COLLATE utf8mb4_bin NOT NULL,
  `trans_type` varchar(128) COLLATE utf8mb4_bin NOT NULL,
  `used_power` int(11) NOT NULL,
  `remain_power` int(11) NOT NULL,
  `trans_addr` text COLLATE utf8mb4_bin NOT NULL,
  `updatetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- 转存表中的数据 `users_trans_tbl`
--

INSERT INTO `users_trans_tbl` (`openid`, `trans_type`, `used_power`, `remain_power`, `trans_addr`, `updatetime`) VALUES
('ojWUC0emdOEFq_-OtHABHIkEY5AY', '使用xxx', 10, 19990, '洛阳王城', '2017-12-10 08:22:42'),
('ojWUC0emdOEFq_-OtHABHIkEY5AY', '使用xxx', 20, 19980, '洛阳王城', '2017-12-10 08:22:42');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users_devused_tbl`
--
ALTER TABLE `users_devused_tbl`
  ADD KEY `openid` (`openid`) USING BTREE;

--
-- Indexes for table `users_info_tbl`
--
ALTER TABLE `users_info_tbl`
  ADD PRIMARY KEY (`openid`);

--
-- Indexes for table `users_sport_tbl`
--
ALTER TABLE `users_sport_tbl`
  ADD PRIMARY KEY (`openid`);

--
-- Indexes for table `users_trans_tbl`
--
ALTER TABLE `users_trans_tbl` ADD FULLTEXT KEY `openid` (`openid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
