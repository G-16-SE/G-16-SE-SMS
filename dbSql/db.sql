-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 07, 2022 at 09:28 AM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sms`
--

-- --------------------------------------------------------

--
-- Table structure for table `manager`
--

CREATE TABLE `manager` (
  `id` bigint(20) NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `contact` varchar(10) NOT NULL,
  `join_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `manager`
--

INSERT INTO `manager` (`id`, `user_id`, `name`, `contact`, `join_date`) VALUES
(6, 'd9cfa56b098b1249', 'Kaveesha Piumini', '0715034234', '2022-06-01'),
(7, '7ddfa5e482ba2adf', 'Ushan Amarakoon', '0754321256', '2022-06-07'),
(8, '2afe0e4f392398a1', 'kasun kalhara silva', '0112445345', '2022-06-07'),
(9, '21727c5b58a4661b', 'Pasan Manujitha', '0771023045', '2022-06-07');

-- --------------------------------------------------------

--
-- Table structure for table `storage`
--

CREATE TABLE `storage` (
  `id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `stock_amount` int(11) NOT NULL,
  `last_refilled_date` date NOT NULL,
  `unit` varchar(255) NOT NULL,
  `unit_price` int(11) NOT NULL,
  `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `storage`
--

INSERT INTO `storage` (`id`, `type`, `stock_amount`, `last_refilled_date`, `unit`, `unit_price`, `image`) VALUES
(1, 'Sugar', 12334, '2022-06-06', 'KG', 50, 'goods.png'),
(2, 'Dhal', 50000, '2022-06-06', 'KG', 200, 'goods.png'),
(5, 'Cement', 100, '0000-00-00', 'Kg', 5000, 'goods.png'),
(6, 'Milk', 0, '0000-00-00', 'L', 500, 'goods.png'),
(7, 'Rice', 0, '0000-00-00', 'Kg', 1000, 'goods.png'),
(8, 'Beef', 0, '0000-00-00', 'Kg', 750, 'goods.png');

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contact` varchar(10) NOT NULL,
  `address` text NOT NULL,
  `joined_date` date DEFAULT NULL,
  `isExist` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`id`, `name`, `email`, `contact`, `address`, `joined_date`, `isExist`) VALUES
(1, 'Akila Silva', 'akila@gmail.lk', '0710000000', '53, Borupana Road, Kadawatha', '2022-06-20', 0),
(2, 'Wenuka Silva', 'wenuka@gmail.com', '0712351221', '274/1/B, Udagama, Kandy', '2022-05-15', 1),
(4, 'Supul-Kalhara', 'pushpakumaraagsk.19@uom.lk', '0715180000', '20/67, Green Terrace, Parakandeniya, Imbulgoda', '2022-05-28', 1),
(5, 'Supul Kalhara', 'supul9229kalhara@gmail.com', '0715180267', '20/67, Green Terrace, Parakandeniya, Imbulgoda', '2022-06-26', 1),
(6, 'Kasun Bandara', 'kasun@gmail.com', '0123332323', '20/67, Green Terrace, Parakandeniya, Imbulgoda', '2022-05-30', 1),
(7, 'Dakshina Ranmal', 'dakshina@gmail.com', '0123332312', '120,ajshdjh road, osdahgfh', '2022-06-08', 1);

-- --------------------------------------------------------

--
-- Table structure for table `supply_record`
--

CREATE TABLE `supply_record` (
  `id` int(11) NOT NULL,
  `supplier_id` int(11) NOT NULL,
  `unit_prize` double NOT NULL,
  `amount` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `received_date` date NOT NULL,
  `availability` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `supply_record`
--

INSERT INTO `supply_record` (`id`, `supplier_id`, `unit_prize`, `amount`, `type`, `received_date`, `availability`) VALUES
(3, 1, 80, 50, 'sugar', '2022-05-24', 0),
(4, 2, 50000, 1222, 'Dhal', '2022-06-01', 0),
(6, 1, 123123, 12, 'Dhal', '2022-06-04', 0),
(7, 6, 250, 500, 'Dhal', '2022-06-16', 0),
(8, 1, 3000, 100, 'Cement', '2022-06-05', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `token` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `role`, `token`) VALUES
('10ce9f006bd8f251', 'www@gmail.com', '$2b$10$2sHJaV2c9DNFmR/t16Sz/uZypcjW61.cye3R6hqsGPFWF4YdZWH/i', 'Admin', 'ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmxiV0ZwYkNJNkluZDNkMEJuYldGcGJDNWpiMjBpTENKMWMyVnlTV1FpT2lJeE1HTmxPV1l3TURaaVpEaG1NalV4SWl3aWNtOXNaU0k2SWtGa2JXbHVJaXdpYVdGMElqb3hOalUwTURrMU5qY3hMQ0psZUhBaU9qRTJOVFF4TVRjeU56RjkuV3dYZXU4SXJ6UjFnNlFFQ3lGZXF2X2ZPdTNLXzN5b1kzV29pa2MxRHdzRQ=='),
('21727c5b58a4661b', 'pasan@hotmail.com', '$2b$10$4RN1BBjhupUm6Zl2T/Gu.OtIxjnQ4Cz/zSo8JhyR4lxwUsHIrySXa', 'Manager', NULL),
('2afe0e4f392398a1', 'kasun@yahoo.com', '$2b$10$VM73VuMrzoE92IDoxweNjexIkmtgGTPMqhT76izn/.vS6wezSkYfm', 'Manager', NULL),
('7ddfa5e482ba2adf', 'ushansamarakoon@gmail.com', '$2b$10$Yk7xKycCsVDrmf18VUYmsuGUgsPZrHHOkuDkWMgRdoT3W2cLdUeqC', 'Manager', NULL),
('asldkj12343', 'admin@123.com', '$2b$10$hQRnPIxj651BFTECFOvfqe5xSgK7Sfl6vIHjZid.ufb67zxI5yOBK', 'Admin', 'ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmxiV0ZwYkNJNkltRmtiV2x1UURFeU15NWpiMjBpTENKMWMyVnlTV1FpT2lKaGMyeGthMm94TWpNME15SXNJbkp2YkdVaU9pSkJaRzFwYmlJc0ltbGhkQ0k2TVRZMU5EVTROamcwT1N3aVpYaHdJam94TmpVME9EZzJPRFE1ZlEuTEd1QjVuT2ZENU1xYlFpN25yeGEtM2ZITFd5V1hzTWU0Zm84cEkzQ3I0Zw=='),
('d9cfa56b098b1249', 'piumini.19@cse.mrt.ac.lk', '$2b$10$OrF8vAnvwOMq9.vU/LFy0.kSvxAOLj98EEdbiTyJKm5xtaxHc6fY.', 'Manager', 'ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmxiV0ZwYkNJNkluQnBkVzFwYm1rdU1UbEFZM05sTG0xeWRDNWhZeTVzYXlJc0luVnpaWEpKWkNJNkltUTVZMlpoTlRaaU1EazRZakV5TkRraUxDSnliMnhsSWpvaVRXRnVZV2RsY2lJc0ltbGhkQ0k2TVRZMU5EVXdOVFk1TlN3aVpYaHdJam94TmpVME9EQTFOamsxZlEuTENDUE0zdDY0cWljOUNNMEpDLXNSNHB4eUR5OVZPUmxOUnJUTW9fMUlhVQ==');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `manager`
--
ALTER TABLE `manager`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `storage`
--
ALTER TABLE `storage`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `type` (`type`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `supply_record`
--
ALTER TABLE `supply_record`
  ADD PRIMARY KEY (`id`),
  ADD KEY `supplier_id` (`supplier_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `manager`
--
ALTER TABLE `manager`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `storage`
--
ALTER TABLE `storage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `supply_record`
--
ALTER TABLE `supply_record`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `manager`
--
ALTER TABLE `manager`
  ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `supply_record`
--
ALTER TABLE `supply_record`
  ADD CONSTRAINT `supplier_id` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
