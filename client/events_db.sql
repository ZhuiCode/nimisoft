-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 2017-12-10 14:45:22
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
-- Database: `events_db`
--

-- --------------------------------------------------------

--
-- 表的结构 `events_tbl`
--

CREATE TABLE `events_tbl` (
  `event_id` int(11) NOT NULL,
  `openid` varchar(128) COLLATE utf8mb4_bin NOT NULL,
  `event_type` varchar(128) COLLATE utf8mb4_bin NOT NULL,
  `event_ctx` text COLLATE utf8mb4_bin NOT NULL,
  `event_handle_res` int(11) NOT NULL,
  `event_status` varchar(64) COLLATE utf8mb4_bin NOT NULL,
  `updatetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- 转存表中的数据 `events_tbl`
--

INSERT INTO `events_tbl` (`event_id`, `openid`, `event_type`, `event_ctx`, `event_handle_res`, `event_status`, `updatetime`) VALUES
(1, 'testuser', 'scan', '2801081231208', 1, 'worked', '2017-12-05 18:33:31'),
(2, 'testuser', 'scan', '2801081231208', 0, 'new', '2017-12-05 18:27:12'),
(3, 'ojWUC0emdOEFq_-OtHABHIkEY5AY', 'scan', '28190000101', 0, 'new', '2017-12-07 15:22:01'),
(4, 'ojWUC0fGELgXiubNNMcRdZmwM0rM', 'scan', '2918000001', 0, 'new', '2017-12-07 18:10:01');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `events_tbl`
--
ALTER TABLE `events_tbl`
  ADD PRIMARY KEY (`event_id`),
  ADD UNIQUE KEY `event_id` (`event_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
